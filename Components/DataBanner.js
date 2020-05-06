import React from 'react'
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native'
import {colors, dimensions} from '../styles/colors'

export default function DataBanner () {
    return(
            <View style={styles.container}>
                <Text style={styles.text}>
                    Data is provided directly by The New York State Department of Health.
                    Click to see more info on the data source and interpretation.
                </Text>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: '#252424ff',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})