import React from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  AsyncStorage,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';

import axios from 'axios';


//import { Card } from 'react-native-elements';

//Hi monghol!!!

import { checkLogin, doLogin, doLogout } from './internet';

const current = '';

export default class App extends React.Component {
  constructor() {
    super()

    this.state = {
      nameValue: '',
      secretValue: '',
      isLoggedIn: false,
      loading: false,
    };
  }

  async storeUsername(username) {
      await AsyncStorage.setItem('username', username);
  }

  async storePassword(password) {
    await AsyncStorage.setItem('password', password);
  }

  async getUsername() {
    try {
      let token = await AsyncStorage.getItem('username');
      return token;
    }
    catch (error){
      Alert.alert(error);
    }
  }

  async getPassword() {
    try {
      let token = await AsyncStorage.getItem('password');
      return token;
    }
    catch (error){
      Alert.alert(error);
    }
  }

  _handleNameChange = nameValue => {
    this.setState({ nameValue });
  };
  
  _handleSecretChange = secretValue => {
    this.setState({ secretValue });
  };

  _handleLoginPress = async () => {
    this.setState({isLoading: true});
    try {
      const username = this.state.nameValue;
      const password = this.state.secretValue;

      const login = await doLogin(username, password);
      if (login) {}
      else {
        Alert.alert("Logout failed!")
      }

      await this.storeUsername(username);
      await this.storePassword(password);
      this.setState({ isLoggedIn: login });

    }
    catch (e) {
      console.log(e + '');
    }
  };
  
  _handleLogoutPress = async () => {
    try {
      
      const logout = await doLogout();

      this.setState({ isLoggedIn: logout });
      this.setState({isLoading: false});

      if (logout) {
        Alert.alert("Logout failed!");
      }
      else {
        Alert.alert("Logout successfull!");
      }

    }
    catch (e) {
      console.log(e + '');
    }
  };
  async componentWillMount() {
    const user = await this.getUsername();
    const pass = await this.getPassword();
    this.setState({nameValue: user, secretValue: pass});
  }

  async componentDidMount() {
    const success = await checkLogin();
    this.setState({ isLoggedIn: success });
  }

  render(state) {


    if (this.state.isLoggedIn) {
      return  (
      <View style={styles.container}>
        <Text>سلام خوش آمدید.</Text>
        <TouchableOpacity 
            onPress={() => this._handleLogoutPress()}
            style={{marginBottom: 30}}
        >
        <ImageBackground style={[styles.button, {marginTop: 30}]} source={require("./assets/logout.png")}>
        <Text>
          خروج
        </Text>
        </ImageBackground>
        </TouchableOpacity>
      </View>
      )
    }

    else {

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
          <TextInput
            value={this.state.nameValue}
            onChangeText={this._handleNameChange}
            style={{ width: 200, height: 44, padding: 8, textAlign :'center', marginBottom:10 }}
            placeholder= 'ایمیل'
            placeholderTextColo='#bababa'
          />

          <TextInput
            value={this.state.secretValue}
            onChangeText={this._handleSecretChange}
            style={{ width: 200, height: 44, padding: 8, textAlign :'center', marginTop:10, marginBottom:20 }}
            secureTextEntry={true}
            placeholder='رمز ورود'
            placeholderTextColo='#bababa'
          />
                      
            <TouchableOpacity style={styles.button}
						  onPress={() => this._handleLoginPress()}
						  activeOpacity={1} >
              {this.state.isLoading ?
                <Image style={{flex:1}} source={require("./assets/loading3.gif")}/>
                :
                <ImageBackground style={styles.button} source={require("./assets/login.png")}>
								<Text>ورود</Text>
                </ImageBackground>
							}
					</TouchableOpacity>
      </View>
    );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
		justifyContent: 'center',
    zIndex: 100,
    height: 37.5,
    width: 75,
  }
});


/*

<Container>
          <Button rounded bordered
            onPress={() => this._handleLoginPress()}
            style={{ marginTop:20, width: 50, height: 30, alignItems: 'center' }}
          >
          <Text
          style={{marginLeft: 11, marginBottom: 3}}
          >
          ورود
          </Text>
          </Button>
          </Container>
          


          <TouchableOpacity style={styles.button}
						onPress={() => this._handleLoginPress()}
						activeOpacity={1} >
							{this.state.isLoading ?
								<Text>Loading...</Text>
								:
								<Text>LOGIN</Text>
							}
					</TouchableOpacity>
*/