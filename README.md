# publicjar

相关命令
yarn add xxx
yarn install
node install

启动命令
react-native run-ios
react-native run-android
react-native start

android 打包命令
cd android //进入到android项目目录
./gradlew clean //先清除打包缓存
./gradlew assembleDebug //打debug环境apk
./gradlew assembleRelease //打release环境apk

相关注意
Android SDK路径要调整，最好使用Androidstudio加载一次；然后运行

过时的生命周期，重命名
npx react-codemod rename-unsafe-lifecycles



