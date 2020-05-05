import React from 'react';
import {View, Text, StyleSheet} from 'react-native'
import {Svg} from 'react-native-svg'

export default function InfectionRate() {
    return (
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', margin: 5}}>
            <View style={{width:80}}>
                <Text style={{color: "#f6993f", fontSize: 20, textAlign: 'center'}}>
                    Infection Rate
                </Text>
            </View>
            <View style={{justifyContent: 'center', margin: 5}}>
                    <Text style={{color:'#f6993f', fontSize: 20}}>
                        ~.9
                    </Text>
            </View>
        </View>
    )

}