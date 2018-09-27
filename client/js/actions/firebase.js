import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

const lan_ip = process.env.LOCAL_IP_ADDRESS;
const API_KEY = process.env.FIREBASE_API_KEY;
const config = {
    apiKey: API_KEY,
    authDomain: 'http://'+lan_ip,
    databaseURL: 'https://lan-manager-firebase.firebaseio.com/',
    storageBucket: '',
    messagingSenderId: ''
};

firebase.initializeApp(config);

const database = firebase.database();

export default database
