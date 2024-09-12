import { StyleSheet, Text, View, StatusBar, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { containerFull } from '../../CommonCss/pagecss'
import { formHead } from '../../CommonCss/formcss'
import Bottomnavbar from '../../Components/BottomNavbar'
import TopNavbar from '../../Components/TopNavbar'
import FollowersRandomPost from '../../Components/FollowersRandomPost'
import nopic from '../../../assets/nopic.png'
import { Foundation } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Other_UserProfile = ({ navigation, route }) => {
    const [userdata, setUserdata] = React.useState(null)
    const [issameuser, setIssameuser] = React.useState(false)

    const ismyprofile = (
        otheruser
    ) => {

        AsyncStorage.getItem('user').then((loggeduser) => {
            const loggeduserobj = JSON.parse(loggeduser);
            if (loggeduserobj.user._id == otheruser._id) {
                setIssameuser(true)

            }
            else {
                setIssameuser(false)
            }
        })
    }
    const { user } = route.params
    // console.log(user)
    const loaddata = async () => {
        //fetch('http://192.168.177.65:3000/otheruserdata',
        fetch('http://192.168.29.192:3000/otheruserdata',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: user.email })
        })
            .then(res => res.json())
            .then(data => {
                if (data.message == 'User Found') {
                    setUserdata(data.user)
                    ismyprofile(data.user)
                    CheckFollow(data.user)
                }
                else {
                    alert('User Not Found')
                    navigation.navigate('SearchUserPage')
                    // navigation.navigate('Login')
                }
            })
            .catch(err => {
                // console.log(err)
                alert('Something Went Wrong')
                navigation.navigate('SearchUserPage')
            })
    }
    useEffect(() => {
        loaddata()
    }, [])

    // console.log('userdata ', userdata)


    const FollowThisUser = async () => {
        console.log('FollowThisUser')
        const loggeduser = await AsyncStorage.getItem('user');
        const loggeduserobj = JSON.parse(loggeduser);
        //fetch('http://192.168.177.65:3000/followuser', 
        fetch('http://192.168.29.192:3000/followuser', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                followfrom: loggeduserobj.user.email,
                followto: userdata.email
            })
        }).then(res => res.json())
            .then(data => {
                if (data.message == 'User Followed') {
                    // alert('Followed')
                    loaddata()
                    setIsfollowing(true)
                }
                else {
                    alert('Something Went Wrong')
                }
            })
    }

    const [isfollowing, setIsfollowing] = React.useState(false)
    const CheckFollow = async (otheruser) => {
        AsyncStorage.getItem('user')
            .then(loggeduser => {
                const loggeduserobj = JSON.parse(loggeduser);
                //fetch('http://192.168.177.65:3000/checkfollow', 
                fetch('http://192.168.29.192:3000/checkfollow', 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        followfrom: loggeduserobj.user.email,
                        followto: otheruser.email
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.message == 'User in following list') {
                            setIsfollowing(true)
                        }
                        else if (
                            data.message == 'User not in following list'
                        ) {

                            setIsfollowing(false)
                        }
                        else {
                            // loaddata()
                            alert('Something Went Wrong')
                        }
                    })
            })

    }



    const UnfollowThisUser = async () => {
        console.log('UnfollowThisUser')
        const loggeduser = await AsyncStorage.getItem('user');
        const loggeduserobj = JSON.parse(loggeduser);
        //fetch('http://192.168.177.65:3000/unfollowuser', 
        fetch('http:/192.168.29.192:3000/unfollowuser', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                followfrom: loggeduserobj.user.email,
                followto: userdata.email
            })
        }).then(res => res.json())
            .then(data => {
                if (data.message == 'User Unfollowed') {
                    // alert('Followed')
                    loaddata()
                    setIsfollowing(false)
                }
                else {
                    alert('Something Went Wrong')
                }
            })
    }
    return (
        <View style={styles.container}>
            <StatusBar />
            <TopNavbar navigation={navigation} page={"Other_UserProfile"} />
            <Foundation name="refresh" size={30} color="white" style={styles.refresh}
                onPress={() => loaddata()}
            />
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
                                        <Text style={styles.txt1}>Posts</Text>
                                    </View>
                                    <View style={styles.c111}>
                                        <Text style={styles.txt2}>{userdata.followers.length}</Text>
                                        <Text style={styles.txt1}>Followers</Text>
                                    </View>
                                    <View style={styles.c111}>
                                        <Text style={styles.txt2}>{userdata.following.length}</Text>
                                        <Text style={styles.txt1}>Following</Text>
                                    </View>
                                </View>
                        </View>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#fff' ,paddingHorizontal:19}}>#{userdata.username}</Text>
                            {
                                userdata.description.length > 0 &&
                                <Text style={styles.description}>{userdata.description}</Text>
                            }
                        <View style={styles.c1}>

                            {
                                issameuser ?
                                    <></>
                                    :
                                    <View style={styles.row}>
                                        {
                                            isfollowing ?
                                                <Text style={styles.follow} onPress={() => UnfollowThisUser()}>Following</Text>
                                                :
                                                <Text style={styles.follow} onPress={() => FollowThisUser()}>Follow</Text>
                                        }
                                    </View>
                            }
                        </View>
                        {
                            isfollowing || issameuser ?
                                <View>
                                    {
                                        userdata.posts.length > 0 ?
                                            <View>
                                        <View style={{ flexDirection: 'row', paddingRight: 17 }}>
                                            <Text style={styles.txt}>Posts</Text>
                                            <View style={{paddingLeft: 250, paddingTop: 8}}>
                                                <TouchableOpacity onPress={() => loaddata()} >
                                                <MaterialCommunityIcons
                                                    name="refresh"
                                                    color={'#fff'}
                                                    size={30}
                                                    
                                                />
                                            </TouchableOpacity>
                                            </View>
                                            
                                        </View> 
                                        
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
                                                <Text style={styles.txt1}>This user has not posted anything yet</Text>
                                            </View>
                                    }
                                </View>
                                :
                                <View style={styles.c2}>
                                    <Text style={styles.txt1}>Follow to see posts</Text>
                                </View>
                        }
                    </ScrollView>

                    :
                    <ActivityIndicator size="large" color="white" />
            }

        </View>
    )
}

export default Other_UserProfile

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
    },
    c1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 10,  
    },
    profilepic: {
        resizeMode: 'cover',
        width: 80,
        height: 80,
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
        fontSize: 20,
    },
    c11: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
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
    },
    follow: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    row: {
        justifyContent: 'center',
        flexDirection: 'row',
        width: '95%',
        margin: 10,
        backgroundColor: '#8A2BE2',
        paddingVertical: 8,
        borderRadius: 5
    },
    vr1: {
        width: 1,
        height: 50,
        backgroundColor: 'white'
    },
})


