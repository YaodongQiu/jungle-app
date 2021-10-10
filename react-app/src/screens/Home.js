import { StyleSheet, Image } from "react-native";

import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Explore from "./Explore";
import Profile from "./Profile";
import CardSwipe from "../components/CardSwipe/index";
import eventsData from "../../assets/events-data/eventsData";

import Chat from "./Chat";

const Tabs = createBottomTabNavigator();

// main function
export default function Home() {
  return (
    //Navigation container used to contain all the screens on the tabBar and naviagte between them

    <Tabs.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          height: 90,
          ...styles.shadow,
        },
      }}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let filePath;
          switch (route.name) {
            case "Swipe":
              filePath = require("../../assets/up-arrow.png");
              break;
            case "Explore":
              filePath = require("../../assets/menu.png");
              break;
            case "Chat":
              filePath = require("../../assets/chat.png");
              break;
            case "Profile":
              filePath = require("../../assets/user.png");
              break;
            default:
              iconName = focused
                ? "ios-information-circle"
                : "ios-information-circle-outline";
          }
          return (
            <>
              <Image
                source={filePath}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#e32f45" : "748c94",
                }}
              />
            </>
          );
        },
      })}
    >
      <Tabs.Screen
        name="Swipe"
        component={CardSwipe.bind(eventsData, eventsData)}
      />
      <Tabs.Screen
        name="Explore"
        component={Explore.bind(eventsData, eventsData)}
      />
      <Tabs.Screen name="Chat" component={Chat} />
      <Tabs.Screen name="Profile" component={Profile} />
    </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
