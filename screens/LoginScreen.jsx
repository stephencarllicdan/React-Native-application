import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

import {
  signInWithEmailAndPassword
} from 'firebase/auth';

import { auth } from '../firebase/config';

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {

    if (email === '' || password === '') {

      Alert.alert('Error', 'Fill all fields');
      return;

    }

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      navigation.replace('Home');

    } catch (error) {

      Alert.alert('Login Error', error.message);

    }

  };

  return (

    <View style={styles.container}>

      <Text style={styles.logo}>
        CineTrack
      </Text>

      <Text style={styles.subtitle}>
        Login Account
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#777"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#777"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={login}
      >

        <Text style={styles.buttonText}>
          Login
        </Text>

      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
      >

        <Text style={styles.link}>
          No account? Register
        </Text>

      </TouchableOpacity>

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    padding: 25
  },

  logo: {
    color: '#E50914',
    fontSize: 45,
    fontWeight: 'bold',
    marginBottom: 10
  },

  subtitle: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 30
  },

  input: {
    backgroundColor: '#111',
    color: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20
  },

  button: {
    backgroundColor: '#E50914',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center'
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  },

  link: {
    color: '#aaa',
    marginTop: 20,
    textAlign: 'center'
  }

});