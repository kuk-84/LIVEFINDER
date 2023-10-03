import React from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

const data1 = [
    {
        id: '1224',
        title: 'Roadways',
        image: require('../assets/car.png'),
        screen: 'MapScreen'
    },
    {
        id: '4354',
        title: 'Railways',
        image: require('../assets/train.png'),
        screen: 'EatsScreen'
    },
]

const NavOptions = () => {
    const navigation = useNavigation()
    return (
        <FlatList
            data={data1}
            renderItem={({ item }) => (
                <TouchableOpacity 
                    style={tw`p-2 pl-6 pb-6 pt-4 bg-pink-200 mr-4 w-40 rounded-lg`}
                    onPress={() => navigation.push(item.screen)}
                >
                    <View>
                        <Image 
                                source={item.image}
                                style={styles.image}
                            />
                        <View style={tw`flex-row items-center mt-3`}>
                            <Text style={tw`text-lg font-bold text-black`}>{item.title}</Text>
                            <Icon 
                                type="antdesign"
                                name="arrowright"
                                color="black"
                                size={22}
                                style={tw`ml-2`}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()}
            horizontal
            
      />
      
    )
}

export default NavOptions

const styles = StyleSheet.create({
    image: {
        width: 120,
        height: 200,
        resizeMode: 'contain'
    }
})
