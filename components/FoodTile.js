import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { removeValue, storeData } from "../functions";

const FoodTile = (props) => {
  const [marginLeft, setMarginLeft] = useState(0);
  const [marginRight, setMarginRight] = useState(0);
  const { height, width } = useSafeAreaFrame();
  useEffect(() => {
    if (props.index % 2 === 0) {
      setMarginLeft(5);
      setMarginRight(10);
    } else {
      setMarginLeft(10);
      setMarginRight(5);
    }
  }, [props.index]);

  const styles = StyleSheet.create({
    tile: {
      height: height / 5,
      width: width / 2.3,
      marginLeft,
      marginRight,
      marginTop: 15,
    },
    image: {
      height: "100%",
      width: "100%",
      borderRadius: 15,
    },
  });

  return (
    <TouchableOpacity
      onPress={() => {
        props.setCals((prev) => {
          const newCals = prev + parseInt(props.calories, 10);
          storeData(newCals, "cals");
          return newCals;
        });
        props.setProtein((prev) => {
          const newProtein = prev + parseInt(props.protein, 10);
          storeData(newProtein, "protein");
          return newProtein;
        });
      }}
      onLongPress={() => {
        Alert.alert(
          "Delete?",
          "Are you sure you want to delete " + props.name + "?",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Delete",
              onPress: () => {
                props.setEntries((prev) => {
                  const newEntries = [
                    ...prev.slice(0, props.index),
                    ...prev.slice(props.index + 1),
                  ];
                  storeData(newEntries, "entries");
                  return newEntries;
                });
              },
            },
          ]
        );
      }}
      style={styles.tile}
    >
      <Image
        source={{ uri: props.image }}
        resizeMode="stretch"
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

export default FoodTile;
