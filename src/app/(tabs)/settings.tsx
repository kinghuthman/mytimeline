import SettingsScreen from "@/src/screens/(settings)/SettingsScreen";
import { StyleSheet } from "react-native";

export default function Tab() {
  return <SettingsScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
