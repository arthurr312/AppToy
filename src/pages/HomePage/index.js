import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import {UserContext} from '../../context/User'

export default function Homepage() {
    const { user } = useContext(UserContext);
    return (
    <View>
        <Text style={{color: 'black'}}>{user ? `Olá, ${user.username}` : `Olá, stranger`}</Text>
        <Text style={{color: 'black'}}>{user ? `Olá, ${user.password}` : `Olá, stranger`}</Text>

    </View>
    );
}