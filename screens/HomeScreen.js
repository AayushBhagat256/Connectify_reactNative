import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
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

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
    const navigation = useNavigation()
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
                        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                            <Ionicons name="ios-chatbubbles-outline" size={24} color='#DDE6ED' />
                            <Feather name="users" size={24} color="#DDE6ED" />
                        </View>
                    )
                }
            })
        }, []
    )
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.home}>
                <Text>HomeScreen</Text>
                {/* <Pressable onPress={()=>AsyncStorage.clear()}><Text>Logout</Text></Pressable> */}
            </View>
            {/* <Tab.Navigator>
                <Tab.Screen name="signup" component={RegisterScreen} options={{ headerShown: false }} />
                <Tab.Screen name="profile" component={UserProfile} options={{ headerShown: false }} />
                <Tab.Screen name="chat" component={ChatScreen} options={{ headerShown: false }} />
            </Tab.Navigator> */}
        </ScrollView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    home: {
        flex: 1,
        backgroundColor: colors.DARK,
        padding: 10,
        alignItems: 'center',
    }
})