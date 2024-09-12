// import { StyleSheet, Text, View, Image, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native'
// import React, { useState, useEffect } from 'react'
// import Divider from 'react-native-divider';
// import nopic from '../../assets/nopic.png';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Post_Big_Card = ({ navigation }) => {

//     const [userdata, setUserdata] = React.useState(null)
//     const loaddata = async () => {
//         AsyncStorage.getItem('user')
//             .then(async (value) => {
//                 //fetch('http://192.168.180.64:3000/userdata', 
//                 fetch('http://192.168.29.192:3000/userdata', 
//                     {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': 'Bearer ' + JSON.parse(value).token
//                     },
//                     body: JSON.stringify({ email: JSON.parse(value).user.email })
//                 })
//                     .then(res => res.json()).then(data => {
//                         if (data.message == 'User Found') {
//                             setUserdata(data.user)
//                         }
//                         else {
//                             alert('Login Again')
//                             navigation.navigate('Login')
//                         }
//                     })
//                     .catch(err => {
//                         navigation.navigate('Login')
//                     })
//             })
//             .catch(err => {
//                 navigation.navigate('Login')
//             })
//     }
//     useEffect(() => {
//         loaddata()
//     }, [])

//     console.log('userdata ', userdata)
//     return (
//         <View style={styles.container}>
//             {
//                 userdata ?
//                     <ScrollView>
//                         <TouchableOpacity onPress={() => loaddata()} style={{marginTop: 60, alignItems: 'flex-end', marginRight: 10}}>
//                             <MaterialCommunityIcons
//                                 name="refresh"
//                                 color={'#fff'}
//                                 size={20}                                    
//                             />
//                         </TouchableOpacity>
//                         {
//                             userdata.posts.length > 0 ?
//                                 <View style={{ marginBottom: 40 }}>
//                                     <Divider width={1} orientation="center" />
//                                     {
//                                         userdata.posts?.map((item, index) => {
//                                             return (
//                                                 <View key={index}>
//                                                     <View style={styles.c1}>
//                                                         {
//                                                             userdata.profilepic.length > 0 ?
//                                                                 <Image style={styles.profilepic} source={{ uri: userdata.profilepic }} />
//                                                                 :
//                                                                 <Image style={styles.profilepic} source={nopic} />
//                                                         }
//                                                         <Text style={styles.username}>{userdata.username}</Text>
//                                                     </View>
//                                                     <Image style={styles.image} source={{ uri: item.post }} />
//                                                     <View style={styles.s31} key={item.id}>
//                                                         <Text style={styles.commenttext}>{item.postdescription}</Text>
//                                                     </View>
//                                                     <Divider width={1} orientation="center" />
//                                                 </View>
//                                             )
//                                         })
//                                     }
//                                 </View>
//                                 :
//                                 <View>
//                                     <Text>You have not posted anything yet</Text>
//                                 </View>
//                         }
//                         {
//                             userdata.posts.length > 0 ?
//                                 <View style={{ marginBottom: 40 }}>
//                                     <Divider width={1} orientation="center" />
//                                     {
//                                         userdata.posts2?.map((item, index) => {
//                                             return (
//                                                 <View key={index}>
//                                                     <View style={styles.c1}>
//                                                         {
//                                                             userdata.profilepic.length > 0 ?
//                                                                 <Image style={styles.profilepic} source={{ uri: userdata.profilepic }} />
//                                                                 :
//                                                                 <Image style={styles.profilepic} source={nopic} />
//                                                         }
//                                                         <Text style={styles.username}>{userdata.username}</Text>
//                                                     </View>
//                                                     <Image style={styles.image} source={{ uri: item.post }} />
//                                                     <View style={styles.s31} key={item.id}>
//                                                         <Text style={styles.commenttext}>{item.postdescription}</Text>
//                                                     </View>
//                                                     <Divider width={1} orientation="center" />
//                                                 </View>
//                                             )
//                                         })
//                                     }
//                                 </View>
//                                 :
//                                 <View>
//                                     <Text>You have not posted anything yet</Text>
//                                 </View>
//                         }
//                     </ScrollView>
//                     :
//                     <ActivityIndicator size="large" color="white" />
//             }
//         </View>
//     )
// }

// export default Post_Big_Card

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';

const fetchPosts = async () => {
  try {
    const response = await fetch('http://192.168.29.192:3000/posts');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const nopic = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg';

const Post_Big_Card = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPosts();
      setPosts(data);
    };

    fetchData();
  }, [fetchPosts]);

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
        <Image
          source={{ uri: item.user.profilepic || nopic }}
          style={{ width: 40, height: 40, borderRadius: 20, marginStart: 10 }}
        />
        <Text style={styles.username}>{item.user.username}</Text>
      </View>
      <Image source={{ uri: item.image }} style={styles.image} />
      {item.caption && <Text style={styles.commenttext}>{item.caption}</Text>}
    </View>
  );

  const handleRefresh = async () => {
    const data = await fetchPosts();
    setPosts(data);
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      refreshing={!posts.length}
      onRefresh={handleRefresh}
    />
  );
};

export default Post_Big_Card;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        // height: 350,
        borderRadius: 10,
        marginVertical: 10,
        overflow: 'hidden',
        borderColor: 'white',
        borderWidth: 1,
        
    },
    c1: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        paddingBottom: 10,
        backgroundColor: 'black',
    },
    profilepic: {
        width: 30,
        height: 30,
        borderRadius: 30,
        borderColor: 'white',
        borderWidth: 1,
        marginBottom: 5,
    },
    username: {
        color: 'white',
        marginLeft: 10,
        fontSize: 17,
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    },
    s2: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'black',
        padding: 10,
        alignItems: 'center',
    },
    s21: {
        // width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    s22: {
        marginLeft: 20,
    },
    s3: {
        width: '100%',
        backgroundColor: '#111111',
        padding: 10,
    },
    commentuser: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,

    },
    commenttext: {
        color: 'grey',
        fontSize: 20,
        marginLeft: 10,
        marginVertical: 15
    },
    s31: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 3,
    }

})