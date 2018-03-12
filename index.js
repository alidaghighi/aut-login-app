import { AppRegistry } from 'react-native';
import App from './App';
import codePush from "react-native-code-push";

AppRegistry.registerComponent('login', () => App);

class MyApp extends Component {
}

MyApp = codePush(MyApp);