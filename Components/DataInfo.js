import React from 'react';
import { View, Modal, Text, Stylesheet, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { colors, dimensions } from '../styles/colors'

export default function DataInfo(props) {
    return (
        <Modal visible={props.visible} animationType="slide"  >

            <View style={styles.container}>
                <View>
                    <TouchableOpacity onPress={props.onCancel}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }} onPress={props.onCancel}>
                            <Text style={{ margin: 10, fontSize: 22, color: 'grey' }}>
                                Cancel
                        </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.textContainer}>
                        <View>
                            <Text style={styles.titleFont}>
                                All data is provided directly by the New York State Department of Health via their public APi (https://health.data.ny.gov/Health/New-York-State-Statewide-COVID-19-Testing/xdss-u53e).
                        </Text>
                        </View>
                        <ScrollView style={styles.textScrollConatiner}>
                            <Text style={styles.mainBodyText}>
                                Data is update daily by 2PM ET
                            </Text>
                            <Text style={styles.mainBodyText}>
                                Daily counts reflect all tests completed by end of day the day prior to the update
                            </Text>
                            <Text style={styles.mainBodyText}>
                                Trend line for percent tests positive is determined by comparing the percent positive of the last 3 days to that of the 3 days prior
                            </Text>
                            <Text style={styles.bodyText}>

                                This dataset includes information on the number of tests of individuals for COVID-19 infection performed in New York State beginning March 1, 2020, when the first case of COVID-19 was identified in the state. The primary goal of publishing this dataset is to provide users timely information about local disease spread and reporting of positive cases. The data will be updated daily, reflecting tests completed by 12:00 am (midnight) the day of the update (i.e., all tests completed by the end of the day on the day before the update).

                                Reporting of SARS-CoV2 laboratory testing results is mandated under Part 2 of the New York State Sanitary Code. Clinical laboratories, as defined in Public Health Law (PHL) § 571 electronically report test results to the New York State Department of Health (DOH) via the Electronic Clinical Laboratory Reporting System (ECLRS). The DOH Division of Epidemiology’s Bureau of Surveillance and Data System (BSDS) monitors the reporting and ensures that all positives and negatives are accurately. Test counts reflect those completed on an individual each day. A person may have multiple specimens tested on one day, these would be counted one time, i.e., if two specimens are collected from an individual at the same time and then evaluated, the outcome of the evaluation of those two samples to diagnose the individual is counted as a single test of one person, even though the specimens may be tested separately. Conversely, if an individual is tested on more than one day, the data will show two tests of an individual, one for each date the person was tested.

                                Test counts are assigned to a county based on this order of preference: 1) the patient’s address, 2) the ordering healthcare provider’s address, or 3) the ordering facility’s address.
                            </Text>

                        </ScrollView>

                    </View>

                </View>

            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        padding: 20,
    },
    titleFont: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    bodyText: {
        fontSize: 16
    },
    textContainer: {
        margin: 10
    },
    textScrollConatiner: {
        marginTop: 20,
        height: dimensions.fullHeight * .65
    },
    mainBodyText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
    }
})