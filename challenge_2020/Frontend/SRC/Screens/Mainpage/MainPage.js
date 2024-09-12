import { StyleSheet, Text, View, StatusBar,TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import BottomNavbar from '../../Components/BottomNavbar'
import TopNavbar from '../../Components/TopNavbar';
import Post_Big_Card from '../../Cards/Post_Big_Card';

const MainPage = ({ navigation }) => {

    // const [userdata, setUserdata] = React.useState(null)
    // useEffect(() => {
    //     AsyncStorage.getItem('user')
    //         .then(data => {
    //             // console.log('async userdata ', data)
    //             setUserdata(JSON.parse(data))
    //         })
    //         .catch(err => alert(err))
    // }, [])

    // console.log('userdata ', userdata)

    return (
        <View style={styles.container}>
            <StatusBar/>
            <TopNavbar navigation={navigation} page={"MainPage"} />
            {/* <Foundation name="refresh" size={30} color="white" style={styles.refresh}
                onPress={() => loaddata()}
            /> */}
            <View style={{marginVertical: 60,}}>
                <Post_Big_Card navigation={navigation}/>
            </View>
            <BottomNavbar navigation={navigation} page={"MainPage"} />
        </View>
        
        
    )
}

export default MainPage

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
    },
    refresh: {
        position: 'absolute',
        left: 350,
    },
})