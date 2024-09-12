import { StyleSheet, StatusBar, Text, View, ScrollView, Image,  ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BottomNavbar from '../../Components/BottomNavbar'
import TopNavbar from '../../Components/TopNavbar';
import nopic from '../../../assets/nopic.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const My_UserProfile = ({ navigation }) => {

    const [userdata, setUserdata] = React.useState(null)
    const loaddata = async () => {
        AsyncStorage.getItem('user')
            .then(async (value) => {
                //fetch('http://192.168.180.64:3000/userdata', 
                fetch('http://192.168.29.192:3000/userdata', 
                    {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + JSON.parse(value).token
                    },
                    body: JSON.stringify({ email: JSON.parse(value).user.email })
                })
                    .then(res => res.json()).then(data => {
                        if (data.message == 'User Found') {
                            setUserdata(data.user)
                        }
                        else {
                            alert('Login Again')
                            navigation.navigate('Login')
                        }
                    })
                    .catch(err => {
                        navigation.navigate('Login')
                    })
            })
            .catch(err => {
                navigation.navigate('Login')
            })
    }
    useEffect(() => {
        loaddata()
    }, [])

    console.log('userdata ', userdata)

    return (
        <View style={{ flex: 1 }}>  
        <StatusBar />    
            <TopNavbar navigation={navigation} page={"My_UserProfile"} />
            <View style={styles.container}>
                    
                <BottomNavbar navigation={navigation} page={"My_UserProfile"} />
                {
                    userdata ?
                        <ScrollView>       
                            <View style={styles.c1}> 
                                <View style={styles.c11}>
                                    {
                                        userdata.profilepic.length > 0 ?
                                            <Image style={styles.profilepic} source={{ uri: userdata.profilepic }} />
                                            :
                                            <Image style={styles.profilepic} source={nopic} />
                                    }
                                    <View style={styles.c111}>
                                        <Text style={styles.txt2}>{userdata.posts.length}</Text>
                                        <Text style={styles.txt1}>Book Posts</Text>
                                    </View>
                                    <View style={styles.c111}>
                                        <Text style={styles.txt2}>{userdata.posts2.length}</Text>
                                        <Text style={styles.txt1}>Movie Posts</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', paddingRight: 17 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#fff', paddingHorizontal: 19 }}>#{userdata.username}</Text>
                                <View style={{paddingLeft: 220, paddingTop: 8}}>
                                    <TouchableOpacity onPress={() => loaddata()} >
                                        <MaterialCommunityIcons
                                            name="refresh"
                                            color={'#fff'}
                                            size={30}                                    
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View> 
                            {
                                userdata.description.length > 0 &&
                                <Text style={styles.description}>{userdata.description}</Text>
                            }
                            
                            {
                                userdata.posts.length > 0 ?
                                    <View>
                                        
                                            <Text style={styles.txt}>Book Posts</Text>
                                            
                                        
                                        
                                        <View style={styles.c13}>
                                        {
                                            userdata.posts?.map(
                                                (item) => {
                                                    return (
                                                        <Image key={item.post} style={styles.postpic}
                                                            source={{ uri: item.post }}
                                                        />
                                                    )
                                                }
                                            )
                                        }
                                        </View>
                                    </View>
                                    :
                                    <View style={styles.c2}>
                                        <Text style={styles.txt1}>You have not posted anything yet</Text>
                                    </View>
                            }
                             {
                                userdata.posts2.length > 0 ?
                                    <View>
                                        
                                            <Text style={styles.txt}>Movie Posts</Text>
                                            
                                        
                                        
                                        <View style={styles.c13}>
                                        {
                                            userdata.posts2?.map(
                                                (item) => {
                                                    return (
                                                        <Image key={item.post} style={styles.postpic}
                                                            source={{ uri: item.post }}
                                                        />
                                                    )
                                                }
                                            )
                                        }
                                        </View>
                                    </View>
                                    :
                                    <View style={styles.c2}>
                                        <Text style={styles.txt1}>You have not posted anything yet</Text>
                                    </View>
                        }

                    </ScrollView>
                    :
                    <ActivityIndicator size="large" color="white" />
                }
            </View>
        </View>
    )
}

export default My_UserProfile

const styles = StyleSheet.create({
    container1: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 10,
        position: 'absolute',
        top: 0,
        zIndex: 100,
        backgroundColor: "#000",

    },
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        paddingVertical: 50,
        marginTop: 20
    },
    c1: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingVertical: 10, 
        paddingLeft: 20
    },
    profilepic: {
        resizeMode: 'cover',
        width: 120,
        height: 120,
        borderRadius: 100,
    },
    txt: {
        color: 'white',
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20
    },
    txt1: {
        color: 'white',
        fontSize: 15,
    },
    txt2: {
        color: 'white',
        fontSize: 24,
    },
    c11: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    c111: {
        alignItems: 'center',
        paddingLeft: 30
    },
    description: {
        color: 'white',
        fontSize: 15,
        justifyContent: 'flex-start',
        width: '100%',
        padding: 20,
        paddingVertical: 10,
    },
    postpic: {
        width: '30%',
        height: 120,
        margin: 5
    },
    c13: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
        justifyContent: 'center'
    },
    c2: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 200
    },
    refresh: {
        position: 'absolute',
        left: 350,
    }
})
