import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import TopNavbar from '../../Components/TopNavbar';
import { container } from '../../CommonCss/pagecss'
import { formbtn } from '../../CommonCss/formcss'
import { firebase } from '../../Firebase/Config'
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddMoviePost = ({ navigation }) => {

    const [postdescription, setpostdescription] = useState('')
    const [loading1, setLoading1] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [post, setPost] = useState(null)

    const pickImage = async () => {
        setLoading1(true)
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })
        // console.log(result)


        if (!result.cancelled) {
            const source = { uri: result.uri };


            const response = await fetch(result.uri);
            const blob = await response.blob();
            const filename = result.uri.substring(result.uri);

            const ref = firebase.storage().ref().child(filename);
            const snapshot = await ref.put(blob);
            const url = await snapshot.ref.getDownloadURL();

            setLoading1(false)
            setPost(url)
            // console.log(url)
        }
        else {
            setLoading1(false)
            setPost(null)
        }
    }

    const handleUpload = () => {

        if (post != null) {
            AsyncStorage.getItem('user')
                .then(data => {
                    setLoading2(true)

                    //fetch('http://192.168.180.64:3000/addmoviepost',
                    fetch('http://192.168.29.192:3000/addmoviepost', 
                    {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: JSON.parse(data).user.email,
                            post: post,
                            postdescription: postdescription
                        })
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.message == 'Post added successfully') {
                                alert('Post added successfully')
                                setLoading2(false)
                                navigation.navigate('My_UserProfile')
                            }
                            else {
                                alert('Something went wrong, please try again')
                                setLoading2(false)
                            }
                        })
                })
        }
        else {
            alert('Please select an image')
        }
    }

    return (
        <View style={container}>
            <TopNavbar navigation={navigation} page={"AddMoviePost"} />
            {
                loading1 ? <ActivityIndicator
                    size="large"
                    color="white"
                /> :
                    <>
                        <Text style={{ padding: 4, fontSize: 25, fontWeight: 'bold', color: '#fff', marginTop: 150 }}>Add New Post</Text>
                        {
                            post ?
                                <TouchableOpacity onPress={() => pickImage()}>
                                    <Image source={{ uri: post }} style={{width: 200, height: 200, marginVertical: 10,}} />
                                </TouchableOpacity>
                                :
                                <Text style={styles.button} onPress={() => {pickImage()}}>
                                    Click here to select a new post
                                </Text>
                        }
                    </>
            }
            {/*  */}
            <View style={styles.container}>
                <View style={styles.textAreacontainer}>
                    <Text style={{ padding: 4, fontSize: 25, fontWeight: 'bold', color: '#fff', marginTop: 5, marginBottom: 20 }}>
                        Change Description
                    </Text>
                    <TextInput style={styles.textArea}
                        textAlignVertical='top'
                        placeholder="Enter your description"
                        placeholderTextColor= '#a5a5a5'
                        numberOfLines={10}
                        multiline={true}
                        color="#a5a5a5"
                        onChangeText={(text) => setpostdescription(text)}
                    />
                </View>
            </View>
            {
                loading2 ? <ActivityIndicator
                    size="large"
                    color="white"
                /> :
                    <Text style={formbtn} onPress={() => handleUpload()}>
                        Upload
                    </Text>
            }
        </View>
    )
}






export default AddMoviePost

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 3,
        backgroundColor: 'black',
        alignContent: 'center',
        alignItems: 'center',
        paddingBottom: 20
    },
    textAreacontainer: {
        borderColor: '#a5a5a5',
        color: '#a5a5a5',
    },
    textArea: {
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
        height: 70,
        width: '100%',
        borderColor: '#a5a5a5',
        backgroundColor: '#000',
        borderRadius: 5,
        borderWidth: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        paddingVertical: 20,
        marginVertical: 20,
        textAlign: 'center',
        alignContent: 'center',
        alignSelf: 'stretch',
        alignItems: 'center',
        
    },
    btnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
    addpost: {
        fontSize: 20,
        color: 'white',
        borderColor: 'white',
        borderWidth: 1,
        paddingVertical: 20,
        width: '90%',
        textAlign: 'center',
        marginVertical: 20,
        alignSelf: 'stretch',
        alignItems: 'center',
    }
})