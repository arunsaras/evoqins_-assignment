import React from 'react';
import { View, StyleSheet } from 'react-native';


const TriangleUp = ({ style }) => (
  <View style={[styles.triangleUp, style]} />
);

const TriangleDown = ({ style }) => (
  <View style={[styles.triangleDown, style]} />
);

const Parallelogram = ({width,color,parallelogramInnerPosition,parallelogramLeftPosition,parallelogramRightPosition}) => {
  return (
    <View style={[styles.parallelogram,{width:width}]}>
      <TriangleUp style={[styles.parallelogramLeft,{ borderBottomColor: color,},parallelogramLeftPosition]} />
      <TriangleDown style={[styles.parallelogramRight,{borderTopColor: color,},parallelogramRightPosition]} />
      <View style={[styles.parallelogramInner,{width:width,backgroundColor:color},parallelogramInnerPosition]} />
      
    </View>
  );
};

const styles = StyleSheet.create({
  parallelogram: {
    height: 100,
    position: 'relative', 
    transform:[{skewY:"-15deg"}],
    
  },
  parallelogramInner: {
    position: 'absolute',
    height: 100,
  },
  parallelogramRight: {
    position: 'absolute',
  },
  parallelogramLeft: {
    position: 'absolute',
  },
  triangleUp: {
    width: 0,
    height: 0,
    borderLeftWidth: 25, 
    borderRightWidth: 25,
    borderBottomWidth: 100, 
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  triangleDown: {
    width: 0,
    height: 0,
    borderLeftWidth: 25, 
    borderRightWidth: 25,
    borderTopWidth: 100, 
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});

export default Parallelogram;
