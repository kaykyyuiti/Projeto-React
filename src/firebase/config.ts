import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
<<<<<<< HEAD
  apiKey: "AIzaSyAut-1id339WgGxoQoSgIYncgrAIe4LJxE",
  authDomain: "techcall-cti.firebaseapp.com",
  projectId: "techcall-cti",
  storageBucket: "techcall-cti.firebasestorage.app",
  messagingSenderId: "990410529837",
  appId: "1:990410529837:web:39ba8d07b39cac85c56ca4"
=======
  apiKey: "AIzaSyBlxN5obzzkK98Rg7NmTO1EFXa-6t5Qz60",
  authDomain: "techcall3-99ef9.firebaseapp.com",
  projectId: "techcall3-99ef9",
  storageBucket: "techcall3-99ef9.firebasestorage.app",
  messagingSenderId: "127162678608",
  appId: "1:127162678608:web:502faafe6b70d62f43c055"
>>>>>>> edac5ec (SLA)
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Substiua '123456' pelo seu número de RA real
export const ALUNO_ID = 'RA2457026';