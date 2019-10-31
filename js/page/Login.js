import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class Login extends React.Component {
    render() {
        return <SafeAreaView>
            <Text style={{padding: 15}} onPress={() => {
                Actions.register();
            }}>点击去注册页面。。</Text></SafeAreaView>;
    }
}
