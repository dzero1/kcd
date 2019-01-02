
mode="android";
if [ -z "$1" ]
then
    mode="android";
else
    mode=$1;
fi

releaseName="Side-Dish"

if [ "$mode" = "android" ]
then
    #rel='platforms/android/app/build/outputs/apk/release'
    #relfile='app-release-unsigned.apk'
    rel='platforms/android/build/outputs/apk/release'
    relfile='android-release-unsigned.apk';

    rm $rel/$releaseName.apk
    rm $rel/android-release-unsigned.apk
    #rm platforms/* -rf
    #ionic cordova platform add android@6.4.0
fi

echo -e "\e[44m\e[1;97m   building - $env [$mode]   \e[0m"

cordova clean $mode
ionic cordova build $mode --prod --release --verbose --target=production --minifycss --minifyjs --optimizejs

if [ "$mode" = "android" ]
then

    #keytool -genkey -v -keystore release-key.keystore -alias dzero -keyalg RSA -keysize 2048 -validity 10000 -deststoretype pkcs12

    jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore release-key.keystore -storetype pkcs12 -storepass Fw85HBcN -keypass Fw85HBcN -tsa http://timestamp.digicert.com $rel/$relfile dzero

    zipalign -v 4 $rel/$relfile $rel/$releaseName.apk

    echo $rel/$releaseName.apk

    #keytool -exportcert -keystore release-key.keystore -list -v -alias dzero

    #if [ -z "$2" ] then
    #else
        #adb install $rel/$releaseName.apk
    #if

    #cordova plugin add cordova-plugin-crosswalk-webview --variable XWALK_MODE="embedded" --variable XWALK_MULTIPLEAPK="false" --variable XWALK_VERSION="23+" --variable XWALK_LITEVERSION="xwalk_core_library_canary:17+" --variable XWALK_COMMANDLINE="--disable-pull-to-refresh-effect"
#else
    #export APP_ENV=$env && ionic cordova build $mode --release --$env --verbose --target=production
fi