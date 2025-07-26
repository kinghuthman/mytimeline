import MyTimeline from "@/src/components/timeline/MyTimeline";
import * as React from "react";
import { Text, View } from "react-native";

// reusue the MyTimeline component and have it display a timeline of profile activities
export default function ProfileScreen() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            marginBottom: 20,
            alignItems: "center",
            width: 150,
            height: 150,
            borderRadius: 50,
            backgroundColor: "lightgray",
            justifyContent: "center",
          }}
        >
          <Text
            style={{ fontSize: 32, fontWeight: "bold", textAlign: "center" }}
          >
            Profile Image
          </Text>
        </View>
      </View>
      <View style={{ padding: 20 }}>
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
      <MyTimeline />
    </View>
  );
}
