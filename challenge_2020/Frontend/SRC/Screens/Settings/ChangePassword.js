import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { container, inputContainer1, inputIcon, inputLine, main} from '../../CommonCss/pagecss'
import { formbtn, formbtn3, formHead3 } from '../../CommonCss/formcss'
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePassword = ({ navigation }) => {

    const [oldpassword, setOldpassword] = useState('')
    const [newpassword, setNewpassword] = useState('')
    const [confirmnewpassword, setConfirmNewpassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handlePasswordChange = () => {
        if (oldpassword === '' || newpassword === '' || confirmnewpassword === '') {
            alert('Please fill all the fields')
        } else if (newpassword !== confirmnewpassword) {
            alert('New password and confirm new password must be same')
        }
        else {
            setLoading(true)
            AsyncStorage.getItem('user')

                .then(data => {
                    //fetch('http://192.168.180.64:3000/changepassword', 
                    fetch('http://192.168.29.192:3000/changepassword',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": 'Bearer ' + JSON.parse(data).tokens
                        },
                        body: JSON.stringify({ email: JSON.parse(data).user.email, oldpassword: oldpassword, newpassword: newpassword })
                    })
                        .then(res => res.json()).then(data => {
                            if (data.message == 'Password Changed Successfully') {
                                setLoading(false)
                                alert('Password Changed Successfully')
                                AsyncStorage.removeItem('user')
                                navigation.navigate('Login')
                            }
                            else {
                                alert('Wrong Password')
                                setLoading(false)
                            }
                        }
                        )
                })
        }
    }

    return (
        <View style={container}>
            
            <View style={{ paddingTop: 15, paddingHorizontal:10, flexDirection: 'row', textAlign: 'center', backgroundColor:'black'}}>
                <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                    <MaterialCommunityIcons
                        name="arrow-left"
                        color={'#fff'}
                        size={30}
                    />
                </TouchableOpacity>
            </View>

            <View style={main} >
                <Text style={{ fontWeight: 'bold', fontSize: 50, color: '#fff' , textAlign: 'center',}}>
                    20
                </Text>
                <Text style={{ fontWeight: 'bold', fontSize: 50, color: '#8A2BE2' , textAlign: 'center',}}>
                    20
                </Text>
            </View>

            <View style={{ marginVertical:12, fontSize: 20 }}>
                <Text style={formHead3}>
                    Change Password
                </Text>
            </View>

            <View>
                <View style={inputContainer1}>
                    <MaterialCommunityIcons
                        name="lock-outline"
                        size={20}
                        style={inputIcon}
                    />
                    <TextInput
                        placeholderTextColor="#a5a5a5"
                        placeholder="Enter Old password"
                        secureTextEntry
                        style={inputLine} 
                        onChangeText={(text) => setOldpassword(text)}
                    />
                </View>
                <View style={inputContainer1}>
                    <MaterialCommunityIcons
                        name="lock-outline"
                        size={20}
                        style={inputIcon}
                    />
                    <TextInput
                        placeholderTextColor="#a5a5a5"
                        placeholder="Enter New password"
                        secureTextEntry
                        style={inputLine} 
                        onChangeText={(text) => setNewpassword(text)}
                    />
                </View>
                <View style={inputContainer1}>
                    <MaterialCommunityIcons
                        name="lock-outline"
                        size={20}
                        style={inputIcon}
                    />
                    <TextInput
                        placeholderTextColor="#a5a5a5"
                        placeholder="Confirm New password"
                        secureTextEntry
                        style={inputLine} 
                        onChangeText={(text) => setConfirmNewpassword(text)}
                    />
                </View>
            </View>
            <View style={formbtn3}>
                <Text style={{ color: '#fff', fontSize: 18 , paddingLeft:200,}} onPress={() => navigation.navigate('ForgotPassword_EnterEmail')}>
                    Forget Password?
                </Text>
            </View>
            {
                loading ? <ActivityIndicator size="large" color="white" /> :
                    <Text style={formbtn}
                        onPress={() => handlePasswordChange()}
                    >
                        Next
                    </Text>
            }

        </View>
    )
}



export default ChangePassword

const styles = StyleSheet.create({})
