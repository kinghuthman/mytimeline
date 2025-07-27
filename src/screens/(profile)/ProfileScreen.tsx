import MyTimeline from "@/src/components/timeline/MyTimeline";
import * as React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: "teal" }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Header Background */}
        <View style={{ backgroundColor: "lightblue", height: 100 }} />

        {/* Profile Image Section */}
        <View
          style={{
            position: "absolute",
            top: 40,
            left: 0,
            right: 0,
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <View
            style={{
              marginBottom: 20,
              alignItems: "center",
              width: 150,
              height: 150,
              borderRadius: 75,
              backgroundColor: "lightgray",
              justifyContent: "center",
              borderWidth: 4,
              borderColor: "white",
            }}
          >
            <Text
              style={{ fontSize: 32, fontWeight: "bold", textAlign: "center" }}
            >
              Profile Image
            </Text>
          </View>
        </View>

        {/* Profile Info Section */}
        <View style={{ padding: 20, marginTop: 100 }}>
          <Text style={{ fontSize: 18, textAlign: "center", marginTop: 10 }}>
            Welcome to your profile page!
          </Text>
          <Text style={{ fontSize: 16, textAlign: "center", marginTop: 5 }}>
            Here you can view and edit your profile information.
          </Text>
          <Text style={{ fontSize: 20, textAlign: "center", marginTop: 20 }}>
            Profile Details
          </Text>
          <Text style={{ fontSize: 16, textAlign: "center", marginTop: 10 }}>
            Name: John Doe
          </Text>
        </View>

        {/* Timeline Section */}
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <MyTimeline />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
