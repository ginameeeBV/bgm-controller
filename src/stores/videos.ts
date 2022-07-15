import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const urlsAtom = atomWithStorage<string[]>("hwahaeDevDayBGM", []);
export const noLoopVideosAtom = atomWithStorage<string[]>(
  "hwahaeDevDayBGM_noLoop",
  []
);

export const volumeAtom = atom<number, number, void>(100, (_get, set, arg) => {
  set(volumeAtom, arg);
});

export const fadeInOutTimeAtom = atom<number, number, void>(
  1000,
  (_get, set, arg) => {
    set(fadeInOutTimeAtom, arg);
  }
);

export const currPlayedUrlAtom = atom<string, string, void>(
  "",
  (_get, set, arg) => {
    set(currPlayedUrlAtom, arg);
  }
);

export const prevPlayedUrlAtom = atom<string, string, void>(
  "",
  (_get, set, arg) => {
    set(prevPlayedUrlAtom, arg);
  }
);

export const isOnMicAtom = atom<boolean, boolean, void>(
  false,
  (_get, set, arg) => {
    set(isOnMicAtom, arg);
  }
);

export const minVolumeForSpeakAtom = atom<number, number, void>(
  20,
  (_get, set, arg) => {
    set(minVolumeForSpeakAtom, arg);
  }
);

export const maxVolumeAtom = atom((get) => {
  if (get(isOnMicAtom)) {
    return get(minVolumeForSpeakAtom);
  } else {
    return get(volumeAtom);
  }
});
