import React, { useRef } from 'react'
import Styles from '../components/Styles';
import { View, TextInput, TouchableOpacity, Keyboard, RefreshControl, FlatList, Dimensions, ActivityIndicator, Image, Text, Platform } from 'react-native';
import _ from 'lodash';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import { getImagesWithHttps } from '../functions';
import { Provider, useSelector, useDispatch } from 'react-redux';
import HeaderScreen from '../components/Header';
import store from '../redux/store';
import { setItemsSelected } from '../redux/reducer';
import { Container } from 'native-base';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
export default function Home({ navigation }) {

    const AppScreen = () => {
        const [motCles, setMotCles] = React.useState('');
        const [isLoading, setIsloading] = React.useState(false);
        const [books, setBooks] = React.useState([]);
        const [currentIndex, setCurrentIndex] = React.useState(0);
        const MAX_DATA = 10;
        const delayedQuery = React.useRef(_.debounce(q => onSearch(q), 500)).current;
        const dispatch = useDispatch();

        const handelPushNotification = (item)=>{
            PushNotification.localNotification({
                /* Android Only Properties */
                channelId:'test-channel',// (required) channelId, if the channel doesn't exist, notification will not trigger.
                ticker: "My Notification Ticker", // (optional)
                showWhen: true, // (optional) default: true
                autoCancel: true, // (optional) default: true
                largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
                largeIconUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
                smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
                bigText: "My big text that will be shown when notification is expanded. Styling can be done using HTML tags(see android docs for details)", // (optional) default: "message" prop
                subText: "This is a subText", // (optional) default: none
                bigPictureUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
                bigLargeIcon: "ic_launcher", // (optional) default: undefined
                bigLargeIconUrl: "https://www.example.tld/bigicon.jpg", // (optional) default: undefined
                color: "red", // (optional) default: system default
                vibrate: true, // (optional) default: true
                vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
                tag: "some_tag", // (optional) add tag to message
                group: "group", // (optional) add group to message
                groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
                ongoing: false, // (optional) set whether this is an "ongoing" notification
                priority: "high", // (optional) set notification priority, default: high
                visibility: "private", // (optional) set notification visibility, default: private
                ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
                shortcutId: "shortcut-id", // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
                onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false
                
                when: null, // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
                usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
                timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
              
                messageId: "google:message_id", // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module. 
              
                actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
                invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
              
                /* iOS only properties */
                category: "", // (optional) default: empty string
                subtitle: "My Notification Subtitle", // (optional) smaller title below notification title
              
                /* iOS and Android properties */
                id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
                title: "My Notification Title", // (optional)
                message: "My Notification Message", // (required)
                picture: "https://www.example.tld/picture.jpg", // (optional) Display an picture with the notification, alias of `bigPictureUrl` for Android. default: undefined
                userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
                playSound: true, // (optional) default: true
                soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
                number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero) // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
              });
        }

        const handlerPushNotificationIos =(item)=>{
              
              PushNotificationIOS.addNotificationRequest({
                id:'test-channel',
                /* iOS and Android properties */
                title: "My Notification Title", // (optional)
                message: "My Notification Message", // (required)
                picture: "https://www.example.tld/picture.jpg", // (optional) Display an picture with the notification, alias of `bigPictureUrl` for Android. default: undefined
                userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
                playSound: false, // (optional) default: true
                soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
                number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero) // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
              });
        }
        renderItem = ({ item }) => {
           let res = getImagesWithHttps(item);
            return (
                <TouchableOpacity
                    onPress={() => {
                        if(Platform.OS == 'android'){
                            handelPushNotification(item);
                        }else{
                            handlerPushNotificationIos(item);
                        }
                     
                        dispatch(setItemsSelected(item));
                        navigation.navigate('Details')
                    }}>

                    <Animatable.View style={Styles.cardInfos} animation="fadeInLeft" duration={1000}>
                        <View style={Styles.image}>
                            <Image
                                style={Styles.stretch}
                                source={{
                                    uri: res
                                }}
                            />
                        </View>
                        <View style={Styles.title}>
                            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{item.volumeInfo && item.volumeInfo.title ? item.volumeInfo.title : 'Livre'}</Text>
                        </View>
                    </Animatable.View>

                </TouchableOpacity>
            );

        }

        const loadMoreData = async () => {
            // on va chercher les 10 autres elements a partir du max +1
            setIsloading(true);
            let index = currentIndex;
            if (index == 0) {
                index = index + MAX_DATA + 1;
            } else {
                index = index + 1;
            }

            setTimeout(async () => {
                try {

                    const url = `https://www.googleapis.com/books/v1/volumes?q=${motCles}&maxResults=${MAX_DATA}&startIndex=${index}`;
                    const {
                        data
                    } = await axios.get(url);

                    const array = [...books, ...data.items];
                    let uniq = [...new Set(array)]; // enlever duplication si il ya en a
                    setBooks(uniq);

                } catch (error) {
                    console.error('error on search ', error)
                }
                setIsloading(false);
            }, 1000);
            setCurrentIndex(index);
        }

        const renderFooter = () => {
            return (
                isLoading && (<View style={Styles.renderFooter}>
                    <ActivityIndicator size={'large'} color={'black'} />
                </View>)

            )
        }

        const listeViewRender =
            <FlatList
                refreshControl={<RefreshControl
                    refreshing={isLoading}
                    onRefresh={async () => {
                        await onSearch(motCles);
                    }
                    }
                />}
                data={books}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListFooterComponent={renderFooter}
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.2}
            />;

        const onSearch = async (text) => {
            if (text.length != 0) {
                setIsloading(true);
                try {

                    const url = `https://www.googleapis.com/books/v1/volumes?q=${text}&maxResults=10&startIndex=0`;
                    const {
                        data
                    } = await axios.get(url);
                    setBooks(data.items);
                    setIsloading(false);
                } catch (error) {
                    console.error('error on search', error);
                    setIsloading(false);
                }

            } else {
                setBooks([]);
            }

        }

        const onPress =()=>{
            console.log('cancel');
        }

        return (
            <Container>
                <HeaderScreen OnPress={onPress} title={'Liste'} haveIcon={false}/>
                <View style={Styles.inputContainer}>
                    <TextInput style={Styles.styleImput}
                        placeholder="mot clés...."
                        placeholderTextColor={"grey"}
                        keyboardType={'email-address'}
                        selectionColor={'black'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        value={motCles}
                        onChangeText={(text) => {
                            setMotCles(text)
                            delayedQuery(text)
                        }}
                    />
                    {isLoading && <ActivityIndicator color={'black'} />}
                </View>

                <View style={{ flex: 1 }}>
                    {listeViewRender}
                </View>
            </Container>
        )
    }

    return (
        <Provider store={store}>
            <AppScreen />
        </Provider>
    );
}
