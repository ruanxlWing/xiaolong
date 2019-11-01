import React from 'react';
import {DeviceEventEmitter, SafeAreaView, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class Main extends React.Component {
    render() {
        return <SafeAreaView>
            <Text style={{padding: 15}} onPress={() => {
                Actions.web();
            }}>点击跳转下一页..哈哈</Text>
            <Text style={{padding: 15}} onPress={() => {
                DeviceEventEmitter.emit('message', {msg:"内容"});
            }}>消息提醒</Text>
        </SafeAreaView>;
    }
}
