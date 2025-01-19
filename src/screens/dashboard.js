import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Parallelogram from '../components/parallelogram';
import Card from '../components/card';
import {AuthContext} from '../utils/auth';
import RNSecureStorage from 'rn-secure-storage';
import {colorResources} from '../utils/colorResources';
import {Images} from '../utils/images';

const Dashboard = ({navigation}) => {
  const {signOut} = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  // checking whether user is logged In or not
  useEffect(() => {
    setTimeout(async () => {
      setIsLoggedIn(await RNSecureStorage.getItem('userToken'));
      console.log('Already logged in', onceLoggedIn);
    });
  }, []);

  // handled back button
  const handleBack = () => navigation.goBack();

  // handled option icon
  const handleOption = async () => {
    if (isLoggedIn != null) {
      Alert.alert('Sign Out', 'Are you sure you want to logout?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            signOut(navigation);
          },
        },
      ]);
    } else {
      Alert.alert('Sign In', 'Please log In', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.optionsBar}>
        {!isLoggedIn ? (
          <TouchableOpacity onPress={handleBack}>
            <Text style={styles.normalText}>Back</Text>
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
        <TouchableOpacity onPress={handleOption}>
          <Image style={styles.optionImg} source={Images.option} />
        </TouchableOpacity>
      </View>
      <Parallelogram
        width={'95%'}
        color={colorResources.elephantBlack}
        parallelogramInnerPosition={{left: 5, top: 65}}
        parallelogramLeftPosition={{left: -20, top: 65}}
        parallelogramRightPosition={{right: -15, top: 65}}
      />
      <View style={styles.profileContainer}>
        <View style={styles.profileImgBgContainer}>
          <Image style={styles.profileImg} source={Images.profile} />
        </View>
        <View style={styles.updateProfileContianer}>
          <Image style={{height: 15, width: 15}} source={Images.camera} />
        </View>
      </View>

      <View style={styles.subtopicContainer}>
        <View style={styles.subtitleIndiContainer}>
          <Text style={styles.subtitleIndiTitleText}>Applied</Text>
          <Text style={styles.subtitleIndiValueText}>28</Text>
        </View>

        <View style={styles.subtitleIndiContainer}>
          <Text style={styles.subtitleIndiTitleText}>Reviewed</Text>
          <Text style={styles.subtitleIndiValueText}>73</Text>
        </View>

        <View style={styles.subtitleIndiContainer}>
          <Text style={styles.subtitleIndiTitleText}>Contacted</Text>
          <Text style={styles.subtitleIndiValueText}>18</Text>
        </View>
      </View>

      <Text style={styles.compProfileText}>Complete Profile</Text>

      <View style={styles.progressContainer}>
        <Card
          backgroundColor={colorResources.blue}
          cardTitle={'Education'}
          leftSteps={2}
          icon={Images.mortarboard}
        />
        <View style={{marginLeft: 15}} />
        <Card
          backgroundColor={colorResources.orange}
          cardTitle={'Professional'}
          leftSteps={2}
          icon={Images.suitcase}
        />
      </View>

      <Text style={styles.underlineText}>Buy Pro $23.49</Text>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {flex: 1, paddingVertical: 40, paddingHorizontal: 30},
  optionsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  normalText: {
    fontSize: 16,
    fontFamily: 'InterTight-Regular',
    color: colorResources.black,
  },
  optionImg: {height: 25, width: 25},
  profileContainer: {width: '100%', alignItems: 'center'},
  profileImgBgContainer: {
    height: 88,
    width: 88,
    borderRadius: 25,
    backgroundColor: colorResources.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImg: {
    height: 85,
    width: 85,
    borderRadius: 25,
  },
  updateProfileContianer: {
    position: 'absolute',
    top: -5,
    right: Dimensions.get('window').width / 2 - 80,
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: colorResources.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtopicContainer: {
    marginTop: 70,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subtitleIndiContainer: {alignItems: 'center'},
  subtitleIndiTitleText: {
    fontSize: 14,
    fontFamily: 'InterTight-Regular',
    color: colorResources.grey,
  },
  subtitleIndiValueText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'InterTight-Regular',
    fontWeight: '800',
  },
  compProfileText: {
    marginTop: 40,
    fontSize: 16,
    fontFamily: 'InterTight-Regular',
    fontWeight: '800',
  },
  progressContainer: {marginTop: 30, flexDirection: 'row'},
  underlineText: {
    marginTop: 50,
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontFamily: 'InterTight-Regular',
    fontWeight: '600',
    fontSize: 12,
  },
});
