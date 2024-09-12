import { Text, View, TouchableOpacity, ActivityIndicator} from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { container1, main2 } from '../../CommonCss/pagecss'
import { formbtn1, formHead2 } from '../../CommonCss/formcss'
import { firebase } from '../../Firebase/Config'
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UploadProfilePicture = ({ navigation }) => {
    
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false)

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })
        // console.log(result)


        if (!result.cancelled) {
            const source = { uri: result.uri };
            setImage(source);

            const response = await fetch(result.uri);
            const blob = await response.blob();
            const filename = result.uri.substring(result.uri);

            const ref = firebase.storage().ref().child(filename);
            const snapshot = await ref.put(blob);
            const url = await snapshot.ref.getDownloadURL();

            // console.log(url)
            return url
        }
        else {
            return null
        }
    }

    const handleUpload = () => {
        // pickImage()
        AsyncStorage.getItem('user')
            .then(data => {
                setLoading(true)

                pickImage().then(url => {
                    //fetch('http://192.168.180.64:3000/setprofilepic', 
                    fetch('http://192.168.29.192:3000/setprofilepic',
                    {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: JSON.parse(data).user.email,
                            profilepic: url
                        })
                    })
                        .then(res => res.json()).then(
                            data => {
                                if (data.message === "Profile picture updated successfully") {
                                    setLoading(false)
                                    alert('Profile picture updated successfully')
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
                            }
                        )
                        .catch(err => {
                            console.log(err)
                        })

                })
            })
    }
    return (
        <View>
            <View style={{ paddingTop: 15, paddingHorizontal:10, flexDirection: 'row', textAlign: 'center', backgroundColor:'black'}}>
                <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                    <MaterialCommunityIcons
                        name="arrow-left"
                        color={'#fff'}
                        size={30}
                    />
                </TouchableOpacity>
            </View>
            <View style={container1}>
                <View style={main2} >
                    <Text style={{ fontWeight: 'bold', fontSize: 50, color: '#fff' , textAlign: 'center',}}>
                        20
                    </Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 50, color: '#8A2BE2' , textAlign: 'center',}}>
                        20
                    </Text>
                </View>
                <Text style={formHead2}>Choose a profile picture</Text>
                {
                    loading ? <ActivityIndicator
                        size="large"
                        color="white"
                    /> :
                        <Text style={formbtn1} onPress={() => handleUpload()}> Upload </Text>
                }
            </View>
        </View>
    )
}

export default UploadProfilePicture