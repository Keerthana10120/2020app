import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './SRC/Screens/LoginSignup/Login/Login';

import Signup_EnterEmail from './SRC/Screens/LoginSignup/Signup/Signup_EnterEmail';
import Signup_EnterVerificationCode from './SRC/Screens/LoginSignup/Signup/Signup_EnterVerificationCode';
import Signup_ChooseUsername from './SRC/Screens/LoginSignup/Signup/Signup_ChooseUsername';
import Signup_ChoosePassword from './SRC/Screens/LoginSignup/Signup/Signup_ChoosePassword';
import Signup_AccountCreated from './SRC/Screens/LoginSignup/Signup/Signup_AccountCreated';

import ForgotPassword_EnterEmail from './SRC/Screens/LoginSignup/ForgotPassword/ForgotPassword_EnterEmail';
import ForgotPassword_EnterVerificationCode from './SRC/Screens/LoginSignup/ForgotPassword/ForgotPassword_EnterVerificationCode';
import ForgotPassword_ChoosePassword from './SRC/Screens/LoginSignup/ForgotPassword/ForgotPassword_ChoosePassword';
import ForgotPassword_AccountRecovered from './SRC/Screens/LoginSignup/ForgotPassword/ForgotPassword_AccountRecovered';

import MainPage from './SRC/Screens/Mainpage/MainPage';
import Guidelines from './SRC/Screens/Guidelines/Guidelines';
import LeaderBoard from './SRC/Screens/LeaderBoard/LeaderBoard';
import Feedback from './SRC/Screens/Feedback/Feedback';
import SearchUserPage from './SRC/Screens/Mainpage/SearchUserPage';

import My_UserProfile from './SRC/Screens/Profile/My_UserProfile';
import Settings from './SRC/Screens/Settings/Settings';
import EditProfile from './SRC/Screens/Settings/EditProfile';
import ChangePassword from './SRC/Screens/Settings/ChangePassword';
import UploadProfilePicture from './SRC/Screens/Settings/UploadProfilePicture';
import ChangeUsername from './SRC/Screens/Settings/ChangeUsername';
import ChangeDescription from './SRC/Screens/Settings/ChangeDescription';

import AddBookPost from './SRC/Screens/Mainpage/AddBookPost';
import Other_UserProfile from './SRC/Screens/Profile/Other_UserProfile';
import BookOrMovie from './SRC/Screens/Mainpage/BookOrMovie';
import AddMoviePost from './SRC/Screens/Mainpage/AddMoviePost';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
        animation: 'slide_from_right'
      }}>
        
        <Stack.Screen name="MainPage" component={MainPage} />

        <Stack.Screen name="Login" component={Login} />

        <Stack.Screen name="Signup_EnterEmail" component={Signup_EnterEmail} />
        <Stack.Screen name="Signup_EnterVerificationCode" component={Signup_EnterVerificationCode} />
        <Stack.Screen name="Signup_ChooseUsername" component={Signup_ChooseUsername} />
        <Stack.Screen name="Signup_ChoosePassword" component={Signup_ChoosePassword} />
        <Stack.Screen name="Signup_AccountCreated" component={Signup_AccountCreated} />


        <Stack.Screen name="ForgotPassword_EnterEmail" component={ForgotPassword_EnterEmail} />
        <Stack.Screen name="ForgotPassword_EnterVerificationCode" component={ForgotPassword_EnterVerificationCode} />
        <Stack.Screen name="ForgotPassword_ChoosePassword" component={ForgotPassword_ChoosePassword} />
        <Stack.Screen name="ForgotPassword_AccountRecovered" component={ForgotPassword_AccountRecovered} />

        <Stack.Screen name="Guidelines" component={Guidelines} />
        <Stack.Screen name="LeaderBoard" component={LeaderBoard} />
        <Stack.Screen name="Feedback" component={Feedback} />

        <Stack.Screen name="My_UserProfile" component={My_UserProfile} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name='UploadProfilePicture' component={UploadProfilePicture} />
        <Stack.Screen name="ChangeUsername" component={ChangeUsername} />
        <Stack.Screen name="ChangeDescription" component={ChangeDescription} />

        <Stack.Screen name='AddBookPost' component={AddBookPost} />
        <Stack.Screen name='AddMoviePost' component={AddMoviePost} />
        <Stack.Screen name='BookOrMovie' component={BookOrMovie} />
        <Stack.Screen name="Other_UserProfile" component={Other_UserProfile} />
        <Stack.Screen name="SearchUserPage" component={SearchUserPage}
          options={{
            animation: 'slide_from_bottom'
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
