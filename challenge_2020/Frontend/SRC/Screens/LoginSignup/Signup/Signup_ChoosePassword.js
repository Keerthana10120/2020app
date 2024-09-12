import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { container, inputContainer, inputIcon, inputLine, main1 } from '../../../CommonCss/pagecss'
import { formbtn, formHead3 } from '../../../CommonCss/formcss'
import { MaterialIcons } from '@expo/vector-icons';

const Signup_ChoosePassword = ({ navigation, route }) => {

    const { email, username } = route.params;
    const [password, setpassword] = useState('')
    const [confirmpassword, setconfirmpassword] = useState('')
    const [loading, setLoading] = useState(false)


    const handlePassword = () => {

        // navigation.navigate('Signup_AccountCreated')
        if (password == '' || confirmpassword == '') {
            alert('Please enter password')
        } else if (password != confirmpassword) {
            alert('Password does not match')
        }
        else {
            setLoading(true)
            //fetch('http://192.168.180.64:3000/signup', 
            fetch('http://192.168.29.192:3000/signup',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, username: username, password: password })
            })
                .then(res => res.json()).then(
                    data => {
                        if (data.message === "User Registered Successfully") {
                            setLoading(false)
                            alert(data.message);
                            navigation.navigate('Login')
                        }
                        else {
                            setLoading(false)
                            alert("Please try again");
                        }
                    }
                )
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
                <Text style={formHead3}>
                    Choose a strong password
                </Text>
            </View>
            <View style={{ marginTop: 5 }}>
                <View style={inputContainer}>
                    <MaterialIcons
                        name="lock-outline"
                        size={20}
                        style={inputIcon}
                    />
                    <TextInput
                        placeholderTextColor="#a5a5a5"
                        placeholder="Enter password"
                        style={inputLine} 
                        secureTextEntry 
                        onChangeText={(text) => setpassword(text)}
                    />
                </View>
                <View style={inputContainer}>
                    <MaterialIcons
                        name="lock-outline"
                        size={20}
                        style={inputIcon}
                    />
                    <TextInput
                        placeholderTextColor="#a5a5a5"
                        placeholder="Confirm password"
                        style={inputLine} 
                        secureTextEntry 
                        onChangeText={(text) => setconfirmpassword(text)}
                    />
                </View>
            </View>
            <Text style={formbtn} onPress={() => handlePassword()}>
                Next
            </Text>

        </View>
    )
}

export default Signup_ChoosePassword

const styles = StyleSheet.create({})