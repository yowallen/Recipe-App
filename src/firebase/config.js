import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqkjxRRK9G5sdqNARkrgUkvJNPfMERM80",
  authDomain: "kitchenomics-recipe-app.firebaseapp.com",
  projectId: "kitchenomics-recipe-app",
  storageBucket: "kitchenomics-recipe-app.appspot.com",
  messagingSenderId: "741454565627",
  appId: "1:741454565627:web:10675d991a76f244d7205e",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
export const projectFirestore = firebase.firestore();
