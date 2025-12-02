import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Determine the host based on the platform
// For real device: Use your PC's IP address
// For emulator: Use 10.0.2.2 (Android emulator) or localhost (iOS simulator)
const getReactotronHost = () => {
    if (__DEV__) {
        if (Platform.OS === 'android') {
            // Your PC's local IP address from ipconfig
            return '10.120.190.100';
        }
        return 'localhost'; // For iOS simulator
    }
    return 'localhost';
};

const reactotron = Reactotron
    .setAsyncStorageHandler(AsyncStorage)
    .configure({
        name: 'JavaMiFi App',
        host: getReactotronHost(),
    })
    .useReactNative()
    .use(reactotronRedux())
    .connect();

export default reactotron;