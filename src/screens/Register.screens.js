import React, { useEffect, useState } from 'react'
import { TextInput, TouchableOpacity, Dimensions, ActivityIndicator, ImageBackground } from 'react-native'
import Tailwind from '../libs/tailwind/Tailwind.lib'
import auth from '@react-native-firebase/auth';
import Text from '../components/atom/Text.atom'
import View from '../components/atom/View.atom'
import Image from '../components/atom/Image.atom';

const Register = ({ navigation }) => {
    const height = Dimensions.get('window').height
    const width = Dimensions.get('window').width
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [errMsg, setErrMsg] = useState("")

    const verifyEmail = async () => {
        const user = auth().currentUser;

        if (user) {
            user.sendEmailVerification()
                .then(() => {
                    console.log('Verification email sent');
                })
                .catch(error => {
                    console.error('Error sending verification email', error);
                });
        }
        console.log(user)
    }

    const registerAuth = () => {
        setIsLoading(true)
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                verifyEmail()
                setIsLoading(false)
                navigation.replace("Login")
                setErrMsg("");
                console.log('User account created & signed in!');
            })
            .catch(error => {
                setIsLoading(false)
                if (error.code === 'auth/email-already-in-use') {
                    setErrMsg("That email address is already in use!");
                }

                if (error.code === 'auth/invalid-email') {
                    setErrMsg("That email address is invalid!");
                }

                console.error(error);
            });
    }

    return (
        <View className="flex-1 ">
            <ImageBackground source={require("../assets/background-dark.png")} style={Tailwind`w-full h-full`} resizeMethod='resize' resizeMode='cover'>
                <View className="items-center justify-center px-14 h-full">
                    <View className={`bg-black-2 w-full h-[50px] rounded-md border border-gray--primary shadow-lg shadow-black-2 px-4 py-2 flex flex-row items-center`}>
                        <Image source={require('../assets/user.png')} className="w-[13px] h-[18px] mr-2" />
                        <TextInput style={Tailwind`h-9 w-${width * 0.13} text-white`} placeholder='Email' placeholderTextColor={"#636D73"} value={email} onChangeText={v => setEmail(v)} keyboardType='email-address' />
                    </View>
                    <View className="bg-black-2 w-full h-[50px] rounded-md border border-gray--primary shadow-lg shadow-black-2 px-4 py-2 mt-4 mb-6 flex flex-row items-center">
                        <Image source={require('../assets/password.png')} className="w-[13px] h-[18px] mr-2" />
                        <TextInput style={Tailwind`h-9 w-${width * 0.13} text-white`} placeholder='Password' placeholderTextColor={"#636D73"} secureTextEntry value={password} onChangeText={v => setPassword(v)} />
                    </View>
                    <TouchableOpacity style={Tailwind`w-full h-[50px] bg-blue--primary rounded-full items-center justify-center`} onPress={() => registerAuth()}>
                        {
                            isLoading == true ?
                                <View className="flex flex-row items-center justify-center">
                                    <Text className="font-medium text-sm text-white mr-4">Register</Text>
                                    <ActivityIndicator size="small" color={"#52C5F3"} />
                                </View> :
                                <Text className="font-medium text-sm text-white">Register</Text>
                        }
                    </TouchableOpacity>
                    {
                        errMsg !== "" ?
                            <Text className="font-medium text-sm text-red--primary mt-2">{errMsg}</Text> :
                            null
                    }
                    <Text className="absolute bottom-20 font-medium text-[10px] text-gray--primary">Moch Yudha Rusdian</Text>
                </View>
            </ImageBackground>
        </View>
    )
}

export default Register
