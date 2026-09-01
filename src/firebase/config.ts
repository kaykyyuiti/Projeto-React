import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAut-1id339WgGxoQoSgIYncgrAIe4LJxE",
  authDomain: "techcall-cti.firebaseapp.com",
  projectId: "techcall-cti",
  storageBucket: "techcall-cti.firebasestorage.app",
  messagingSenderId: "990410529837",
  appId: "1:990410529837:web:39ba8d07b39cac85c56ca4"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Substiua '123456' pelo seu número de RA real
export const ALUNO_ID = 'RA2457026';