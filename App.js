import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Total from "./screens/Total";
import Add from "./screens/Add";
import NewFood from "./screens/NewFood";
import WeekPage from "./screens/WeekPage";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { storeData, getData, getAllKeys, removeValue } from "./functions";
import Material from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";

const Tab = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "rgb(255, 255, 255)",
  },
};

export default function App() {
  const [cals, setCals] = useState(0);
  const [protein, setProtein] = useState(0);
  const [entries, setEntries] = useState([]);
  const [history, setHistory] = useState({});

  useEffect(() => {
    getData("entries").then((storageEntries) => {
      if (storageEntries) setEntries(storageEntries);
      else storeData([], "entries");
    });
    getData("cals").then((storageCals) => {
      if (storageCals) setCals(storageCals);
      else storeData(0, "cals");
    });
    getData("protein").then((storageProtein) => {
      if (storageProtein) setProtein(storageProtein);
      else storeData(0, "protein");
    });
    getData("history").then((storageHistory) => {
      if (storageHistory) setHistory(storageHistory);
      else storeData({}, "history");
      //console.log(storageHistory);
    });
  }, []);

  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Material
                name="counter"
                size={size}
                color={focused ? color : "black"}
              />
            ),
          }}
          name="Today"
          children={() => (
            <Total
              cals={cals}
              setCals={setCals}
              protein={protein}
              setProtein={setProtein}
              entries={entries}
              setHistory={setHistory}
            />
          )}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Material
                name="calendar"
                size={size}
                color={focused ? color : "black"}
              />
            ),
          }}
          name="History"
          children={() => <WeekPage history={history} />}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Entypo
                name="plus"
                size={size}
                color={focused ? color : "black"}
              />
            ),
          }}
          name="Add Food"
          children={() => (
            <Add
              setCals={setCals}
              setProtein={setProtein}
              setEntries={setEntries}
              entries={entries}
            />
          )}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Entypo
                name="add-to-list"
                size={size}
                color={focused ? color : "black"}
              />
            ),
          }}
          name="New Food"
          children={() => <NewFood setEntries={setEntries} />}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
