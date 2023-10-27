import { Pressable, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from './colors';
import { useContext } from 'react';
import { UserType } from '../context/userContext';
import { useNavigation } from '@react-navigation/native';

const FriendReq = ({ item, friendReq, setFriendReq }) => {
    const { userId, setUserId } = useContext(UserType)
    const navigation = useNavigation()
    // Define a fallback image source URL
    const fallbackImageSource =
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png';

    const k = 'http://192.168.29.22:3000/';

    const acceptRequest = async (friendRequestId) => {
        try {
            const response = await fetch(
                "http://192.168.29.22:3000/friend-request/accept",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        senderId: friendRequestId,
                        recepientId: "65142bf331bf4da8498b7db6",
                        // recepientId: userId,
                    }),
                }
            );
            if (response.ok) {
                setFriendReq(
                    friendReq.filter((request) => request._id !== friendRequestId)
                );
                navigation.navigate("Chats");
            }
        } catch (err) {
            console.log("error acceptin the friend request", err);
        }
    };


    // Check if item.image exists and is not undefined
    if (item?.image) {
        const path = item.image;
        // Replace backslashes with forward slashes
        const convertedPath = path.replace(/\\/g, '/');
        console.log(convertedPath);

        // Determine the image source to use
        const imageSource = { uri: k + convertedPath };

        return (
            <Pressable
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                }}>
                <View>
                    <Image
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            resizeMode: 'cover',
                        }}
                        source={imageSource}
                    />
                </View>

                <View style={{ marginLeft: 12, flex: 1 }}>
                    <Text style={{ color: colors.LIGHT, fontWeight: 'bold' }}>{item?.name} sended you friend Request</Text>
                    <Text style={{ color: colors.SEMI }}>{item?.email}</Text>
                </View>

                <TouchableOpacity
                    onPress={() => acceptRequest(item._id)}
                    style={{
                        padding: 10,
                        borderRadius: 6,
                        width: 105,
                        backgroundColor: colors.LIGHT
                    }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Accept</Text>
                </TouchableOpacity>
            </Pressable>
        );
    } else {
        // Use the fallback image source if item.image is absent
        return (
            <Pressable
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                }}>
                <View>
                    <Image
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            resizeMode: 'cover',
                        }}
                        source={{ uri: fallbackImageSource }}
                    />
                </View>

                <View style={{ marginLeft: 12, flex: 1 }}>
                    <Text style={{ color: colors.LIGHT, fontWeight: 'bold' }}>{item?.name} sended you friend Request</Text>
                    <Text style={{ color: colors.SEMI }}>{item?.email}</Text>
                </View>

                <TouchableOpacity
                    onPress={() => acceptRequest(item._id)}
                    style={{
                        padding: 10,
                        borderRadius: 6,
                        width: 100,
                        backgroundColor: colors.LIGHT
                    }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Accept</Text>
                </TouchableOpacity>
            </Pressable>
        );
    }
}

export default FriendReq

const styles = StyleSheet.create({})