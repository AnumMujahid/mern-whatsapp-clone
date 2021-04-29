import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCZqEnDrLVkQoqV_cRNVoVb4-aRXRRzDmg',
  authDomain: 'whatsapp-clone-by-anum.firebaseapp.com',
  projectId: 'whatsapp-clone-by-anum',
  storageBucket: 'whatsapp-clone-by-anum.appspot.com',
  messagingSenderId: '429783564396',
  appId: '1:429783564396:web:728cff0e96a1114a961849',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
