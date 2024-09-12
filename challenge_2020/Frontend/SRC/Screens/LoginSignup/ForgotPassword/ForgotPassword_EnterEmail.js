import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { container, inputContainer, inputIcon, inputLine,main1 } from '../../../CommonCss/pagecss'
import { formbtn, formHead3 } from '../../../CommonCss/formcss'

const ForgotPassword_EnterEmail = ({ navigation }) => {

    const [email, setEmail] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const handleEmail = () => {
        if (email === '') {
            alert('Please enter email')
        }

        else {
            setLoading(true)
            //fetch('http://192.168.180.64:3000/verifyfp', 
            fetch('http://192.168.29.192:3000/verifyfp',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            })
                .then(res => res.json()).then(data => {
                    if (data.error === "Invalid Credentials") {
                        // alert('Invalid Credentials')
                        alert('Invalid Credentials')
                        setLoading(false)
                    }
                    else if (data.message === "Verification Code Sent to your Email") {
                        setLoading(false)
                        alert(data.message);

                        navigation.navigate('ForgotPassword_EnterVerificationCode', {
                            useremail: data.email,
                            userVerificationCode: data.VerificationCode
                        })

                    }
                })
        }
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
                <Text style={formHead3}>Verify Your Email</Text>
            </View>

            <View style={{ marginTop: 10 }}>
                <View style={inputContainer}>
                    <Icon
                        name="mail-outline"
                        size={20}
                        style={inputIcon}
                    />
                    <TextInput
                        placeholderTextColor="#a5a5a5"
                        placeholder="Enter Your Email"
                        style={inputLine}
                        keyboardType="email-address" 
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
            </View>
            {
                loading ? <ActivityIndicator size="large" color="white" /> :
                    <Text style={formbtn} onPress={() => handleEmail()}>
                        Next
                    </Text>
            }
        </View>
    )
}

export default ForgotPassword_EnterEmail

const styles = StyleSheet.create({})