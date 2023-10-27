import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import colors from '../components/colors'
import axios from 'axios'
import { UserType } from '../context/userContext'
import FriendReq from '../components/FriendReq'

const FriendScreen = () => {
    const { userId, setUserId } = useContext(UserType)
    const [friendReq, setFriendReq] = useState([])
    const navigation = useNavigation()
    useLayoutEffect(
        () => {
            navigation.setOptions({
                headerStyle: {
                    backgroundColor: colors.DARK,
                },
                headerTintColor: colors.LIGHT,
                headerTitle: 'Friend Zone'
            })
        }, []
    )

    const fetchFriendRequests = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            // url: `http://192.168.29.22:3000/friend-req/${userId}`, //admin logged in
            url: `http://192.168.29.22:3000/friend-req/65142bf331bf4da8498b7db6`, //bruce id
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setFriendReq(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }
    useEffect(
        () => {
            fetchFriendRequests()
        }, []
    )

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {
                friendReq.length == 0 ? (
                    <View style={styles.container}>
                        <Text>Sorry no friends found yet</Text>
                    </View>
                ) : (
                    <View style={styles.container}>
                        <View style={{ padding: 10, marginHorizontal: 12 }}>
                            {friendReq.map((item, index) => (
                                <FriendReq key={index} item={item} friendReq={friendReq} setFriendReq={setFriendReq} />
                            ))}
                        </View>
                    </View>

                )
            }
        </ScrollView>
    )
}

export default FriendScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.DARK,
        flex: 1
    }
})