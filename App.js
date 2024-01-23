import { View, Text } from 'react-native'
import React from 'react'
import ChatScreen from './screens/chatScreen'
import { Provider } from 'react-redux'
import { store } from './store/store'
export default function App() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <ChatScreen />
      </View>
    </Provider>
  )
}