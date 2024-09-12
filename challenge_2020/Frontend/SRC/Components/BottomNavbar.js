import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { icons1 } from '../CommonCss/pagecss';

const BottomNavbar = ({ navigation, page }) => {
    // console.log(page)
    return (
        <View style={styles.container}>
            {
                page === 'MainPage' ?
                    <MaterialCommunityIcons name="home" size={40} color="black" style={styles.activeicons1}
                        onPress={() => navigation.navigate('MainPage')} />
                    :
                    <MaterialCommunityIcons name="home" size={15} color="black" style={icons1}
                        onPress={() => navigation.navigate('MainPage')} />
            }

            {/* {
                page === 'SearchUserPage' ?
                    <Fontisto name="search" size={24} color="black" style={styles.activeicons1}

                        onPress={() => navigation.navigate('SearchUserPage')}
                    />
                    :
                    <Fontisto name="search" size={24} color="black" style={icons1}

                        onPress={() => navigation.navigate('SearchUserPage')}
                    />
            } */}

            {
                page === 'Guidelines' ?
                    <MaterialCommunityIcons name="book-open" size={40} color="black" style={styles.activeicons1}

                        onPress={() => navigation.navigate('Guidelines')}
                    />
                    :
                    <MaterialCommunityIcons name="book-open" size={15} color="black" style={icons1}

                        onPress={() => navigation.navigate('Guidelines')}
                    />
            }

            {/* {
                page === 'NotificationPage' ?
                    <Ionicons name="ios-heart" size={24} color="black" style={styles.activeicons1}

                        onPress={() => navigation.navigate('NotificationPage')}

                    />
                    :
                    <Ionicons name="ios-heart" size={24} color="black" style={icons1}

                        onPress={() => navigation.navigate('NotificationPage')}

                    />
            } */}

            {
                page === 'LeaderBoard' ?
                    <MaterialCommunityIcons name="arrow-up" size={40} color="black" style={styles.activeicons1}

                        onPress={() => navigation.navigate('LeaderBoard')}

                    />
                    :
                    <MaterialCommunityIcons name="arrow-up" size={15} color="black" style={icons1}

                        onPress={() => navigation.navigate('LeaderBoard')}

                    />
            }

            {
                page === 'Feedback' ?
                    <MaterialCommunityIcons name="message" size={40} color="black" style={styles.activeicons1}

                        onPress={() => navigation.navigate('Feedback')}

                    />
                    :
                    <MaterialCommunityIcons name="message" size={15} color="black" style={icons1}

                        onPress={() => navigation.navigate('Feedback')}

                    />
            }
            
            {
                page === 'My_UserProfile' ?
                    <MaterialCommunityIcons name="account" size={40} style={styles.activeicons1} 

                        onPress={() => navigation.navigate('My_UserProfile')}

                    />
                    :
                    <MaterialCommunityIcons name="account" size={15} style={icons1} 

                        onPress={() => navigation.navigate('My_UserProfile')}

                    />
            }
        </View>
    )
}

export default BottomNavbar

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: "#000",
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        zIndex: 100,
        alignItems: 'center',
    },
    activeicons1: {
        borderTopWidth: 0,
        paddingTop: 3,
        paddingBottom: 4,
        height: 60,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 1,
        shadowOffset: { width: 0, height: 0 },
        color: '#fff'
    }
})