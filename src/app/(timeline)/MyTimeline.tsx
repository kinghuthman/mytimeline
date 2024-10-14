import * as React from "react";
import { View } from "react-native";
import Timeline from "./Timeline";

export default function myTimeline() {
  console.log("first");
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Timeline
        data={[
          { id: 0, title: "Jan 2023", description: "List" },
          { id: 1, title: "February 2023", description: "List2" },
          { id: 3, title: "March 2023", description: "List3" },
          { id: 4, title: "April 2023", description: "List4" },
          { id: 5, title: "May 2023", description: "List5" },
          { id: 6, title: "Jun 2023", description: "List6" },
        ]}
      />
    </View>
  );
}
