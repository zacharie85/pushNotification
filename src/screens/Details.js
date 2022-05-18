import React from 'react'
import Styles from '../components/Styles';
import {View,Text} from 'react-native';
import { Provider,useSelector,useDispatch } from 'react-redux';
import store from '../redux/store';
import { setItemsSelected } from '../redux/reducer';

export default function Details() {
  const AppScreen =()=>{
    const dispatch = useDispatch();

    const itemSelected = useSelector(state => state.itemSelected);

    console.log(itemSelected);

    return (
      <View style={Styles.centredHome}>
          <Text style={Styles.centredText}>Details </Text>
      </View>
     )
     
  }
  return (
    <Provider store={store}>
        <AppScreen />
    </Provider>
);
}