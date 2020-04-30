import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

export default function CVBanner(props) {
    if (props.backToHome) {
        context =
            <View style={styles.banner_details}>
                <TouchableOpacity onPress={props.backToHome}>
                    <View style={{textAlign: 'center'}}>
                    <Image 
                        style={{height: 40, width: 50, marginHorizontal: 10}}
                        source={require('../assets/NYIcon.png')} />
                    </View>
                </TouchableOpacity>
                <Text style={styles.headerTxt}>NYS COVID TRACKER</Text>
                <Text style={{height:35, width: 35, margin: 10}}></Text>
            </View>
    }
    else {
        context =
            <View style={styles.banner}>
                <Text style={styles.headerTxt}>NYS COVID TRACKER</Text>
            </View>
    }
    return (
        <View>
            {context}
        </View>
    )
}


const styles = StyleSheet.create({
    banner: {
        height: 100,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: "#f6993f",
        justifyContent: 'center',
        alignContent: 'center',
        paddingTop: 55,
    },
    headerTxt: {
        color: '#000000',
        fontSize: 25,
        fontWeight: '500',
        textAlign: 'center'
    },
    banner_details: {
        height: 100,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: "#f6993f",
        justifyContent: 'space-between',
        alignContent: 'center',
        paddingTop: 55,
    }
})