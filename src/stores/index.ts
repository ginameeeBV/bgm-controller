import { atom } from "jotai";

export const videosAtom = atom<Video[], Video[], void>([], (_get, set, arg) => {
  set(videosAtom, arg);
});
