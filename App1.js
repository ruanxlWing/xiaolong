import React from 'react';

import {Easing, StyleSheet,Animated} from 'react-native';
import {Lightbox, Modal, Overlay, Router, Scene, Stack, Tabs} from 'react-native-router-flux';
import Mine from './js/page/main/Mine';
import Main from './js/page/main/Main';
import TabIcon from './js/component/TabIcon';
import WebPage from './js/page/main/WebPage';
import ErrorModal from './js/page/ErrorModal';
import Login from './js/page/Login';
import Register from './js/page/Register';

export default class App1 extends React.Component {
    render() {
        return <Router onStateChange={stateHandler} sceneStyle={styles.scene} uriPrefix={prefix}>
            <Overlay key="overlay">
                <Modal key="modal" hideNavBar transitionConfig={this.anim}>
                    <Lightbox key="lightbox">
                        <Stack key="root" titleStyle={{alignSelf: 'center'}} hideNavBar  transitionConfig={this.anim}>
                            <Scene tabBarPosition="bottom" key="home" hideNavBar initial={false} transitionConfig={this.anim}>
                                <Tabs key="tabbar" swipeEnabled={true} showLabel={false}
                                      tabBarStyle={[styles.tabBarStyle, {backgroundColor: '#fff'}]}>
                                    <Scene key="main" component={Main} title="首页" hideNavBar icon={TabIcon}/>
                                    <Scene key="mine" component={Mine} title="我的" hideNavBar icon={TabIcon}/>
                                </Tabs>
                                <Scene key="web" component={WebPage} title="网页" hideNavBar={false}/>
                            </Scene>
                            <Scene key='loginPage' title='' hideNavBar>
                                <Scene key="login" component={Login} title="登录"  />
                                <Scene key="register" component={Register} title="注册"  />
                            </Scene>
                        </Stack>

                    </Lightbox>
                    <Scene key="error" component={ErrorModal}/>
                </Modal>
            </Overlay>
        </Router>;
    }
    /**动画效果*/
    anim = () => ({
        transitionSpec: {
            duration: 500,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
        },
        screenInterpolator: sceneProps => {
            const {layout, position, scene} = sceneProps;
            const {index} = scene;
            const Width = layout.initWidth;
            //沿X轴平移
            const translateX = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [Width, 0, -(Width - 10)],
            });
            //透明度
            const opacity = position.interpolate({
                inputRange: [index - 1, index - 0.99, index],
                outputRange: [0, 1, 1],
            });
            return {opacity, transform: [{translateX}]};
        }
    });
}


const prefix = Platform.OS === 'android' ? 'wkmall://wkmall/' : 'wkmall://';

const stateHandler = (prevState, newState, action) => {
    console.log('onStateChange: ACTION:', action);
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scene: {
        backgroundColor: '#F5FCFF',
        shadowOpacity: 1,
        shadowRadius: 3,
    },
    tabBarStyle: {
        backgroundColor: '#eee',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#ddd',
    },
});
