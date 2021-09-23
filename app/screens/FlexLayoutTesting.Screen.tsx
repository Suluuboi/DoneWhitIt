import React from 'react';
import { StyleSheet, View } from 'react-native';

/**Used to text out flex styling behaviour behaviors */

function FlexLayoutTestScreen() {


  return (
    <View style={styles.main_container}>
      <View style={styles.container1}/>
      <View style={styles.container2}/>
      <View style={styles.container3}/>
      <View style={styles.container4}/>
      <View style={styles.container5}/>
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    //primary(main) access styles
    flexDirection: "row", //primary access
    justifyContent: 'center', //align content on the primary access
    //secondary(cross) access style
    alignItems:"center",
    //alignContent:"center",//only applicable with flex wrap
    //flexWrap: "wrap"
  },
  container1:{
    //alignSelf: "flex-start",
    backgroundColor: "dodgerblue",
    width:100,
    height: 100
  },
  container2:{
    //flex:1,
    backgroundColor: "red",
    width:100,
    height: 100,
    left:40,
    top:40,
    position: "relative"
  },
  container3:{
    //flex:1,
    backgroundColor: "green",
    width:100,
    height: 100
  },
  container4:{
    //flex:1,
    backgroundColor: "grey",
    width:100,
    height: 100
  },
  container5:{
    //flex:1,
    backgroundColor: "purple",
    width:100,
    height: 100
  }
});

export default FlexLayoutTestScreen;
