import { ThemedView } from "@/components/themed-view";
import DashboardScreen from "../dashboard";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <ThemedView className="flex-1">
      <SafeAreaView className="flex-1">
        <DashboardScreen />
      </SafeAreaView>
    </ThemedView>
  );
}
