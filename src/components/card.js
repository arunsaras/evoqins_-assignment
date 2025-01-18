import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {colorResources} from '../utils/colorResources';
import {Images} from '../utils/images';

const Card = ({backgroundColor, icon, cardTitle, leftSteps}) => {
  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <View style={{borderRadius: 10}}>
        <Image style={{height: 25, width: 25}} source={icon} />
      </View>
      <Text style={styles.cardTitleText}>{cardTitle}</Text>
      <View style={styles.stepsConatiner}>
        <View style={{marginTop: 15, width: 50}}>
          <Text style={{fontSize: 12, fontWeight: '500', color: '#ffffff'}}>
            {leftSteps} Steps Left
          </Text>
        </View>
        <Image style={{height: 15, width: 15}} source={Images.arrow} />
      </View>
      <View style={styles.underline} />
    </View>
  );
};

export default Card;
const styles = StyleSheet.create({
  container: {
    width: 125,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 25,
  },
  cardTitleText: {
    marginTop: 10,
    fontSize: 10,
    fontFamily: 'InterTight-Regular',
    color: colorResources.white,
  },
  stepsConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepsLeftText: {
    fontSize: 12,
    fontFamily: 'InterTight-Regular',
    fontWeight: '600',
    color: colorResources.white,
  },
  underline: {
    marginTop: 5,
    height: 1,
    width: 40,
    backgroundColor: colorResources.white,
  },
});
