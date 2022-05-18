import React from 'react'
import Styles from '../components/Styles';
import { View, Text } from 'react-native';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from '../redux/store';
import { setItemsSelected } from '../redux/reducer';
import { Container } from 'native-base';
import HeaderScreen from '../components/Header';

export default function Details({navigation}) {
  const AppScreen = () => {
    const dispatch = useDispatch();

    const itemSelected = useSelector(state => state.itemSelected);

    console.log(itemSelected);
    const onPress = () => {
     navigation.goBack();
    }

    return (
      <Container>
        <HeaderScreen OnPress={onPress} title={'Details'} haveIcon={true} />
        <Text style={Styles.centredText}>Details </Text>
      </Container>
    )

  }
  return (
    <Provider store={store}>
      <AppScreen />
    </Provider>
  );
}