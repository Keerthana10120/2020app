import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { container, inputContainer, inputIcon, inputLine, main1 } from '../../../CommonCss/pagecss'
import { formbtn, formHead3 } from '../../../CommonCss/formcss'

const ForgotPassword_EnterVerificationCode = ({ navigation, route }) => {

    const { useremail, userVerificationCode } = route.params;
    console.log(useremail, userVerificationCode)
    const [verificationCode, setVerificationCode] = React.useState('');


    const handleVerificationCode = () => {

        if (verificationCode != userVerificationCode) {
            alert('Invalid Verification Code')
        }
        else {
            alert('Verification Code Matched')
            navigation.navigate('ForgotPassword_ChoosePassword', { email: useremail })
        }

        // navigation.navigate('ForgotPassword_ChoosePassword')
    }
    return (
        <View style={container}>
            
            <View style={{ paddingTop: 15, flexDirection: 'row', textAlign: 'center', backgroundColor:'black'}}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <MaterialCommunityIcons
                        name="arrow-left"
                        color={'#fff'}
                        size={30}
                    />
                </TouchableOpacity>
            </View>

            <View style={main1} >
                <Text style={{ fontWeight: 'bold', fontSize: 35, color: '#fff' , textAlign: 'center', marginTop: 30}}>
                    20
                </Text>
                <Text style={{ fontWeight: 'bold', fontSize: 35, color: '#8A2BE2' , textAlign: 'center', marginTop: 30}}>
                    20
                </Text>
            </View>

            <View style={{ marginTop: 20 }}>
                <Text style={formHead3}>
                    A verification code has been sent to your email
                </Text>
            </View>

            <View style={{ marginTop: 10 }}>
                <View style={inputContainer}>
                    <Icon
                        name="lock"
                        size={20}
                        style={inputIcon}
                    />
                    <TextInput
                        placeholderTextColor="#a5a5a5"
                        placeholder="Enter 6-Digit Code here"
                        style={inputLine} 
                        onChangeText={(text) => setVerificationCode(text)}
                    />
                </View>
            </View>

            <Text style={formbtn} onPress={() => handleVerificationCode()}>
                Next
            </Text>

        </View>
    )
}

export default ForgotPassword_EnterVerificationCode

const styles = StyleSheet.create({})