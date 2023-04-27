import { Text } from 'react-native'
export default function TextUtga(props) {
    return (<Text {...props}>
        {props.children}
    </Text>)
}