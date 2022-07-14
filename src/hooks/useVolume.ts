import { useAtom } from "jotai";
import { useCallback, useEffect, useRef, useState } from "react";
import { fadeInOutTimeAtom, volumeAtom } from "../stores/videos";

const MIN_VOLUME = 0;
const FADE_IN_OUT_UNIT = 2;

function useVolume(defaultValue: number) {
  const [volume, setVolume] = useState(defaultValue);
  const [fadeInOutTime] = useAtom(fadeInOutTimeAtom);
  const [maxVolume] = useAtom(volumeAtom);

  const volumeFadeInOutTimer = useRef<number>();

  const clearVolumeFadeInOutTimer = useCallback(() => {
    if (volumeFadeInOutTimer.current) {
      window.clearInterval(volumeFadeInOutTimer.current);
    }
  }, []);

  const doFadeThings = useCallback(
    (startVolume: number, endVolume: number, intervalCallback: () => void) => {
      const interval = Math.floor(
        fadeInOutTime / (Math.abs(startVolume - endVolume) / FADE_IN_OUT_UNIT)
      );

      if (interval === 0) {
        setVolume(endVolume);
      }
      volumeFadeInOutTimer.current = window.setInterval(
        intervalCallback,
        interval
      );
    },
    [fadeInOutTime]
  );

  const startFadeOut = useCallback(
    (startVolume = maxVolume, destVolume = MIN_VOLUME) => {
      clearVolumeFadeInOutTimer();
      doFadeThings(startVolume, destVolume, () => {
        setVolume((prevVolume) => {
          const nextVolume = prevVolume - FADE_IN_OUT_UNIT;
          return nextVolume > destVolume ? nextVolume : destVolume;
        });
      });
    },
    [clearVolumeFadeInOutTimer, doFadeThings, maxVolume]
  );

  const startFadeIn = useCallback(
    (startVolume = MIN_VOLUME, destVolume = maxVolume) => {
      clearVolumeFadeInOutTimer();
      doFadeThings(startVolume, destVolume, () => {
        setVolume((prevVolume) => {
          const nextVolume = prevVolume + FADE_IN_OUT_UNIT;
          return nextVolume < destVolume ? nextVolume : destVolume;
        });
      });
    },
    [clearVolumeFadeInOutTimer, doFadeThings, maxVolume]
  );

  useEffect(() => {
    setVolume(maxVolume);
    clearVolumeFadeInOutTimer();
  }, [maxVolume, clearVolumeFadeInOutTimer]);

  return {
    volume,
    setVolume,
    startFadeOut,
    startFadeIn,
    stopFadeInOut: clearVolumeFadeInOutTimer,
  };
}

export default useVolume;
