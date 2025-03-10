// src/recoil/userState.js
import { atom } from 'recoil';

export const userState = atom({
  key: 'userState', // unique ID (with respect to other atoms/selectors)
  default: JSON.parse(localStorage.getItem('user')) || null, // Persist user state in localStorage
});
