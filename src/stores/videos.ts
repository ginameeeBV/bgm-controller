import { atom } from "jotai";

export const urlsAtom = atom<string[], string[], void>([], (_get, set, arg) => {
  set(urlsAtom, arg);
});

export const volumeAtom = atom<number, number, void>(100, (_get, set, arg) => {
  set(volumeAtom, arg);
});

export const fadeRatioAtom = atom<number, number, void>(
  100,
  (_get, set, arg) => {
    set(fadeRatioAtom, arg);
  }
);

export const playingAtom = atom<boolean, boolean, void>(
  false,
  (_get, set, arg) => {
    set(playingAtom, arg);
  }
);
