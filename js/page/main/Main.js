import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class Main extends React.Component {
    render() {
        return <SafeAreaView>
            <Text style={{padding: 15}} onPress={()=>{
                Actions.web();
            }}>点击跳转下一页..哈哈</Text>
        </SafeAreaView>;
    }
}
