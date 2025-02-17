import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Pressable, StyleSheet } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import Timer from "@/components/Timer";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Mulish: require("../assets/fonts/Mulish-Light.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemedView>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.topContainer}>
          <IconSymbol name="person.circle" size={38} color={theme.primary} />
        </ThemedView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Boost Break</ThemedText>
        </ThemedView>
        <ThemedText style={{ marginTop: 10, marginLeft: 5 }}>Welcome, Noah!</ThemedText>

        <ThemedView style={styles.timerContainer}>
          <Timer />
          <Pressable
            style={{ ...styles.startBreakButton, backgroundColor: theme.primary }}
            onPress={() => {
              alert("test");
            }}>
            <IconSymbol name="leaf" size={20} color={theme.buttonText} />
            <ThemedText style={{ ...styles.startBreakButtonText, color: theme.buttonText }}>Start break</ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
      <StatusBar style="auto" backgroundColor={theme.background} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  titleContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  timerContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  startBreakButton: {
    paddingBlock: 15,
    paddingInline: 30,
    borderRadius: 100,
    marginTop: 20,
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  startBreakButtonText: {},
});
