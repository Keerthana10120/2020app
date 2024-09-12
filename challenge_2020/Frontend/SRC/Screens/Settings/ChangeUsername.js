import { Text, View, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { container, inputContainer, inputIcon, inputLine, main1 } from '../../CommonCss/pagecss'
import { formbtn, formHead3 } from '../../CommonCss/formcss'
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangeUsername = ({ navigation }) => {

    const [username, setusername] = useState('')
    const [loading, setLoading] = useState(false)

    const handleUsername = () => {
        if (username == '') {
            alert('Please enter username')
        }
        else {
            setLoading(true)
            AsyncStorage.getItem('user')
                .then(data => {
                    //fetch('http://192.168.180.64:3000/setusername', 
                    fetch('http://192.168.29.192:3000/setusername', 
                    {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: JSON.parse(data).user.email,
                            username: username
                        })
                    })
                        .then(res => res.json())
                        .then(
                            data => {
                                if (data.message === "Username Updated Successfully") {
                                    setLoading(false)
                                    alert('Username has been set successfully')
                                    navigation.navigate('EditProfile')
                                }
                                else if (data.error === "Invalid Credentials") {
                                    alert('Invalid Credentials')
                                    setLoading(false)
                                    navigation.navigate('Login')
                                }
                                else {
                                    setLoading(false)
                                    alert("Username not available");
                                }
                            }
                        )
                        .catch(err => {
                            alert('Something went wrong')
                            setLoading(false)
                        })
                })
                .catch(err => {
                    alert('Something went wrong')
                    setLoading(false)
                }
                )
        }

        // navigation.navigate('Signup_ChoosePassword')
    }

    return (
        <View style={container}>
            <View style={{ paddingTop: 15, paddingHorizontal:10, flexDirection: 'row', textAlign: 'center', backgroundColor:'black'}}>
                <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                    <MaterialCommunityIcons
                        name="arrow-left"
                        color={'#fff'}
                        size={30}
                    />
                </TouchableOpacity>
            </View>
            <View style={main1} >
                <Text style={{ fontWeight: 'bold', fontSize: 50, color: '#fff' , textAlign: 'center',}}>
                    20
                </Text>
                <Text style={{ fontWeight: 'bold', fontSize: 50, color: '#8A2BE2' , textAlign: 'center',}}>
                    20
                </Text>
            </View>
            <View style={{ marginTop: 10 }}>
                <Text style={formHead3}>
                    Change a Username
                </Text>
            </View>
            <View>
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
                    <Text style={formbtn} onPress={() => handleUsername()}> Save </Text>
            }
        </View>
    )
}

export default ChangeUsername
