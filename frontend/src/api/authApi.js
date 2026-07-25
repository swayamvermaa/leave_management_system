import { auth } from "../firebase/firebase";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  reload
} from "firebase/auth";

import API from "./axios";


// ==========================================
// REGISTER API
// ==========================================

export const registerUser = (data) => {
  return API.post("/auth/register", data);
};


// ==========================================
// FIREBASE SIGNUP
// ==========================================

export const firebaseSignup = async (
  email,
  password
) => {

  const userCredential =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  await sendEmailVerification(
    userCredential.user
  );

  return userCredential.user;
};


// ==========================================
// FIREBASE LOGIN
// ==========================================

export const firebaseLogin = async (
  email,
  password
) => {

  const userCredential =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  await reload(userCredential.user);

  return userCredential.user;
};


// ==========================================
// EMAIL VERIFICATION
// ==========================================

export const checkEmailVerification =
  async () => {

    if (!auth.currentUser) {
      return false;
    }

    await reload(auth.currentUser);

    return auth.currentUser.emailVerified;
  };


// ==========================================
// FORGOT PASSWORD
// ==========================================

export const firebaseForgotPassword = (
  email
) => {

  return sendPasswordResetEmail(
    auth,
    email
  );
};


// ==========================================
// LOGOUT
// ==========================================

export const firebaseLogout = () => {

  return signOut(auth);

};  