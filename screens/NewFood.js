import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useRef } from "react";
import { Camera } from "expo-camera";
import Ionicons from "@expo/vector-icons/Ionicons";
import { storeData } from "../functions";
import * as FileSystem from "expo-file-system";

const NewFood = ({ setEntries }) => {
  const [nameText, setNameText] = useState("");
  const [caloriesText, setCaloriesText] = useState("");
  const [proteinText, setProteinText] = useState("");
  const [shouldShowCamera, setShouldShowCamera] = useState(false);
  const [image, setImage] = useState(null);
  const cameraRef = useRef();

  const saveImage = async () => {
    const folder = FileSystem.documentDirectory + "images";
    const { exists } = await FileSystem.getInfoAsync(folder);
    if (!exists) {
      FileSystem.makeDirectoryAsync(folder);
    }
    const file = folder + "/" + nameText.split(" ").join("_") + ".jpg";
    FileSystem.copyAsync({ from: image, to: file });
    return file;
  };

  const submitFood = async () => {
    if (image && nameText && caloriesText && proteinText) {
      const file = await saveImage();
      const foodEntry = {
        image: file,
        name: nameText,
        calories: caloriesText,
        protein: proteinText,
        key: Date.now(),
      };
      setEntries((prevEntries) => {
        const newEntries = [...prevEntries, foodEntry];
        storeData(newEntries, "entries");
        return newEntries;
      });
      setNameText("");
      setCaloriesText("");
      setProteinText("");
      setImage(null);
    }
  };

  const takePicture = async () => {
    const pic = await cameraRef.current.takePictureAsync();
    setImage(pic.uri);
    setShouldShowCamera(false);
  };

  const showCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status) setShouldShowCamera(true);
  };

  return (
    <>
      {shouldShowCamera ? (
        <SafeAreaView style={styles.camera}>
          <Camera
            ref={cameraRef}
            style={styles.camera}
            type={Camera.Constants.Type.back}
          >
            <View style={styles.cameraContainer}>
              <TouchableOpacity
                style={styles.x}
                onPress={() => setShouldShowCamera(false)}
                title=""
              >
                <Ionicons name="close" size={40} color="darkgrey" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={takePicture}
                title=""
              />
            </View>
          </Camera>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.container}>
          <View>
            <TextInput
              style={styles.textInput}
              placeholder="Name"
              value={nameText}
              onChangeText={setNameText}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Calories"
              value={caloriesText}
              onChangeText={setCaloriesText}
              keyboardType={"numeric"}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Protein"
              value={proteinText}
              onChangeText={setProteinText}
              keyboardType={"numeric"}
            />
          </View>
          <View>
            {image ? (
              <TouchableOpacity
                onPress={showCamera}
                style={styles.imageContainer}
              >
                <Image source={{ uri: image }} style={styles.image} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={showCamera} style={styles.center}>
                <Ionicons name="camera" size={200} color="rgb(0, 0, 0)" />
              </TouchableOpacity>
            )}
          </View>
          {nameText && caloriesText && proteinText && image ? (
            <TouchableOpacity style={styles.submitButton} onPress={submitFood}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.invisButton} />
          )}
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    padding: 15,
    justifyContent: "space-between",
  },
  center: { alignItems: "center", justifyContent: "center" },
  submitButton: {
    width: 300,
    height: 60,
    borderRadius: 15,
    borderWidth: 4,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  invisButton: {
    width: 300,
    height: 60,
  },
  submitText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  textInput: {
    marginBottom: 20,
    color: "black",
    //borderWidth: 0.5,
    height: 60,
    padding: 15,
    borderRadius: 15,
    backgroundColor: "rgb(240, 240, 240)",
  },
  camera: { flex: 1 },
  image: { height: "100%", width: "100%" },
  imageContainer: {
    height: 300,
    width: 300,
    alignSelf: "center",
    alignItems: "center",
  },
  x: { alignSelf: "flex-end" },
  button: {
    borderRadius: 100,
    height: 60,
    width: 60,
    backgroundColor: "white",
    alignSelf: "center",
  },
});

export default NewFood;
