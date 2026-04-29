import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-black">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS == "ios" ? "padding" : undefined}
      >
        <View className="px-6 pt-8 items-center" style={{ minHeight: 200 }}>
          <Text className="text-white text-xl font-bold mt-4 text-center">
            One App for your concert plans
          </Text>
          <Text className="text-yellow-300 font-semibold mt-2">
            Concerts Dining Events
          </Text>
        </View>

        <View className="bg-[#0f0f10] rounded-t-3xl px-5 py-6">
          <Text className="text-white text-2xl font-semibold mb-4 text-center">
            Log in or signup
          </Text>

          <View>
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

            <Pressable className="bg-white rounded-full py-3 items-center text-white mb-2">
              <Text className="text-black font-semibold">Continue</Text>
            </Pressable>

            <View className="flex-row items-center justify-center space-x-3 mt-2 mb-3">
              <View className="h-[1px] bg-gray-800 flex-1" />
              <Text className="text-gray-400 uppercase text-xs">Or</Text>
              <View className="h-[1px] bg-gray-800 flex-1" />
            </View>

            <Pressable className="bg-white rounded-xl py-3 px-4 flex-row items-center justify-center mb-2">
              <Image
                source={{
                  uri: "https://imgs.search.brave.com/mmKHTVnWzLQvMC7fwfLzYKxedjf2GgRcI9GocUa_C6o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTQv/ODQ4LzcyMC9zbWFs/bC9nb29nbGUtbG9n/by1vbi1ibGFjay1y/b3VuZGVkLXNoYXBl/LWZyZWUtcG5nLnBu/Zw",
                }}
                style={{ width: 20, height: 20, marginRight: 10 }}
                resizeMode="contain"
              />
              <Text className="text-black font-semibold">
                Continue with Google
              </Text>
            </Pressable>

            <View className="flex-row justify-center mt-4 pb-2">
              <Text className="text-gray-400 mr-2">Don't have an account</Text>
              <Pressable onPress={() => router.push("/auth/signup")}>
                <Text className="text-white font-semibold">Sign Up</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login;

const styles = StyleSheet.create({});
