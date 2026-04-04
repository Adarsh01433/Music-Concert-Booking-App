   import { getConcert } from "@/api/concertApi";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
    ActivityIndicator,
    Dimensions,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const COLOR_MAP: Record<string, { color: string; border: string }> = {
  fanpit: { color: "#F8D3DB", border: "#E59AA6" },
  platinum: { color: "#DCEBFF", border: "#ABCBFF" },
  gold: { color: "#E7DEF9", border: "#C6B4F2" },
  silver: { color: "#CFF3EB", border: "#8ED6C0" },
};

export default function BookConcertScreen() {
  const router = useRouter();

  const {data: concert,isLoading,error} = useQuery({ queryKey: ["concert"],
    queryFn: getConcert,
  });

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-black justify-center items-center">
        <ActivityIndicator size={"large"} color={"#fff"} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-black justify-center items-center">
        <Text>Error Loading Concert : {error?.message}</Text>
      </SafeAreaView>
    );
  }

  const formatedDate = new Date(concert.date).toLocaleString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  const formattedTime = new Date(concert.date)
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
    .toUpperCase();

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="px-4 pt-3">
        <View className="flex-row items-center">
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color={"#fff"} />
          </Pressable>

          <View className="ml-3">
            <Text className="text-white text-lg font-semibold">
              {concert?.name}
            </Text>
            <Text className="text-gray-400 text-sm mt-1">
              {formatedDate} | {formattedTime} onwards |{" "}
              {concert?.venue?.split(", ")[0]}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 36 }}
        className="px-4 mt-4"
      >
        <Text className="text-white text-2xl font-bold mb-4">
          Select a section
        </Text>

        <View className="flex-row items-center mb-6">
          <Text className="text-gray-400 mr-3">Filters</Text>
          {["$500", "$1,000", "$2,500", "$5,000", "$10,000"].map((f) => (
            <View
              key={f}
              className="px-3 py-2 mr-3 rounded-xl border border-gray-800"
              style={{ backgroundColor: "#0f0f0f" }}
            >
              <Text className="text-gray-300 text-sm">{f}</Text>
            </View>
          ))}
        </View>

        <View className="items-centre mb-6">
          <View className="w-11/12 rounded-xl border border-gray-700 px-4 py-3 items-center">
            <Text className="text-gray-300 font-semibold">STAGE</Text>
          </View>
        </View>

        <View>{concert?.categories?.map((cat:{id : string; name : string; price : number})=> {
          const colors = COLOR_MAP[cat.name.toLowerCase()] || {color : "#EAFCC6", border : "#BFD67D"};
          return (
            <Pressable key={cat.id} 
            style= {{ backgroundColor : colors?.color,
              borderColor : colors.border,
              borderWidth : 3,
              width : width - 40,
            }}
            className="rounded-xl px-4 py-6 mx-auto w-11/12 justify-center items-center">
              <Text className="text-center font-bold text-lg ">{cat.name?.toUpperCase()}</Text>
              <Text className="text-center text-sm mt-1" style = {{color : "#2b2b2b"}}>
                ${cat.price.toLocaleString()} onwards
              </Text>
            </Pressable>
          )
        })}</View>

        <View className="items-center mb-8">
          <Text className="text-gray-400 font-semibold">ALL THE SECTIONS ARE STANDING</Text>
        </View>

        <View className="mt-4 mb-12 px-4">
          <View className="flex-row items-center">
            <View className="w-6 h-6 rounded-md mr-3" style = {{borderWidth : 2, borderColor: "#3a3a3a",
              backgroundColor : "transparent"
            }}/>
            <Text className="text-gray-400">Sold out/Unavilable stands are marked as grey</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}