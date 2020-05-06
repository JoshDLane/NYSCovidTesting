import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

export default function CVBanner(props) {
    if (props.backToHome) {
        context =
            <View style={styles.banner_details}>
                <TouchableOpacity onPress={props.backToHome}>
                    <View style={{textAlign: 'center'}}>
                    <Image 
                        style={{height: 32, width: 41, marginHorizontal: 10}}
                        source={require('../assets/NYIcon.png')} />
                    </View>
                </TouchableOpacity>
                <Text style={styles.headerTxt}>NYS COVID TESTING</Text>
                <Text style={{height:32, width: 41, margin: 10}}></Text>
            </View>
    }
    else {
        context =
                <Text style={styles.headerTxt}>NYS COVID TESTING</Text>
    }
    return (
        <View style={styles.banner}>
            {context}
        </View>
    )
}


const styles = StyleSheet.create({
    banner: {
        height:'100%',
        backgroundColor: "#f6993f",
        justifyContent: 'flex-end',
        alignContent: 'center',
        paddingBottom: 5
    },
    headerTxt: {
        color: '#000000',
        fontSize: 28,
        fontWeight: '500',
        textAlign: 'center'
    },
    banner_details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        marginBottom: -18,
    }
})