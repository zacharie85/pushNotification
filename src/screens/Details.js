import React from 'react'
import Styles from '../components/Styles';
import { View, Text, Image } from 'react-native';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from '../redux/store';
import { setItemsSelected } from '../redux/reducer';
import { Container } from 'native-base';
import HeaderScreen from '../components/Header';
import { getImagesWithHttps } from '../functions';
import { Linking } from 'react-native'
export default function Details({ navigation }) {
  const AppScreen = () => {
    const dispatch = useDispatch();

    const itemSelected = useSelector(state => state.itemSelected);

    const onPress = () => {
      navigation.goBack();
    }

    let res = getImagesWithHttps(itemSelected);

    return (
      <Container>
        <HeaderScreen OnPress={onPress} title={'Details'} haveIcon={true} />
        <View style={Styles.header}>
          <View style={Styles.imageDetails}>
            <Image
              style={Styles.stretch}
              source={{
                uri: res
              }}
            />
          </View>
        </View>
        <View style={Styles.subInfo}>
          <View style={Styles.infoSection}>
            <Text style={Styles.textStyle}>Title : </Text>
            <Text> {itemSelected.volumeInfo.title}</Text>
          </View>
          <View style={Styles.infoSection}>
            <Text style={Styles.textStyle}>Authors : </Text>
            <Text> {itemSelected.volumeInfo.authors}</Text>
          </View>
          {itemSelected.saleInfo.listPrice && (<View>
            <View style={Styles.infoSection}>
              <Text style={Styles.textStyle}>Amount : </Text>
              <Text> {itemSelected.saleInfo.listPrice.amount}$</Text>
            </View>
            <View style={Styles.infoSection}>
              <Text style={Styles.textStyle}>Link : </Text>
              <Text style={Styles.hyperlinkStyle} onPress={() => {
                Linking.openURL(itemSelected.saleInfo.buyLink);
              }}> {itemSelected.saleInfo.buyLink}</Text>
            </View>
          </View>)}
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