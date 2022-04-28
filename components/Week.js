import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Week = ({ height, width }) => {
  const styles = StyleSheet.create({
    weekContainer: { height: height / 4, flexDirection: "row" },
    dayContainer: { height: height / 4, width: width / 7, borderWidth: 1 },
  });
  return (
    <View style={styles.weekContainer}>
      <View style={styles.dayContainer}></View>
      <View style={styles.dayContainer}></View>
      <View style={styles.dayContainer}></View>
      <View style={styles.dayContainer}></View>
      <View style={styles.dayContainer}></View>
      <View style={styles.dayContainer}></View>
      <View style={styles.dayContainer}></View>
    </View>
  );
};

export default Week;
