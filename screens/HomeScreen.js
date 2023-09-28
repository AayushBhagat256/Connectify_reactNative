import { Alert, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import colors from '../components/colors'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import UserProfile from './UserProfile';
import ChatScreen from './ChatScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserType } from '../context/userContext';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import User from '../components/User';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
    const navigation = useNavigation()
    const { userId, setUserId } = useContext(UserType)
    const [users, setusers] = useState([])
    useLayoutEffect(
        () => {
            navigation.setOptions({
                headerStyle: {
                    backgroundColor: colors.DARK
                },
                headerTitle: '',
                headerLeft: () => {
                    return (
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.PRIMARY, letterSpacing: 2 }}>Connectify</Text>
                    )
                },
                headerRight: () => {
                    return (
                        <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
                            <Ionicons name="ios-chatbubbles-outline" size={24} color='#DDE6ED' />
                            <TouchableOpacity onPress={() => navigation.navigate('Friends')}><Feather name="users" size={24} color="#DDE6ED" /></TouchableOpacity>
                        </View>
                    )
                }
            })
        }, []
    )
    useEffect(
        () => {
            const fetchUsers = async () => {
                const token = await AsyncStorage.getItem("AuthToken")
                const decodedToken = jwtDecode(token)
                const userId = decodedToken.userId
                setUserId(userId)

                axios.get(`http://192.168.29.22:3000/users/${userId}`).then(
                    (response) => {
                        console.log(response.data)
                        setusers(response.data)
                        Alert.alert("Api called success")
                    }
                ).catch((error) => {
                    console.log(error)
                })
            }
            fetchUsers()
        }, []
    )

    console.log("users", users)
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.DARK }}>
            <View style={{ padding: 10 }}>
                {users.map((item, index) => (
                    <User key={index} item={item} />
                ))}
            </View>
        </ScrollView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    home: {
        // flex: 1,
        backgroundColor: colors.DARK,
        padding: 10,
        // alignItems: 'center',
    }
})