import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context";
import {
  storeData,
  getData,
  getAllKeys,
  removeValue,
  getDate,
  getCalsColor,
  getProteinColor,
} from "../functions";
import Entypo from "@expo/vector-icons/Entypo";

const Total = ({ cals, protein, setCals, setProtein, setHistory }) => {
  const { width } = useSafeAreaFrame();

  const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", padding: 20 },
    bottomContainer: { alignItems: "center", justifyContent: "flex-end" },
    calsNumberText: {
      fontSize: 70,
      fontWeight: "bold",
      color: getCalsColor(cals),
    },
    proteinNumberText: {
      fontSize: 70,
      fontWeight: "bold",
      color: getProteinColor(protein),
    },
    button: {
      width: 300,
      height: 60,
      borderRadius: 15,
      borderWidth: 4,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      fontSize: 16,
      color: "black",
    },
    clearText: {
      fontSize: 18,
      fontWeight: "bold",
      color: "black",
    },
    row: {
      width,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
    },
  });

  const changeCals = (delta) => {
    setCals((prevCals) => {
      const newCals = prevCals + delta;
      storeData(newCals, "cals");
      return newCals;
    });
  };

  const changeProtein = (delta) => {
    setProtein((prevProtein) => {
      const newProtein = prevProtein + delta;
      storeData(newProtein, "protein");
      return newProtein;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => changeCals(-100)}>
            <Entypo name="minus" size={50} color="rgb(0, 0, 0)" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeCals(-10)}>
            <Entypo name="minus" size={30} color="rgb(0, 0, 0)" />
          </TouchableOpacity>
          <Text style={styles.calsNumberText}>{cals}</Text>
          <TouchableOpacity onPress={() => changeCals(10)}>
            <Entypo name="plus" size={30} color="rgb(0, 0, 0)" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeCals(100)}>
            <Entypo name="plus" size={50} color="rgb(0, 0, 0)" />
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>calories</Text>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => changeProtein(-10)}>
            <Entypo name="minus" size={50} color="rgb(0, 0, 0)" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeProtein(-1)}>
            <Entypo name="minus" size={30} color="rgb(0, 0, 0)" />
          </TouchableOpacity>
          <Text style={styles.proteinNumberText}>{protein}</Text>
          <TouchableOpacity onPress={() => changeProtein(1)}>
            <Entypo name="plus" size={30} color="rgb(0, 0, 0)" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeProtein(10)}>
            <Entypo name="plus" size={50} color="rgb(0, 0, 0)" />
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>protein</Text>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setHistory((prevHistory) => {
              const date = getDate();
              const history = { ...prevHistory };
              if (history[date]) {
                history[date].protein += protein;
                history[date].cals += cals;
              } else {
                history[date] = { date, protein, cals };
              }
              storeData(history, "history");
              return history;
            });
            setCals(0);
            storeData(0, "cals");
            setProtein(0);
            storeData(0, "protein");
          }}
        >
          <Text style={styles.clearText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Total;
