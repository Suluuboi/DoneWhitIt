import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, StyleSheet, Text, View} from 'react-native';

import CustomSafeAreaView from './app/components/CustomSafeAreaView';



export default function App() {

  enum StackPages {
    Tweeter = 'tweeter',
    TweeterDetails = 'tweeter-details'
  }

  type StackParams={
    [StackPages.Tweeter] : undefined
    [StackPages.TweeterDetails] : undefined
  }

  type NavigationProps<RouteName extends keyof StackParams = StackPages> 
    = StackNavigationProp<StackParams, RouteName>

  const Stack = createStackNavigator<StackParams>()
  
  type tweeterProps={
    navigation: NavigationProps<StackPages.Tweeter>
  }

  function tweet({navigation}:tweeterProps){

    return(
    <CustomSafeAreaView>
      <Button title={'to details'} onPress={()=>navigation.push(StackPages.TweeterDetails)}/>
    </CustomSafeAreaView>)
  }

  function twwetDetails(){
    return(
    <CustomSafeAreaView>
      <Text style={styles.center}>{"Tweet Deatais"}</Text>
    </CustomSafeAreaView>)
  }

  function StackNavigator(){
    return(
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name={StackPages.Tweeter}  component={tweet}></Stack.Screen>
            <Stack.Screen name={StackPages.TweeterDetails} component={twwetDetails}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  return (
    <View style={styles.container}>
        <StackNavigator/>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  center:{
    justifyContent: 'center',
    alignContent: 'center'
  }
});
