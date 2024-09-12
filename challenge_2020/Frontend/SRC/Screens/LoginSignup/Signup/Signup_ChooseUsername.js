import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { container, inputContainer, inputIcon, inputLine, main1 } from '../../../CommonCss/pagecss'
import { formbtn, formHead3 } from '../../../CommonCss/formcss'

const Signup_ChooseUsername = ({ navigation, route }) => {

    const { email } = route.params
    const [username, setusername] = useState('')
    const [loading, setLoading] = useState(false)


    const handleUsername = () => {
        if (username == '') {
            alert('Please enter username')
        }
        else {
            setLoading(true)
            //fetch('http://192.168.180.64:3000/changeusername', 
            fetch('http://192.168.29.192:3000/changeusername',
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    username: username
                })
            })
                .then(res => res.json()).then(
                    data => {
                        if (data.message === "Username Available") {
                            setLoading(false)
                            alert('Username has been set successfully')
                            navigation.navigate('Signup_ChoosePassword', { email: email, username: username })
                        }
                        else {
                            setLoading(false)
                            alert("Username not available");
                        }
                    }
                ).catch(err => {
                    console.log(err)
                })

        }

        // navigation.navigate('Signup_ChoosePassword')
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
                    Choose a Username
                </Text>
            </View>
            <View style={{ marginTop: 5 }}>
                <View style={inputContainer}>
                    <MaterialCommunityIcons
                        name="account"
                        size={20}
                        style={inputIcon}
                    />
                    <TextInput
                        placeholderTextColor="#a5a5a5"
                        placeholder="Enter a username"
                        style={inputLine} 
                        onChangeText={(text) => setusername(text)}
                    />
                </View>
            </View>

            {
                loading ? <ActivityIndicator /> :
                    <Text style={formbtn} onPress={() => handleUsername()}>
                        Next
                    </Text>
            }
        </View>
    )
}

export default Signup_ChooseUsername

const styles = StyleSheet.create({})