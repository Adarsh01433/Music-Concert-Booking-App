
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const Redis = require("ioredis");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");
const { sendWelcomeEmail, sendOTP } = require("./emailService");


const redis = new Redis(process.env.REDIS_URL)
const prisma = new PrismaClient()

const hashPassword = async()=> bcrypt.hash(password,10)

const generateNumericOTP = ()=> {
    const n = crypto.randomInt(0, 1000000);
    return n.toString().padStart(6,'0')
};

const signUpEmail = async(data)=> {
    const {email, password, name} = data
    const existingUser = await prisma.user.findUnique({where : {email}});
    if(existingUser) throw new Error("User exists")

        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({
            data : {email, password:hashedPassword}
        });

        if(name){
            await prisma.profile.create({data: {userId : user.id, name}})
        };

        const otp = generateNumericOTP();
        await redis.set(`otp:${email}`, otp, "EX", 300);

        await sendOTP(email, otp, {name : name || "N/A", email});

        return {message: "OTP sent"}

        
};


const verifyOTP = async(data)=> {
 const {email, otp}= data;
 const storedOTP = await redis.get(`otp:${email}`);
 if(storedOTP !== otp) throw new Error("Invalid OTP");


 const user = await prisma.user.findUnique({where : {email}});
 if(!user) throw new Error("User not found");

 const accessToken = generateAccessToken(user.id);
 const refreshToken = generateRefreshToken(user.id)
 const hashedRefresh = await bcrypt.hash(refreshToken, 10);

 await prisma.user.update({
    where: {id : user.id},
    data : {refreshToken: hashedRefresh}
 });

 await redis.del(`otp:${email}`);
 await sendWelcomeEmail(email, {name : user.profile?.name || "User" });

 return {accessToken, refreshToken};
}


const login = async (data) => {
  const { email, password } = data;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  const hashedRefresh = await bcrypt.hash(refreshToken, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: hashedRefresh },
  });

  return {
    accessToken,
    refreshToken,
  };
};


const refresh = async (refreshToken) => {
  let decoded;

  try {
    decoded = verifyToken(refreshToken, process.env.REFRESH_SECRET);
  } catch (err) {
    throw new Error("Invalid refresh token");
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
  });

  if (!user || !(await bcrypt.compare(refreshToken, user.refreshToken))) {
    throw new Error("Invalid refresh token");
  }

  const newAccessToken = generateAccessToken(user.id);
  const newRefreshToken = generateRefreshToken(user.id);

  const hashedNewRefresh = await bcrypt.hash(newRefreshToken, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: hashedNewRefresh },
  });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};


const logout = async (userId) => {
  await prisma.user.update({
    where: { id: userId },
    data: { refreshToken: null },
  });
};

module.exports = {
  signUpEmail,
  logout, verifyOTP, login,refresh
};