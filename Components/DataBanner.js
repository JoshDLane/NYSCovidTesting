import React from 'react'
import {View, StyleSheet, Text} from 'react-native'

export default function DataBanner () {
    return(
            <View style={styles.container}>
                <Text style={styles.text}>
                    Data provided via The New York State Department of Health.
                    Click for additional info on source and interpretation.
                </Text>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        paddingHorizontal: 10,
        paddingVertical: 0,
        backgroundColor: '#252424ff',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 12,
    }
})