import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, Button, Animated } from 'react-native';
import Constants from 'expo-constants'

type Collaps = {
  animatedValue : Animated.Value,
}

const MIN = 80
const MAX = 1000

function CollapseView() {


  return (
    
      <View style={{width: 100, height: 100}}/>
  );
}

const styles = StyleSheet.create({
  paragraph: {
    margin: 24,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CollapseView;
