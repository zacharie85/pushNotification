import React, { useRef } from 'react'
import Styles from '../components/Styles';
import { View, TextInput, TouchableOpacity, Keyboard, RefreshControl, FlatList, Dimensions, ActivityIndicator, Image, Text } from 'react-native';
import _ from 'lodash';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
export default function Home() {

    const [motCles, setMotCles] = React.useState('');
    const [isLoading, setIsloading] = React.useState(false);
    const [data, setData] = React.useState([]);

    const delayedQuery = React.useRef(_.debounce(q => onSearch(q), 500)).current;

    renderItem = ({ item }) => {
        let res ='';
        if(item.volumeInfo.imageLinks.thumbnail){
             res = item.volumeInfo.imageLinks.thumbnail.replace(/http/g, "https");
        }

        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Details')
                }}>

                <Animatable.View style={Styles.cardInfos} animation="fadeInLeft" duration={1000}>
                    <View style={{ flex: .5, width: ((Dimensions.get('screen').width - 50) / 2) }}>
                        <Image
                            style={Styles.stretch}
                            source={{
                                uri:res
                            }}
                        /> 
                    </View>
                    <View style={{ flex: .5, width: ((Dimensions.get('screen').width - 50) / 2),justifyContent:'center' }}>
                        <Text style={{fontWeight:'bold',textAlign:'center'}}>{item.volumeInfo.title}</Text>
                    </View>
                </Animatable.View>

            </TouchableOpacity>
        );

    }

    let listeViewRender =
        <FlatList
            onScroll={() => Keyboard.dismiss()}
            refreshControl={<RefreshControl
                refreshing={isLoading}
                onRefresh={async () => {
                    await onSearch(motCles);
                }
                }
            />}
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.recordId}
        />

    onSearch = async (text) => {
        setIsloading(true);
        try {

            const url = `https://www.googleapis.com/books/v1/volumes?q=${text}`;
            const {
                data
            } = await axios.get(url);

            console.log(data.items[0].volumeInfo.imageLinks);

            setData(data.items);

        } catch (error) {
            console.error('error prediction press', error)
        }
        setIsloading(false);
    }

    return (
        <View style={Styles.centredHome}>
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
            {!isLoading && (
                <View style={{ height: Math.round(Dimensions.get('window').height) - 50, flex: 1 }}>
                    {listeViewRender}
                </View>)}
        </View>
    )

}
