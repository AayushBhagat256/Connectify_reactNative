import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import colors from '../components/colors'

const FriendScreen = () => {
    const navigation = useNavigation()
    useLayoutEffect(
        () => {
            navigation.setOptions({
                headerStyle: {
                    backgroundColor: colors.DARK
                }
            })
        }, []
    )
    return (
        <View>
            <Text>FriendScreen</Text>
        </View>
    )
}

export default FriendScreen

const styles = StyleSheet.create({})