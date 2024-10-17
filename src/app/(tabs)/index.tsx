import { StyleSheet } from "react-native";
import MyTimeline from "../../screens/(timeline)/MyTimeline";

export default function Tab() {
  return <MyTimeline />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
