import React, { useContext } from 'react';
import { View } from 'react-native';
import { UserContext } from '../../context/User.js'

export default function Homepage() {
    const { userName } = useContext(UserContext);
    return (
    <View>
        <Text>{userName ? `Olá, ${userName}!` : 'Olá!'}</Text>
    </View>
    );
}