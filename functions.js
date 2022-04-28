import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (value, key) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

const getAllKeys = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (e) {
    console.log(e);
  }
  return keys;
};

const removeValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};

const getDate = () => {
  const offset = new Date().getTimezoneOffset() * 60 * 1000;
  return new Date(Date.now() - offset).toISOString().split("T")[0];
};

const getCalsColor = (cals) => {
  if (cals < 1600) return "rgb(219, 29, 29)";
  else if (cals < 2600) return "rgb(240, 208, 50)";
  else return "rgb(68, 173, 42)";
};

const getProteinColor = (protein) => {
  if (protein < 70) return "rgb(219, 29, 29)";
  else if (protein < 110) return "rgb(240, 208, 50)";
  else return "rgb(68, 173, 42)";
};

export {
  storeData,
  getData,
  getAllKeys,
  removeValue,
  getDate,
  getCalsColor,
  getProteinColor,
};
