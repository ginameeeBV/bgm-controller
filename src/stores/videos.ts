import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const urlsAtom = atomWithStorage<string[]>("hwahaeDevDayBGM", []);

export const soundAtom = atom<number, number, void>(100, (_get, set, arg) => {
  set(soundAtom, arg);
});

export const fadeRatioAtom = atom<number, number, void>(
  100,
  (_get, set, arg) => {
    set(soundAtom, arg);
  }
);
