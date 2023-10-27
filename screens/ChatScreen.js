import { ScrollView, StyleSheet, Text, View } from 'react-native'
// import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import colors from '../components/colors'
import axios from 'axios'

const ChatScreen = () => {
  const navigation = useNavigation()
  useLayoutEffect(
    () => {
      navigation.setOptions({
        headerStyle: {
          backgroundColor: colors.DARK,
        },
        headerTintColor: colors.LIGHT,
        headerTitle: 'Chat'
      })
    }, []
  )
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text>ChatScreen</Text>
      </View>
    </ScrollView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.DARK,
    flex: 1
  }
})