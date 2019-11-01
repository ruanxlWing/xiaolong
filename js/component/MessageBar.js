import React from 'react';
import DropdownAlert from 'react-native-dropdownalert';
import {DeviceEventEmitter} from 'react-native';
import Src from '../constants/Src';

export default class extends React.Component {
    componentDidMount() {
        this.msgNotice = DeviceEventEmitter.addListener('message', (data) => {
            this.dropDownAlertRef.alertWithType('success', data.title, data.msg,undefined,1000);
        });
    }

    componentWillUnmount() {
        this.msgNotice.remove();
    }

    render() {
        return <DropdownAlert ref={ref => this.dropDownAlertRef = ref}
                              successImageSrc={Src.tab_down1}
        />;
    }
}
