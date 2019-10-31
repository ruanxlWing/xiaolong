module.exports = {
    m(msg) {
        if (msg != undefined) {
            console.log(msg);
        } else {
            console.log('数据是空');
        }
    },
    e(msg){
        if (msg != undefined) {
            console.error(msg);
        } else {
            console.error('数据是空');
        }
    }
};
