import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const signUp = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <SafeAreaView className="flex-1 bg-black">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS == "ios" ? "padding" : undefined}
      >
        <View className="px-6 pt-8 items-center" style={{ minHeight: 200 }}>
          <Text className="text-white text-2xl font-bold mt-4 text-center">
            Create your account
          </Text>
          <Text className="text-gray-400  mt-2">
            Sign up with email to continue
          </Text>
        </View>

        <View className="bg-[#0f0f10] rounded-t-3xl  px-5 py-6">
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Full Name"
            placeholderTextColor={"#6b6b6b"}
            keyboardType="email-address"
            className="bg-[#111] border border-gray-800 px-4 py-3 text-white mb-4"
            autoCapitalize="words"
          />

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor={"#6b6b6b"}
            keyboardType="email-address"
            className="bg-[#111] border border-gray-800 px-4 py-3 text-white mb-4"
            autoCapitalize="none"
          />

          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor={"#6b6b6b"}
            secureTextEntry={true}
            className="bg-[#111] border border-gray-800 px-4 py-3 text-white mb-4"
          />
          <Pressable className="bg-white rounded-full py-3 text-white mb-2 items-center">
            <Text className="text-black font-semibold">Create Account</Text>
          </Pressable>

          <View className="flex-row justify-center mt-4 pb-2">
            <Text className="text-gray-400 mr-2">Already have an account?</Text>
            <Pressable onPress={() => router.back}>
              <Text className="text-white font-semibold">Log In</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default signUp;

const styles = StyleSheet.create({});
