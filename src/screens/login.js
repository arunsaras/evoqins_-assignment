import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Button from '../components/button';
import {AuthContext} from '../utils/auth';
import RNSecureStorage from 'rn-secure-storage';
import {Images} from '../utils/images';
import {colorResources} from '../utils/colorResources';
import {passcodeRegex, userNameRegex} from '../utils/constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Login = ({navigation}) => {
  const {signIn} = useContext(AuthContext);
  const [onceLoggedIn, setOnceLoggedIn] = useState(null);
  const [userName, setUserName] = useState('');
  const [passcode, setPasscode] = useState('');

  let checkCred = userNameRegex.test(userName) && passcodeRegex.test(passcode);

  useEffect(() => {
    setTimeout(async () => {
      setOnceLoggedIn(await RNSecureStorage.getItem('onceLoggedIn'));
      console.log('Already logged in', onceLoggedIn);
    });
  }, []);

  const handleSkip = () => navigation.navigate('dashboardGuest');

  const handleSignIn = () => signIn();

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="interactive">
      <View style={styles.container}>
        <Image style={styles.semiCircle} source={Images.circle_half} />
        <View>
          <Text style={styles.subtitle}>Hey,{'\n'}Login Now.</Text>
          <Text style={styles.fadedText}>
            If you are new / <Text style={styles.normalText}>Create New</Text>
          </Text>
          <View
            style={[
              styles.textFieldConatiner,
              {marginTop: 70, backgroundColor: colorResources.elephantBlack_80},
            ]}>
            <TextInput
              placeholder="Enter user name"
              placeholderTextColor={colorResources.grey}
              style={[styles.textFieldText, {color: colorResources.white}]}
              onChangeText={text => {
                setUserName(text);
              }}
            />
            {userName && userNameRegex.test(userName) ? (
              <View style={styles.textFieldImageContainer}>
                <Image
                  style={styles.textInputSuffixIcon}
                  source={Images.flash}
                />
              </View>
            ) : null}
          </View>
          <View
            style={[
              styles.textFieldConatiner,
              {marginTop: 20, backgroundColor: colorResources.black_20},
            ]}>
            <TextInput
              secureTextEntry
              placeholder="Passcode"
              placeholderTextColor={colorResources.grey}
              style={[
                styles.textFieldText,
                {color: colorResources.elephantBlack},
              ]}
              onChangeText={text => {
                setPasscode(text);
              }}
            />
            {passcode && passcodeRegex.test(passcode) ? (
              <View style={styles.textFieldImageContainer}>
                <Image
                  style={styles.textInputSuffixIcon}
                  source={Images.flash}
                />
              </View>
            ) : null}
          </View>
          <Text style={[styles.fadedText, {marginTop: 25}]}>
            Forgot Passcode?/ <Text style={styles.normalText}>Reset</Text>
          </Text>
          <View style={{marginTop: 80}}>
            <Button
              buttonName={'Login'}
              bgColor={
                checkCred ? colorResources.grey : colorResources.black_20
              }
              onPress={async () => {checkCred ? handleSignIn() : null}}
            />
          </View>

          <TouchableOpacity onPress={handleSkip}>
            <Text
              style={[
                styles.fadedText,
                {
                  marginTop: 25,
                  textAlign: 'center',
                },
              ]}>
              Skip Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 30, justifyContent: 'space-between'},
  semiCircle: {height: 30, width: 30},
  subtitle: {
    fontSize: 30,
    fontFamily: 'InterTight-Regular',
    fontWeight: 'bold',
    color: colorResources.black,
  },
  fadedText: {
    marginTop: 20,
    fontFamily: 'InterTight-Regular',
    fontSize: 14,
    color: colorResources.grey,
  },
  normalText: {
    fontSize: 16,
    fontFamily: 'InterTight-Regular',
    color: colorResources.black,
  },
  textFieldConatiner: {
    width: '100%',
    height: 55,
    borderRadius: 8,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textFieldText: {
    height: 45,
    width: '80%',
    fontFamily: 'InterTight-Regular',
    fontSize: 14,
    padding: 0,
    paddingHorizontal: 15,
  },
  textFieldImageContainer: {
    height: 25,
    width: 25,
    borderRadius: 20,
    backgroundColor: colorResources.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputSuffixIcon: {height: 15, width: 15},
});
