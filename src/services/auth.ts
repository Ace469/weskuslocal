import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  signInWithPopup,
  FacebookAuthProvider,
} from 'firebase/auth';
import { auth } from './firebase';
import type { LoginCredentials, RegisterCredentials, User } from '../types/auth';

const facebookProvider = new FacebookAuthProvider();

export const loginWithFacebook = async (): Promise<User> => {
  const { user } = await signInWithPopup(auth, facebookProvider);
  return {
    id: user.uid,
    email: user.email!,
    displayName: user.displayName || '',
    photoURL: user.photoURL || undefined,
    role: 'user',
  };
};

export const login = async ({ email, password }: LoginCredentials): Promise<User> => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return {
    id: user.uid,
    email: user.email!,
    displayName: user.displayName || '',
    photoURL: user.photoURL || undefined,
    role: 'user',
  };
};

export const register = async ({
  email,
  password,
  displayName,
  role,
}: RegisterCredentials): Promise<User> => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user, { displayName });
  
  return {
    id: user.uid,
    email: user.email!,
    displayName,
    photoURL: user.photoURL || undefined,
    role,
  };
};

export const signOut = () => firebaseSignOut(auth);