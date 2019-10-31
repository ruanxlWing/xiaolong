import React from 'react';
import {SafeAreaView,Text} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class WebPage extends React.Component {
    render() {
        return <SafeAreaView>
<Text style={{padding:15}} onPress={()=>{
    Actions.loginPage()
}}>点击去登录哈。。</Text>
        </SafeAreaView>;
    }
}
