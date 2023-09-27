import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HomeScreen = () => {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View>
                <Text>HomeScreen</Text>
            </View>
        </ScrollView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})