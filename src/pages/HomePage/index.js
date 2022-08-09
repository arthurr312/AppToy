import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import {UserContext} from '../../context/User'

export default function Homepage() {
    const { user } = useContext(UserContext);
    return (
    <View>
        <Text>{user ? `Olá, ${user.username}` : `Olá, stranger`}</Text>
        <Text>{user ? `Olá, ${user.password}` : `Olá, stranger`}</Text>

    </View>
    );
}