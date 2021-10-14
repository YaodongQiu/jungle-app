import { Text, View, Image,StyleSheet, Alert, Modal } from "react-native";
import { AntDesign } from '@expo/vector-icons';
//import styles from "../../styles";
import { MaterialIcons } from '@expo/vector-icons';

import React, { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";



const DATA = [{

  title: "cat sitting",
  imageUrl: "https://picsum.photos/id/237/200/300",
  date: "12/13/2021",
  id: "bd7a8bea-c1b1-46c2-aed5-3ad53abb28ba",
  },
  {

    title: "bird watching",
    imageUrl: "https://picsum.photos/id/237/200/300",
    date: "11/13/2021",
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63"
  },
  {

    title: "swim racing",
    imageUrl: "https://picsum.photos/id/237/200/300",
    date: "10/13/2021",
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    }
  ]
  
function HostManage() {
  const [modelOpen1,setModalOpen] = useState(false);
  
  return (
    <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>

      <Text style={{ margin: 90, fontSize: 28 }}>Manage</Text>
   

      <FlatList
        data={DATA}
        renderItem={renderItem}
      />


      <Modal visible={modelOpen1} animationType="slide">
        <View style={styles.modelContent}>
          <Text> Modal here </Text>
          <TouchableOpacity style={styles.signOutBtn} onPress={()=>setModalOpen(false)}>
        <Text style={styles.signOutBtnText}>Create Event</Text>
      </TouchableOpacity>
        </View>
      </Modal>

      <Modal visible={modelOpen2} animationType="fade">
        <View style={styles.modelContent}>
          <Text> Modal here for event View </Text>
          <TouchableOpacity style={styles.signOutBtn} onPress={()=>setModalOpen(false)}>
        <Text style={styles.signOutBtnText}>Create Event</Text>
      </TouchableOpacity>
        </View>
      </Modal>


      <TouchableOpacity 
        onPress ={()=>setModalOpen(true)}
        >
        <AntDesign name="pluscircleo" size={50} color="green" />
      </TouchableOpacity>
    </View>
  );

  
}

const Item = ({ item,onPress }) => (

  <TouchableOpacity
  onPress={onPress}
  >
    <View style={styles.itemView}>
      <Image style={{height:100,width:100}} source={{uri:item.imageUrl}} />
      <Text style={{fontSize:20,fontWeight:"bold",paddingLeft:15,flexWrap:"wrap"}}>{item.title}</Text>
      <Text style={{fontSize:15,alignSelf:"flex-end"}}>{item.date}</Text>
      <MaterialIcons name="keyboard-arrow-right" size={44} color="black" alignSelf="stretch" />
    </View>
    <View style={{borderColor:"grey",borderWidth:1,height:1,width:"70%",alignSelf:"center"}}></View>

  </TouchableOpacity>
);
const renderItem = ({ item }) => {
  // const [modelOpen2,setModalOpen2] = useState(false);
return (
  <Item
    item={item}
    // onPress={() => setModalOpen2(true)}
    onPress ={()=> console.log("ress")}
  />
);
};




const styles = StyleSheet.create({
  itemView:{
    flexDirection: "row",
    flex:1,
    padding:10,
    marginBottom:40,
    color:"green",
    alignItems:"center",
    justifyContent:"space-evenly"
  },
  modelContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30
  },
  signOutBtn: {
		//top: 300,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.4,
		shadowRadius: 5,
		opacity: 0.8,
		width: '70%',
		backgroundColor: '#85ba7f',
		padding: 15,
		borderRadius: 10
	},
	signOutBtnText: {
		alignSelf: 'center',
		textTransform: 'uppercase',
		fontWeight: 'bold',
		fontSize: 18,
		color: "#2f402d"
	}
})

export default HostManage;


//<Image style={styles.image} source={require("../../assets/Tucan.png")} />

