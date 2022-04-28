import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import FoodTile from "../components/FoodTile";

const Add = ({ setProtein, setCals, entries, setEntries }) => {
  const renderItem = ({ item, index }) => {
    return (
      <FoodTile
        calories={item.calories}
        protein={item.protein}
        image={item.image}
        setCals={setCals}
        setProtein={setProtein}
        index={index}
        name={item.name}
        setEntries={setEntries}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        numColumns={2}
        renderItem={renderItem}
        data={entries}
        columnWrapperStyle={{ justifyContent: "flex-start" }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
});

export default Add;
