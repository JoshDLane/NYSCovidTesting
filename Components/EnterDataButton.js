import React from 'react';
import { View, Text, StyleSheet } from "react-native";



export default function EnterDataButton(props) {
    return (
            <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.textFormat}>
                         County Data >
                    </Text>
                    </View>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 45,
        width: 250,
        backgroundColor: '#52e4c2',
        borderRadius: 30,
        justifyContent: 'center',
    },
    textFormat: {
        fontSize: 20,
        fontWeight: '500',
        fontStyle: 'italic',
        textAlign: 'center',
        color: 'black',
    }
})