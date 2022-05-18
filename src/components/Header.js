
import React from 'react';
import {
    Left,
    Right,
    Body,
    Button,
    Header,
    Text,
} from 'native-base';

export default function HeaderScreen({OnPress,title,haveIcon}) {
    return (
        <Header
            noShadow={true}
            style={{
                borderBottomWidth: 0, backgroundColor: 'black'
            }}
            hasTabs
        >
            <Left style={{ flex: 1 }}>
                <Button transparent onPress={() => {
                   OnPress();
                }}
                >
                   {haveIcon && (<Text style={{color:'#2596be'}} >Back</Text>)}
                </Button>
            </Left>
            <Body style={{ flex: 3 }}>
                <Text style={{color:'white'}}>{title}</Text>
            </Body>
            <Right style={{ flex: 1 }}>

            </Right>
        </Header>
    )
}
