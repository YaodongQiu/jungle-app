import {
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";

import React, { useState } from "react";

import SettingsList from "react-native-settings-list";

export default function AccountInfo({ navigation, route }) {
  const [email, setEmail] = useState("John@purdue.edu");
  const [name, setName] = useState("John");
  const [Gender, setGender] = useState("male");
  const [editing, setEditing] = useState(false);

  let changeInfoEmail = () => {
    setEditing(true);
    let newEmail = Alert.prompt("Enter new email", "", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: (newEmail) => setEmail(newEmail),
      },
    ]);
  };

  let changeInfoName = () => {
    setEditing(true);
    let newName = Alert.prompt("Enter new Name", "", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: (newEmail) => setName(newEmail),
      },
    ]);
  };

  let changeInfoGender = () => {
    setEditing(true);
    let newEmail = Alert.prompt("Enter new gender", "", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: (newEmail) => setGender(newEmail),
      },
    ]);
  };
  return (
    <View style={{ backgroundColor: "#EFEFF4", flex: 1 }}>
      <View
        style={{
          borderBottomWidth: 1,
          backgroundColor: "#f7f7f8",
          borderColor: "#c8c7cc",
        }}
      ></View>

      <View style={{ backgroundColor: "#EFEFF4", flex: 1 }}>
        <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
          <SettingsList.Header
            headerStyle={{ marginTop: 20, fontSize: 20, fontWeight: "bold" }}
            headerText='Info'
            position='relative'
          />
          <SettingsList.Item
            title='Email'
            titleInfo={email}
            hasNavArrow={false}
          />
          <SettingsList.Item
            title='Name'
            titleInfo={name}
            hasNavArrow={false}
          />
          <SettingsList.Item
            title='Gender'
            titleInfo={Gender}
            hasNavArrow={false}
          />
        </SettingsList>
        <TouchableOpacity style={styles.signOutBtn} onPress={changeInfoEmail}>
          <Text style={styles.signOutBtnText}>Edit Email</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signOutBtn1} onPress={changeInfoName}>
          <Text style={styles.signOutBtnText}>Edit Name</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signOutBtn2} onPress={changeInfoGender}>
          <Text style={styles.signOutBtnText}>Edit Gender</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  signOutBtn: {
    position: "absolute",
    top: 550,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    opacity: 0.8,
    width: "70%",
    backgroundColor: "#85ba7f",
    padding: 15,
    marginLeft: 50,
    borderRadius: 10,
  },
  signOutBtn1: {
    position: "absolute",
    top: 450,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    opacity: 0.8,
    width: "70%",
    backgroundColor: "#85ba7f",
    padding: 15,
    marginLeft: 50,
    borderRadius: 10,
  },
  signOutBtn2: {
    position: "absolute",
    top: 500,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    opacity: 0.8,
    width: "70%",
    backgroundColor: "#85ba7f",
    padding: 15,
    marginLeft: 50,
    borderRadius: 10,
  },
  signOutBtnText: {
    alignSelf: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 18,
    color: "#2f402d",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130,
  },
});
