import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const reactotron = Reactotron
    .setAsyncStorageHandler(AsyncStorage)
    .configure({
        name: 'JavaMiFi App',
        // host: '10.0.2.2', // Optional: Use this if adb reverse doesn't work
    })
    .useReactNative()
    .use(reactotronRedux())
    .connect();

export default reactotron;