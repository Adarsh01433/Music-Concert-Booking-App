const { PrismaClient } = require("@prisma/client");
const logger = require("../config/logger");
const { SINGLE_CONCERT_ID } = require("../config/constants");

const prisma = new PrismaClient();

const getConcertCtrl = async (req, res) => {
  try {
    const concert = await prisma.concert.findFirst({
      where: { id: SINGLE_CONCERT_ID },
      include: { categories: true },
    });

    if (!concert) {
      return res.status(404).json({
        success: false,
        message: "Concert not found",
      });
    }

    return res.json({
      success: true,
      data: concert,
    });

  } catch (error) {
    // ✅ correct variable
    console.error(error);

    logger.error("Get concert Error", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { getConcertCtrl };