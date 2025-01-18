import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import Button from '../components/button';
import Parallelogram from '../components/parallelogram';
import {AuthContext} from '../utils/auth';
import {Images} from '../utils/images';
import {colorResources} from '../utils/colorResources';

const OnBoard = ({navigation}) => {
  const {onBoard} = useContext(AuthContext);

  const handleSkip = () => navigation.navigate('loginGuest');

  const handleNext = () => onBoard();

  return (
    <View style={styles.container}>
      <Image style={styles.semiCircle} source={Images.circle_half} />
      <Parallelogram
        width={'98%'}
        color={colorResources.red}
        parallelogramInnerPosition={{left: 5, top: 0}}
        parallelogramLeftPosition={{left: -20, top: 0}}
        parallelogramRightPosition={{right: -24, top: 0}}
      />
       <Parallelogram
        width={'95%'}
        color={colorResources.elephantBlack}
        parallelogramInnerPosition={{left: 40, top: -70}}
        parallelogramLeftPosition={{left: 15, top: -70}}
        parallelogramRightPosition={{right: -49, top: -70}}
      />
      <View>
        <Text style={styles.getStartFadeText}>Get Started</Text>
        <View style={styles.containerOnboard}>
          <Text style={styles.onboardText}>
            Millions of people use to turn their ideas into reality.
          </Text>
        </View>
        <View style={styles.containerNext}>
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.getStartFadeText}>Skip Now</Text>
          </TouchableOpacity>
          <Button buttonName={'Next'} onPress={handleNext} />
        </View>
      </View>
    </View>
  );
};

export default OnBoard;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 30, justifyContent: 'space-between'},
  semiCircle: {height: 30, width: 30},
  getStartFadeText: {
    fontSize: 14,
    color: colorResources.grey,
    fontFamily: 'InterTight-Regular',
  },
  containerOnboard: {width: '80%', marginTop: 5},
  onboardText: {
    fontSize: 30,
    fontFamily: 'InterTight-Regular',
    fontWeight: 'bold',
    color: colorResources.black,
  },
  containerNext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
  },
});
