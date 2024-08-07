import React, { useEffect, useState } from 'react'
import View from '../components/atom/View.atom'
import Text from '../components/atom/Text.atom'
import { getFirestore } from '@react-native-firebase/firestore';
import { FlatList, TextInput } from 'react-native';
import Tailwind from '../libs/tailwind/Tailwind.lib';


const Home = () => {
    const [dataUser, setDataUser] = useState([])

    useEffect(() => {

        const fetchDataFirestore = async () => {
            try {

                const users = await getFirestore().collection('users').get();
                setDataUser(users._docs)
            } catch (error) {
                console.log("===", error)

            }
        }

        fetchDataFirestore()
    }, [])

    return (
        <View className="flex-1 bg-gray--2 px-5 py-4">
            <View className="flex-row w-full rounded-md border border-gray px-3">
                <TextInput style={Tailwind`w-full font-normal text-black`} placeholder='search something...' placeholderTextColor={"#BDBDBD"} />
            </View>
            <View>
                <Text className="font-bold text-lg text-black mt-2">List User :</Text>
                <FlatList
                    data={dataUser}
                    renderItem={({ item }) => (
                        <View className="mb-2">
                            <Text className="font-semibold text-base text-black--primary mt-2">{item._data.name}</Text>
                            <Text className="font-semibold text-base text-black--primary mt-2">{item._data.email}</Text>
                            <Text className="font-semibold text-base text-black--primary mt-2">Email Verified : {item._data.is_verified.toString()}</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

export default Home