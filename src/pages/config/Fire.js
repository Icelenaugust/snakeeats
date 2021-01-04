import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyA67SvEOgHoiv4M8Yc8FmM6K-MkIffgKoI",
    authDomain: "snakeit-2827f.firebaseapp.com",
    projectId: "snakeit-2827f",
    storageBucket: "snakeit-2827f.appspot.com",
    messagingSenderId: "357715614229",
    appId: "1:357715614229:web:c3771de2ec2aefa586cc1c",
    measurementId: "G-QRZFKXS3X0",
    databaseURL: "https://snakeit-2827f-default-rtdb.firebaseio.com",
    
};


const fire = firebase.initializeApp(config);

export default fire;
