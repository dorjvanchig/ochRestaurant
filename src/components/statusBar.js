import { View, StatusBar } from 'react-native';
import { useSafeAreaInsets} from 'react-native-safe-area-context';

function CustomStatusBar(props) {
    const insets = useSafeAreaInsets();
     return (
        <View style={{ height: insets.top, backgroundColor:"white"}}>
            <StatusBar
              animated={true} 
              {...props} />
        </View>
     );
} 

  export default CustomStatusBar