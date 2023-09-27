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
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirm, setConfirm] = useState(null)
  const [showPassword, setShowPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [fileName, setFileName] = useState('profilepic.jpg')
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
          console.log(item)
          console.log("URI: ", item.uri)
          setSelectedImage(item.uri)
          setFileName(item.fileName)
        })
      } else {
        console.log('User cancelled image picker');
      }
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };

  const handleRegister = () => {
    console.log("Registered triggered");

    const formData = new FormData();
    formData.append('image', {
      uri: selectedImage,
      type: 'image/jpg', // Adjust the image type as needed
      name: fileName,
    });
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', confirm);

    axios
      .post('http://192.168.29.22:3000/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to form data
        },
      })
      .then((response) => {
        console.log('Response:', response.data);
        if (response.status === 200) {
          Alert.alert(
            'Registered success',
            'You have been added In ! login to proceed'
          );
          setConfirm('');
          setPassword('');
          setName('');
          setEmail('');
        } else {
          console.log('Unexpected response status:', response.status);
        }
      })
      .catch((error) => {
        console.log('Error:', error);
        if (error.response) {
          console.log('Server Error:', error.response.data);
          console.log('Status Code:', error.response.status);
        } else if (error.request) {
          console.log('No response received. Check your server.');
        } else {
          console.log('Error:', error.message);
        }
      });
  };


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
            Already have an account ? Sign In
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