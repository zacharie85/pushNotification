import { StyleSheet, Dimensions } from 'react-native';

export default Styles = StyleSheet.create({
    centredHome: {
        flex: 1,
        backgroundColor: 'white'
    },
    centredText: {
        textAlign: 'center',
        color: 'black'
    }, styleImput: {
        height: 40,
        marginLeft: 20,
        backgroundColor: '#EEE',
        color: 'black',
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        marginTop: 10,
        width: Math.round(Dimensions.get('window').width) - 70,
    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },
    cardInfos: {
        backgroundColor: 'white', height: 170,
        width: Dimensions.get('screen').width - 50, shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 5,
        marginLeft: 20,
        borderRadius: 10,
        marginTop: 20,
        flexDirection: 'row'
    },
    stretch: {
        width: ((Dimensions.get('screen').width - 50) / 2),
        height: 170,
        resizeMode: 'stretch',
    },
    renderFooter: {
        marginTop: 40, alignItems: 'center'
    },
    image: {
        flex: .5, width: ((Dimensions.get('screen').width - 50) / 2)
    },
    title: {
        flex: .5, width: ((Dimensions.get('screen').width - 50) / 2), justifyContent: 'center'
    },
    header: {
        justifyContent: 'center', height: 200
    },
    imageDetails: {
        flex: .5, width: ((Dimensions.get('screen').width - 50) / 2), alignSelf: 'center'
    },
    subInfo: {
        marginTop: 30
    },
    infoSection: {
        flexDirection: 'row', marginLeft: 10
    },
    textStyle: {
        fontWeight: 'bold'
    },
    hyperlinkStyle: {
        color: 'blue',
    },
})