import ProfileScreen from "@/src/screens/(profile)/ProfileScreen";
import { StyleSheet } from "react-native";

export default function Tab() {
  return <ProfileScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
