import { atom } from "jotai";

export const urlsAtom = atom<string[], string[], void>([], (_get, set, arg) => {
  set(urlsAtom, arg);
});

export const soundAtom = atom<number, number, void>(100, (_get, set, arg) => {
  set(soundAtom, arg);
});

export const fadeRatioAtom = atom<number, number, void>(
  100,
  (_get, set, arg) => {
    set(soundAtom, arg);
  }
);
