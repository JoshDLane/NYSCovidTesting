import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ShadowPropTypesIOS } from 'react-native'
import Map from '../Components/map'
import UpdateStatus from '../Components/UpdateStatus'
import EnterDataButton from '../Components/EnterDataButton'
import CVBanner from '../Components/CVBanner'

export default function NYOverview(props) {
    return (
        <View style={styles.root_container}>
        <View style={styles.background}>
            <CVBanner />
            <View >
                <UpdateStatus />
            </View>
            <Map />
            <View style={{ alignContent: 'center' }}>
                <TouchableOpacity onPress={props.onButtonClick}>
                    <EnterDataButton />
                </TouchableOpacity>
            </View>
        </View>
        </View>
    )
}
const styles = StyleSheet.create({
    root_container: {
        width: '100%',
        height: 1000,
        backgroundColor: 'black',
      },
    background: {
        height: 1000,
        opacity: .9,
        alignContent: 'center'
    }
})