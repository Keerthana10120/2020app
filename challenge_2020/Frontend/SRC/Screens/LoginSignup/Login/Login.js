import { StyleSheet, Text, View, Image, TextInput, ActivityIndicator} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { btnSecondary, container, containerFull, hr80, inputContainer, inputIcon, inputLine, line, main } from '../../../CommonCss/pagecss';
import { formbtn, formbtn2, formHead0, formHead1} from '../../../CommonCss/formcss';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const handleLogin = () => {
        if (email == '' || password == '') {
            alert('Please enter email and password')
        }
        else {
            setLoading(true)
            //fetch('http://192.168.180.64:3000/signin',
            fetch('http://192.168.29.192:3000/signin',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
                .then(res => res.json())
                .then(async data => {
                    if (data.error) {
                        setLoading(false)
                        alert(data.error)
                    }
                    else if (data.message == 'Successfully Signed In') {
                        setLoading(false)
                        await AsyncStorage.setItem('user', JSON.stringify(data))
                        navigation.navigate('MainPage', { data })
                    }
                })
                .catch(err => {
                    setLoading(false)
                    alert(err)
                })
        }
        // navigation.navigate('MainPage')
    }
    return (
        <View style={container}>
            
            <View style={main}>
                <Text style={{ fontWeight: 'bold', fontSize: 35, color: '#fff' , textAlign: 'center'}}>
                    20
                </Text>
                <Text style={{ fontWeight: 'bold', fontSize: 35, color: '#8A2BE2' , textAlign: 'center'}}>
                    20
                </Text>
            </View>

            <View style={{ marginTop: 10 }}>
                <Text style={formHead0}>
                    Welcome Back!
                </Text>
                <Text style={formHead1}>
                    Sign in to continue
                </Text>
            </View>

            <View style={{ marginTop: 20 }}>
                <View style={inputContainer}>
                    <Icon
                        name="mail-outline"
                        size={20}
                        style={inputIcon}
                    />
                    <TextInput
                        placeholderTextColor="#a5a5a5"
                        placeholder="Email"
                        style={inputLine}
                        keyboardType="email-address" 
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <View style={inputContainer}>
                    <Icon
                        name="lock-outline"
                        size={20}
                        style={inputIcon}
                    />
                    <TextInput
                        placeholderTextColor="#a5a5a5"
                        placeholder="Password"
                        style={inputLine}
                        secureTextEntry 
                        onChangeText={(text) => setPassword(text)}
                        />
                </View>

                {
                    loading ?
                        <ActivityIndicator size="large" color="white" />
                        :
                        <Text style={formbtn} onPress={() => handleLogin()}>
                            Submit
                        </Text>
                }
                
                <View style={{color: '#fff', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={formbtn2}>
                        <Text style={{ color: '#fff', fontSize: 18 }}
                            onPress={() => navigation.navigate('ForgotPassword_EnterEmail')}>
                                Forget Password?
                        </Text>
                    </View>
                    <View style={formbtn2}>
                        <Text style={{ color: '#fff', fontSize: 18 }}
                            onPress={() => navigation.navigate('MainPage')}>
                                Continue as Guest
                        </Text>
                    </View>
                </View>

            </View>

            <View style={{color: '#fff', marginVertical: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <View style={line}></View>
                <Text style={{ color: '#fff', marginHorizontal: 5, fontWeight: 'bold' }}>OR</Text>
                <View style={line}></View>
            </View>
            
            <View style={{color: '#fff', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', marginTop: 5}}>
                <Text style={{ color: '#a5a5a5', fontWeight: 'bold'}}>
                    Don`t have an account ?
                </Text>
            </View> 
            
            <Text style={formbtn} onPress={() => navigation.navigate('Signup_EnterEmail')}>
                Sign Up
            </Text>

        </View>
    )
}

export default Login

const styles = StyleSheet.create({})