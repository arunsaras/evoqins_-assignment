import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {colorResources} from '../utils/colorResources';

const Button = ({onPress, buttonName, bgColor = colorResources.grey}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={[styles.container, {backgroundColor: bgColor}]}>
      <Text style={styles.text}>{buttonName}</Text>
    </TouchableOpacity>
  );
};

export default Button;
const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colorResources.elephantBlack,
    fontSize: 18,
    fontFamily: 'InterTight-Regular',
    fontWeight: '500',
  },
});
