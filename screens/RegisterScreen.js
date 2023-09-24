import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, TouchableOpacity, Pressable, Button, Image, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from "react";
import InputField from '../components/InputField'
import colors from '../components/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

// expo start --tunnel use this to make apis work

const RegisterScreen = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const navigation = useNavigation()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync();

      if (!result.canceled) {
        // If an image is selected (not cancelled), update the selectedImage state
        // setSelectedImage(result.assets.uri);
        console.log(result.assets.uri)
        result.assets.forEach((item) => {
          console.log("URI: ", item.uri)
          setSelectedImage(item.uri)
        })
      } else {
        console.log('User cancelled image picker');
      }
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };

  const handleRegister = () => {
    // const user = {
    //   name : name,
    //   email : email,
    //   password : confirm
    // }

    // axios.post("http://localhost:3000/signup/",user).then((response)=>{
    //   console.log(response.data)
    //   Alert.alert(
    //     "Registered success",
    //     "You have been added"
    //   )
    //   setConfirm('')
    //   setPassword('')
    //   setName('')
    //   setEmail('')
    // }).catch((error)=>{
    //   console.log('Error occured ',error)
    //   if (error.response) {
    //     // The server responded with an error status code (e.g., 4xx or 5xx)
    //     console.log("Server Error:", error.response.data);
    //     console.log("Status Code:", error.response.status);
    //   } else if (error.request) {
    //     // The request was made, but no response was received
    //     console.log("No response received. Check your server.");
    //   } else {
    //     // Something happened while setting up the request
    //     console.log("Error:", error.message);
    //   }
    // })
    // const axios = require('axios');
    let data = JSON.stringify({
      "name": name,
      "password": confirm,
      "email": email
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://192.168.29.22:3000/signup',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        Alert.alert(
          "Registered success",
          "You have been added"
        )
        setConfirm('')
        setPassword('')
        setName('')
        setEmail('')
      })
      .catch((error) => {
        console.log(error);
      });

  }

  console.log(selectedImage)
  console.log(name)
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1, backgroundColor: colors.DARK, padding: 10, alignItems: 'center', }}>
        <KeyboardAvoidingView>
          <View style={{ marginTop: 100, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: colors.LIGHT, fontSize: 20, fontWeight: '600' }}>Sign Up</Text>

            <Text style={{ color: colors.PRIMARY, marginTop: 15, fontSize: 17, fontWeight: '600' }}>Create an Account</Text>
          </View>
          <View style={{ marginTop: 50 }}>
            <View>
              <Text style={{ color: colors.LIGHT, fontSize: 18, fontWeight: "600" }}>Username</Text>
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                keyboardType='default'
                style={{
                  fontSize: 18,
                  padding: 3,
                  borderBottomColor: "gray",
                  borderBottomWidth: 1,
                  marginVertical: 10,
                  color: 'white',
                  width: 300,
                }}
                placeholderTextColor={colors.SEMI} placeholder='Enter your username' />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ color: colors.LIGHT, fontSize: 18, fontWeight: "600" }}>Email</Text>
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType='email-address'
                style={{
                  fontSize: email ? 18 : 18,
                  padding: 3,
                  borderBottomColor: "gray",
                  borderBottomWidth: 1,
                  marginVertical: 10,
                  color: 'white',
                  width: 300,
                }}
                placeholderTextColor={colors.SEMI} placeholder='Enter your Email' />
            </View>
            <View style={{ marginTop: 10, }}>
              <Text style={{ color: colors.LIGHT, fontSize: 18, fontWeight: "600" }}>Create Password</Text>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <TextInput
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={!showPassword}
                  style={{
                    fontSize: 18,
                    padding: 3,
                    borderBottomColor: "gray",
                    borderBottomWidth: 1,
                    marginVertical: 10,
                    color: 'white',
                    width: 300,
                  }}
                  placeholderTextColor={colors.SEMI} placeholder='Enter your password' />
                <TouchableOpacity onPress={togglePasswordVisibility} style={{ marginRight: 1 }}>
                  <Icon name={showPassword ? "visibility-off" : "visibility"} size={24} color="#999" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginTop: 10, }}>
              <Text style={{ color: colors.LIGHT, fontSize: 18, fontWeight: "600" }}>Confirm Password</Text>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <TextInput
                  value={confirm}
                  onChangeText={(text) => setConfirm(text)}
                  secureTextEntry={!showPassword}
                  style={{
                    fontSize: 18,
                    padding: 3,
                    borderBottomColor: "gray",
                    borderBottomWidth: 1,
                    marginVertical: 10,
                    color: 'white',
                    width: 300,
                  }}
                  placeholderTextColor={colors.SEMI} placeholder='Re-Enter your password' />
                <TouchableOpacity onPress={togglePasswordVisibility} style={{ marginRight: 1 }}>
                  <Icon name={showPassword ? "visibility-off" : "visibility"} size={24} color="#999" />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              {selectedImage && (
                <View style={styles.container}>
                  <Image
                    source={{ uri: selectedImage }}
                    style={styles.image}
                  />
                </View>
              )}
              <Pressable style={styles.profileImg} title="Select Image" onPress={selectImage} >
                <Text style={{ textAlign: "center", color: "rgb(0, 122, 255)", fontSize: 16 }}>Add profile Image</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity onPress={handleRegister} style={styles.button} >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

        <Pressable
          onPress={() => navigation.navigate("login")}
          style={{ marginTop: 15 }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
            Already have an account? Sign In
          </Text>
        </Pressable>


      </View>
    </ScrollView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#DDE6ED',
    width: 250,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    marginTop: 50,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100
    // Any additional styles specific to the image can be added here
  },
  profileImg: {
    marginTop: 13,
    // backgroundColor: colors.LIGHT,
    height: 32,
    alignItems: 'center',
    alignSelf: 'center'
  }
})