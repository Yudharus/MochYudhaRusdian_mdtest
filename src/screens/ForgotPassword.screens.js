import React, { useEffect, useState } from 'react'
import { TextInput, TouchableOpacity, Dimensions, ActivityIndicator, ImageBackground } from 'react-native'
import Tailwind from '../libs/tailwind/Tailwind.lib'
import auth from '@react-native-firebase/auth';
import Text from '../components/atom/Text.atom'
import View from '../components/atom/View.atom'
import Image from '../components/atom/Image.atom';



const ForgotPassword = () => {
    const height = Dimensions.get('window').height
    const width = Dimensions.get('window').width
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [msg, setMsg] = useState("")
    const [isError, setIsError] = useState(false)

    const forgotPasswordAuth = () => {
        setIsLoading(true)
        auth().sendPasswordResetEmail(email)
            .then(function (user) {
                setMsg("Silakan periksa email anda")
                setIsLoading(false)
                setIsError(false)
            }).catch(function (e) {
                console.log(e)
                setIsLoading(false)
                setIsError(true)
                setMsg("Terjadi kesalahan")
            })
    }

    return (
        <View className="flex-1 ">
            <ImageBackground source={require("../assets/background-dark.png")} style={Tailwind`w-full h-full`} resizeMethod='resize' resizeMode='cover'>
                <View className="items-center justify-center px-14 h-full">
                    <Text className="font-medium text-2xl text-white mb-6">Forgot Password</Text>
                    <View className={`bg-black-2 w-full h-[50px] rounded-md border border-gray--primary shadow-lg shadow-black-2 mb-4 px-4 py-2 flex flex-row items-center`}>
                        <Image source={require('../assets/user.png')} className="w-[13px] h-[18px] mr-2" />
                        <TextInput style={Tailwind`h-9 w-${width * 0.13} text-white`} placeholder='Email' placeholderTextColor={"#636D73"} value={email} onChangeText={v => setEmail(v)} keyboardType='email-address' />
                    </View>
                    <TouchableOpacity style={Tailwind`w-full h-[50px] bg-blue--primary rounded-full items-center justify-center`} onPress={() => forgotPasswordAuth()}>
                        {
                            isLoading == true ?
                                <View className="flex flex-row items-center justify-center">
                                    <Text className="font-medium text-sm text-white mr-4">Send Email</Text>
                                    <ActivityIndicator size="small" color={"#52C5F3"} />
                                </View> :
                                <Text className="font-medium text-sm text-white">Send Email</Text>
                        }
                    </TouchableOpacity>
                    <Text className="font-medium text-sm text-red--primary mt-2">{msg}</Text>
                    <Text className="absolute bottom-20 font-medium text-[10px] text-gray--primary">Moch Yudha Rusdian</Text>
                </View>
            </ImageBackground>
        </View>
    )
}

export default ForgotPassword
