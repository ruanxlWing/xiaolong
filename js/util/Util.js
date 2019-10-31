import Dimensions from 'Dimensions';
import React, {PixelRatio, Platform} from 'react-native';
import * as Log from './Log';

module.exports = {
    /*最小线宽*/
    pixel: 1 / PixelRatio.get(),
    isIos: Platform.OS == 'ios',
    /*屏幕尺寸*/
    size: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    /**得到整数*/
    getInt(distance) {
        if (distance != '' && distance != undefined) {
            try {
                return parseInt(distance);
            } catch (error) {
                return 0;
            }
        }
        return -1;
    },
    /**时间戳转时间*/
    longToTime(num) {
        if (num != undefined && num != 0) {
            var date = new Date(parseInt(num));
            var Y = date.getFullYear() + '-';
            var M =
                (date.getMonth() + 1 < 10
                    ? '0' + (date.getMonth() + 1)
                    : date.getMonth() + 1) + '-';
            var D =
                (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
            var h =
                (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var m =
                (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
                '';
            var s =
                date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            return Y + M + D + h + m;
        }
        return '';
    },
    /**判断是不是空,名字写错了，之后使用这个方法*/
    isNotEmpty(value) {
        if (value == undefined || value == null || value == '' || value == 'null') {
            return false;
        } else {
            var regu = '^[ ]+$'; //判断空格
            var re = new RegExp(regu);
            return !re.test(value);
        }
        return true;
    },
    /**
     * 基于fetch的get方法
     * @method post
     * @param {string} url
     * @param {function} successCallback 请求成功回调
     * @param {function} failCallback 请求失败回调
     */
    get: function (url, params, successCallback, failCallback) {
        if (params) {
            let paramsArray = []; //拼接参数
            Object.keys(params).forEach(key =>
                paramsArray.push(key + '=' + params[key]),
            );
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&');
            } else {
                url += '&' + paramsArray.join('&');
            }
        }
        console.log('请求:' + url);
        fetch(url, {method: 'GET', headers: {token: ""}})
            .then(response => response.text())
            .then(responseText => {
                console.log('responseText=' + responseText);
                try {
                    let result = JSON.parse(responseText);
                    successCallback(result);
                } catch (err) {
                    Log.m('err=' + err);
                    failCallback('找不到服务器君');
                }
            })
            .catch(function (err) {
                failCallback(err);
            });
    },

    /**
     * 基于fetch的post方法
     * @method post
     * @param {string} url
     * @param {string} body

     普通表单提交
     *  let formData = new FormData();
     formData.append("name","admin");
     formData.append("password","admin123");

     图片
     'Content-Type':'multipart/form-data',
     let file = {uri: uri, type: 'multipart/form-data', name: 'a.jpg'};
     formData.append("images",file);

     * @param {function} successCallback 请求成功回调
     * @param {function} failCallback 请求失败回调
     */
    post: function (url, formData, successCallback, failCallback) {
        var formDataMap = new FormData();
        var params = `${url}?token=${_token.t}&`;
        if (formData) {
            Object.keys(formData).forEach((key) => {
                formDataMap.append(key, formData[key]);
                params = params + key + '=' + formData[key] + '&';
            });
        } else {
            formDataMap.append('token', _token.t);
        }
        Log.m('请求:' + params);
        fetch(url, {
            method: 'POST',
            headers: {
                token: _token.t,
            },
            body: formDataMap,
        })
            .then(function (response) {
                if (response.status == 200) {
                    return response.text();
                } else {
                    throw new Error('服务器当掉了，运维人员');
                }
            })
            .then(function (response) {
                Log.m('response:' + response);
                let data = JSON.parse(response);
                if (data.code == 200) {
                    if (successCallback) {
                        successCallback(data.data);
                    }
                } else {
                    if (failCallback) {
                        failCallback(data.msg);
                    }
                }
            })
            .catch(function (error) {
                Log.e('err:' + error);
                if (failCallback) {
                    failCallback(err);
                }
            });
    },
    /**上传文件*/
    upload: function (url, filePath, successCallback, failCallback) {
        let formData = new FormData();
        let file = {
            uri: filePath,
            type: 'multipart/form-data',
            name: 'image.png',
        };
        formData.append('file', file);
        Log.m(file);
        /**上传*/
        fetch(url, {
            method: 'POST',
            headers: {
                Authorization: _token.t,
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        })
            .then(function (response) {
                if (response.status == 200) {
                    return response.text();
                } else {
                    failCallback('请稍后请求');
                }
            })
            .then(function (response) {
                try {
                    console.log(response);
                    let data = JSON.parse(response);
                    if (data.code = 200) {
                        successCallback(data.data);
                    } else {
                        failCallback(data.msg);
                    }

                } catch (e) {
                    failCallback('请稍后请求');
                }
            })
            .catch(function (error) {
                console.e(error);
                failCallback(error);
            });
    },
};
