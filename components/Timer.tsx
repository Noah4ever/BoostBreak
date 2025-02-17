import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Pressable, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import Svg, { Circle } from "react-native-svg";
import { useState, useEffect } from "react";
import { IconSymbol } from "./ui/IconSymbol";

export default function Timer() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const [timeLeft, setTimeLeft] = useState(50 * 60); // 50:00 in seconds
  const totalTime = 50 * 60; // Total countdown time

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const progress = timeLeft / totalTime; // Progress for circle
  const radius = 60;
  const strokeWidth = 4;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <ThemedView style={styles.container}>
      <Svg width={250} height={250} viewBox="0 0 150 150">
        <Circle cx="75" cy="75" r={radius} stroke={theme.border} strokeWidth={strokeWidth} fill="none" />
        <Circle
          cx="75"
          cy="75"
          r={radius}
          stroke={theme.primary}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90, 75, 75)"
        />
      </Svg>
      <ThemedView style={styles.timerContentContainer}>
        <ThemedText style={styles.text}>Next break</ThemedText>
        <ThemedText style={styles.time}>{`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}</ThemedText>
        <Pressable
          style={styles.timerSettings}
          onPress={() => {
            alert("test");
          }}>
          <IconSymbol name="gear" size={28} color={theme.textMuted} />
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  timerContentContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    marginBottom: 5,
  },
  time: {
    fontSize: 42,
    lineHeight: 42,
  },
  timerSettings: {
    position: "absolute",
    top: 80,
  },
});
