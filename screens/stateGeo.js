import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Map from '../Components/map'
import UpdateStatus from '../Components/UpdateStatus'
import EnterDataButton from '../Components/EnterDataButton'
export default function NYOverview(props) {
    return (
        <View style={styles.background}>
            <View >
                <UpdateStatus />
            </View>
            <Map />
            <View style={{ alignContent: 'center' }}>
                <View>
                    <EnterDataButton />
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    background: {
        height: 1000,
        opacity: .9,
        alignContent: 'center'
    }
})