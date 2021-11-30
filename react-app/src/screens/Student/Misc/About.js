import {
  View,
  LayoutAnimation,
  ImageBackground,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import React, { useEffect } from "react";

import { Text } from "react-native-elements";
import Constants from "expo-constants";

import { Divider } from "react-native-elements";

var { height, width } = Dimensions.get("window");

const smallSize = width / 5;
const itemWidth = width * 0.67;
const itemHeight = height / 2 - Constants.statusBarHeight * 2;

export default function About({ navigation, route }) {
  const hostValue = React.useRef([]).current;
  const [isLoading, setIsLoading] = React.useState(true);
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}></View>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}> {"About Us"} </Text>

            <Divider orientation='vertical' width={5} />
          </View>
        </View>
      </View>

      <View style={styles.containerExplore}>
        <Text style={styles.headingExplore}>Team 17 Purdue</Text>
      </View>
    </>
  );
}

// prettier-ignore
const styles = StyleSheet.create({
      container: {
          height: 20,
          //width:410,
          resizeMode: 'contain',
      },
  
      image: {
          width: "100%",
          height: "100%",
          borderRadius: 20,
          overflow: "hidden",
          justifyContent: "flex-end",
      },
      ver_stat: {
          width: 20,
          height: 20,
          //borderRadius: 0,
          //borderWidth: 4,
          //borderColor: "white",
          //marginBottom:10,
          //alignSelf:'center',
          position: 'relative',
          marginTop: 0,
      },
  
      loginBtn: {
          width: "50%",
          borderRadius: 10,
          height: 50,
          bottom: 0,
          position: 'relative',
          top: 80,
          alignItems: "center",
          justifyContent: "center",
          marginLeft: Dimensions.get('window').width / 4,
          backgroundColor: "grey",
      },
  
      textButton: {
          fontSize: 16,
          lineHeight: 21,
          fontWeight: 'bold',
          letterSpacing: 0.25,
          color: 'white',
      },
  
      TextContainer: {
          position: 'relative',
          height: 80,
          resizeMode: 'contain',
          justifyContent: "flex-end",
          top: 400,
          //bottom: 100 
      },
  
      scrollView: {
          backgroundColor: 'white',
          resizeMode: "contain",
          marginVertical: 3,
          //marginHorizontal: 5,
          paddingTop: 5,
          paddingBottom: 0,
      },
  
      text: {
          //paddingTop:3,
          position: "relative",
          fontSize: 21,
          lineHeight: 21,
          //fontWeight: 'bold',
          letterSpacing: 0.25,
          color: 'black',
      },
  
      textInner: {
          //paddingTop:3,
          position: "relative",
          fontSize: 21,
          lineHeight: 21,
          //fontWeight: 'bold',
          letterSpacing: 0.25,
          color: 'black',
      },
  
      header: {
          backgroundColor: "#85ba7f",
          height: 200,
      },
      avatar: {
          width: 130,
          height: 130,
          borderRadius: 63,
          borderWidth: 4,
          borderColor: "white",
          marginBottom: 10,
          alignSelf: 'center',
          position: 'absolute',
          marginTop: 130
      },
  
      body: {
          marginTop: 10,
      },
  
      bodyContent: {
          //flex: 1,
          alignItems: 'center',
          padding: 30,
      },
      name: {
          fontSize: 28,
          color: "#696969",
          fontWeight: "600",
          position: "absolute",
      },
  
      info: {
          fontSize: 16,
          color: "#85ba7f",
          marginTop: 10
      },
  
      description: {
          fontSize: 16,
          color: "#696969",
          marginTop: 10,
          textAlign: 'center'
      },
  
      buttonContainer: {
          marginTop: 10,
          height: 45,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
          width: 250,
          borderRadius: 30,
          backgroundColor: "#85ba7f",
      },
  
      containerExplore: {
          top: 210,
          flex: 1,
          alignItems: "flex-start",
          justifyContent: "center",
          marginTop: Constants.statusBarHeight,
      },
      emptyItem: {
          overflow: "hidden",
          height: itemHeight,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          borderLeftWidth: 20,
          borderColor: "white",
          width: itemWidth,
          backgroundColor: "transparent",
      },
      headingExplore: {
          fontSize: 22,
          fontWeight: "300",
          alignSelf: "flex-start",
          paddingHorizontal: 10,
          paddingVertical: 10,
      },
  
  
  });
