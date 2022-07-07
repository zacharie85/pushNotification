import React from 'react'
import Navigation from './src/navigation/Index';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import PushNotification from 'react-native-push-notification';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();
import PushNotificationIOS from '@react-native-community/push-notification-ios';
export default function App() {

  React.useEffect(() => {
    // Must be outside of any component LifeCycle (such as `componentDidMount`).
    createChannels()
  }, []);

  const createChannels = () => {
    PushNotification.createChannel(
      {
        channelId: 'test-channel',
        channelName: "Test Channel"
      }
    )
  }
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  )
}
