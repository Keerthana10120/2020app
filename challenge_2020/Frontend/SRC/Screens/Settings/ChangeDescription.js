import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { container } from '../../CommonCss/pagecss'
import { formbtn } from '../../CommonCss/formcss'
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangeDescription = ({ navigation }) => {

    const [description, setdescription] = useState('')
    const [loading, setLoading] = useState(false)

    const handleDescription = () => {

        if (description == '') {
            alert('Please enter username')
        }
        else {
            setLoading(true)
            AsyncStorage.getItem('user').then(
                data => {
                    //fetch('http://192.168.180.64:3000/setdescription', 
                    fetch('http://192.168.29.192:3000/setdescription', 
                    {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: JSON.parse(data).user.email,
                            description: description
                        })
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.message === "Description Updated Successfully") {
                                setLoading(false)
                                alert('Description has been set successfully')
                                navigation.navigate('EditProfile')
                            }
                            else if (data.error === "Invalid Credentials") {
                                alert('Invalid Credentials')
                                setLoading(false)
                                navigation.navigate('Login')
                            }
                            else {
                                setLoading(false)
                                alert("Please Try Again");
                            }
                        })
                        .catch(err => {
                            alert('Something went wrong')
                            setLoading(false)
                        })
                }
            )
                .catch(err => {
                    alert('Something went wrong')
                    setLoading(false)
                })
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

            <View style={{ paddingHorizontal: 5, flexDirection: 'row', marginTop: 200, textAlign: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 35, color: '#fff', textAlign: 'center' }}>
                    20
                </Text>
                <Text style={{ fontWeight: 'bold', fontSize: 35, color: '#8A2BE2', textAlign: 'center' }}>
                    20
                </Text>
            </View>

            <View style={styles.container}>
                <View style={styles.textAreacontainer}>
                    <Text style={{ padding: 4, fontSize: 26, fontWeight: 'bold', color: '#fff', marginTop: 5, marginBottom: 20 }}>
                        Change Description
                    </Text>
                    <TextInput style={styles.textArea}
                        textAlignVertical='top'
                        placeholder="Enter your description"
                        placeholderTextColor= '#a5a5a5'
                        numberOfLines={5}
                        multiline={true}
                        color="#a5a5a5"
                        onChangeText={(text) => setdescription(text)}
                    />
                </View>
            </View>
            {
                loading ? <ActivityIndicator /> :
                    <Text style={formbtn} onPress={() => handleDescription()}> Save </Text>
            }
        </View>
    )
}

export default ChangeDescription

const styles =  StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 3,
        backgroundColor: 'black',
        alignContent: 'center',
        alignItems: 'center',
    },
    textAreacontainer: {
        borderColor: '#a5a5a5',
        color: '#a5a5a5',
    },
    textArea:{
      height: 100,
      padding: 7,
      margin:2,
      width:350,
      borderWidth: 1,
      borderColor: 'white',
      color: 'white',
      justifyContent: "flex-start",
      color: '#a5a5a5',
      borderColor: '#a5a5a5',
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    padding: 7,
    justifyContent: "flex-start",
    width:360,
    margin: 2,
    color: '#a5a5a5',
    borderColor: '#a5a5a5',
    marginTop: 10,
    marginBottom: 20
    },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    borderRadius: 5,
    padding: 15,
    backgroundColor: '#8A2BE2',
    marginTop: 30,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});