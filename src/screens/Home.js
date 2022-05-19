import React, { useRef } from 'react'
import Styles from '../components/Styles';
import { View, TextInput, TouchableOpacity, Keyboard, RefreshControl, FlatList, Dimensions, ActivityIndicator, Image, Text } from 'react-native';
import _ from 'lodash';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import { getImagesWithHttps } from '../functions';
import { Provider, useSelector, useDispatch } from 'react-redux';
import HeaderScreen from '../components/Header';
import store from '../redux/store';
import { setItemsSelected } from '../redux/reducer';
import { Container } from 'native-base';

export default function Home({ navigation }) {

    const AppScreen = () => {
        const [motCles, setMotCles] = React.useState('');
        const [isLoading, setIsloading] = React.useState(false);
        const [books, setBooks] = React.useState([]);
        const [currentIndex, setCurrentIndex] = React.useState(0);
        const MAX_DATA = 10;
        const delayedQuery = React.useRef(_.debounce(q => onSearch(q), 500)).current;
        const dispatch = useDispatch();

        renderItem = ({ item }) => {
           let res = getImagesWithHttps(item);
            return (
                <TouchableOpacity
                    onPress={() => {
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
