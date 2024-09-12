import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { containerFull, main2, row } from '../../../CommonCss/pagecss'
import { formbtn1, formHead2,} from '../../../CommonCss/formcss'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ForgotPassword_AccountRecovered = ({ navigation }) => {
    return (
        <View style={containerFull}>
            
            <View style={main2} >
                <Text style={{ fontWeight: 'bold', fontSize: 50, color: '#fff' , textAlign: 'center'}}>
                    20
                </Text>
                <Text style={{ fontWeight: 'bold', fontSize: 50, color: '#8A2BE2' , textAlign: 'center'}}>
                    20
                </Text>
            </View>


            <View style={row}>
                <MaterialCommunityIcons name="check-decagram" size={30} color="#99B83C" />
                <Text style={formHead2}> Account Recovered Successfully</Text>
            </View>

            <Text style={formbtn1} onPress={() => navigation.navigate('Login')} >
                Let's Roll
            </Text>
        </View>
    )
}

export default ForgotPassword_AccountRecovered

const styles = StyleSheet.create({})