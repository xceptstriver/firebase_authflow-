import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  const register = async () => {
    try {
      let userData = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async () => {
    try {
      let data = await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.log(error);
    }
  };

  // Handle user state changes
  const onAuthStateChanged = user => {
    setUser(user);
    console.log('bakchodi');
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  if (initializing) return null;

  if (!user) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <TextInput
          value={email}
          onChangeText={text => setEmail(text)}
          style={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            color: '#000',
          }}
          placeholder={'Enter Email'}
          placeholderTextColor={'#000'}
        />
        <TextInput
          value={password}
          onChangeText={text => setPassword(text)}
          style={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            color: '#000',
          }}
          placeholder={'Enter Password'}
          placeholderTextColor={'#000'}
        />
        <TouchableOpacity
          onPress={() => register()}
          style={{
            backgroundColor: '#0000FF',
            height: 40,
            width: 80,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#fff', fontSize: 16, fontWeight: '700'}}>
            SIGN UP
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => signIn()}
          style={{
            backgroundColor: '#0000FF',
            height: 40,
            width: 80,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text style={{color: '#fff', fontSize: 16, fontWeight: '700'}}>
            SIGN IN
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Text>Welcome {user.email}</Text>
      <TouchableOpacity
        onPress={() => logOut()}
        style={{
          backgroundColor: '#0000FF',
          height: 40,
          width: 80,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <Text style={{color: '#fff', fontSize: 16, fontWeight: '700'}}>
          LogOut
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
