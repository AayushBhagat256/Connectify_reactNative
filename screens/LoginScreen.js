import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, TouchableOpacity, Pressable } from 'react-native'
import React, { useState, useEffect } from "react";
import InputField from '../components/InputField'
import colors from '../components/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation()

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(
        () => {
            const loginStatus = async () => {
                try {
                    console.log("Finding the token")
                    const token = await AsyncStorage.getItem("AuthToken")
                    console.log("Token is : ",token)

                    if (token) {
                        navigation.replace("Home")
                    }else{
                        console.log('Token not found')
                    }
                }catch(error){
                    console.log("Error in useEffect block ",error)
                }
            }
            loginStatus()
        }, []
    )

    const handleLogin = () => {
        console.log("login Triggered")
        // navigation.replace("Home")
        let data = JSON.stringify({
            // "password": "pass123",
            "password": password,
            "email": email
            // "email": "admin@test.com"
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://192.168.29.22:3000/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                const token = response.data.token
                AsyncStorage.setItem('AuthToken',token)
                navigation.replace("Home")
            })
            .catch((error) => {
                console.log(error);
            });

    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.DARK, padding: 10, alignItems: 'center' }}>
            <KeyboardAvoidingView>
                <View style={{ marginTop: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: colors.LIGHT, fontSize: 20, fontWeight: '600' }}>Sign In</Text>

                    <Text style={{ color: colors.PRIMARY, marginTop: 15, fontSize: 17, fontWeight: '600' }}>Sign In to your Account</Text>
                </View>
                <View style={{ marginTop: 50 }}>
                    <View>
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
                        <Text style={{ color: colors.LIGHT, fontSize: 18, fontWeight: "600" }}>Password</Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <TextInput
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                secureTextEntry={!showPassword}
                                style={{
                                    fontSize: email ? 18 : 18,
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
                </View>
            </KeyboardAvoidingView>
            <TouchableOpacity style={styles.button} onPress={handleLogin} >
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <Pressable
                onPress={() => navigation.navigate("Register")}
                style={{ marginTop: 15 }}
            >
                <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
                    Don't have an account ? Sign Up
                </Text>
            </Pressable>

        </View>
    )
}

export default LoginScreen

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
})