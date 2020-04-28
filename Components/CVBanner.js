import React from 'react'
import {View, Text, StyleSheet, } from 'react-native'

export default function CVBanner(props) {
    return(
    <View style={styles.banner}>
        <Text style={styles.headerTxt}>NYS COVID TRACKER</Text>
    </View>
    )
}


const styles = StyleSheet.create({
    banner: {
        height: 100,
        width: '100%',
        backgroundColor: "#f6993f",
        justifyContent: 'center',
        paddingTop:40,
    },
    headerTxt: {
        color: '#000000',
        fontSize: 30,
        fontWeight: '500',
        textAlign: 'center'
    }
})