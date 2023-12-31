import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import {Text, Button} from 'react-native-paper';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {errorToast, successToast} from '../components/Toaster';
import AsyncStorage from '@react-native-async-storage/async-storage';

// validation
import {Formik} from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter your valid Email')
    .required('Enter your valid Email'),
  password: Yup.string().required('Enter your password'),
  // .matches('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$', 'Test'),
});

const LoginScreen = ({ navigation }) => {
  Keyboard.dismiss();
  const [loading, setLoading] = useState(false);
  const authenticate = values => {
    setLoading(true);
    console.log(values);
    axios
      .post('http://192.168.80.244/authentication/public/api/v1/signin', {
        username: values.email,
        password: values.password,
      })
      .then(response => {
        setTimeout(() => {
          if (response.status == 200) {
            AsyncStorage.setItem('token', response.data.data.token);
            AsyncStorage.getItem('token').then(result => console.log(result));
            successToast('Successfully Login ...');
            navigation.replace('Welcome')
          } else {
            errorToast('Email or Password was wrong');
          }
          setLoading(false);
        }, 2000);
      })
      .catch(function (error) {
        // console.log(error);
        setTimeout(() => {
          errorToast('Email or Password was wrong');
          setLoading(false);
        }, 2000);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Sign in</Text>
      </View>
      <View style={{paddingTop: 20}}>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={values => {
            // alert(JSON.stringify(values, null, 2));
            // setTimeout(()=>{
            authenticate(values);
            // }, 3000)
          }}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldTouched,
            isValid,
            handleSubmit,
          }) => (
            <View style={{margin: 10, backgroundColor: '#fff'}}>
              <View>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('email')}
                  value={values.email}
                  onBlur={handleBlur('email')}
                  placeholder="Enter your valid Email"
                  autoCapitalize="none"
                  // onSubmitEditing={Keyboard.dismiss}
                  // keyboardType="numeric"
                />
                {touched.email && errors.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}
              </View>
              <View>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  // onChangeText={onChangeNumber}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  placeholder="Enter your password"
                  // onSubmitEditing={Keyboard.dismiss}
                  // keyboardType="numeric"
                />
                {touched.password && errors.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}
              </View>
              <View style={{padding: 10}}>
                {loading == false ? (
                  <Button
                    // disabled={!isValid}
                    // disabled={loading == true ? true : false}
                    style={{backgroundColor: '#61dafb', color: '#fff'}}
                    icon="content-save-all"
                    mode="contained"
                    onPress={handleSubmit}>
                    Submit
                  </Button>
                ) : (
                  <ActivityIndicator size="large" color="#61dafb" />
                )}
              </View>
            </View>
          )}
        </Formik>
        <View style={{margin: 10}}>
          <View
            style={{marginTop: 40, backgroundColor: '#fff', borderRadius: 10}}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                paddingVertical: 10,
                textDecorationLine: 'underline',
              }}>
              SignUp
            </Text>
          </View>
        </View>
      </View>
      <Toast bottomOffset={20} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#61dafb',
    borderBottomRightRadius: 50,
    borderBottomStartRadius: 50,
  },
  headerTitle: {
    fontSize: 30,
    paddingVertical: 65,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    color: 'black',
    height: 40,
    margin: 12,
    marginBottom: 0,
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    borderColor: '#61dafb',
  },
  error: {
    paddingLeft: 10,
    color: 'red',
    fontSize: 12,
  },
});
