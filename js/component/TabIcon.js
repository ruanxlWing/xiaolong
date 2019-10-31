import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Src from '../constants/Src';


const TabIcon = (props) => {
    return <View style={styles.container}>
        <Image source={image(props)} style={styles.icon}></Image>
        <Text style={{color: props.focused ? '#0099FF' : '#333', fontSize: 11}}
        >{props.title}
        </Text>
    </View>;
};

/**图片选择*/
const image = (props) => {
    if (props.title == '首页') {
        return props.focused ? Src.tab_down1 : Src.tab_up1;
    } else if (props.title == '消息') {
        return props.focused ? Src.tab_down1 : Src.tab_up1;
    } else if (props.title == '资讯') {
        return props.focused ? Src.tab_down1 : Src.tab_up1;
    } else if (props.title == '我的') {
        return props.focused ? Src.tab_down4 : Src.tab_up4;
    }
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    icon: {
        width: 25,
        resizeMode: 'stretch',
        marginBottom: 5,
        height: 25,
    },
});
export default TabIcon;
