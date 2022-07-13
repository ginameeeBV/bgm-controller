import { useAtom } from "jotai";
import { useCallback, useEffect, useRef, useState } from "react";
import { fadeInOutTimeAtom, volumeAtom } from "../stores/videos";

const MIN_VOLUME = 0;
const FADE_IN_OUT_UNIT = 2;

function useVolume(defaultValue: number = MIN_VOLUME) {
  const [volume, setVolume] = useState(defaultValue);
  const [fadeInOutTime] = useAtom(fadeInOutTimeAtom);
  const [maxVolume] = useAtom(volumeAtom);

  const volumeFadeInOutTimer = useRef<number>();

  const clearVolumeFadeInOutTimer = useCallback(() => {
    if (volumeFadeInOutTimer.current) {
      window.clearInterval(volumeFadeInOutTimer.current);
    }
  }, []);

  const startFadeInOut = useCallback(
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
      startFadeInOut(startVolume, destVolume, () => {
        setVolume((prevVolume) => {
          const nextVolume = prevVolume - FADE_IN_OUT_UNIT;
          return nextVolume > destVolume ? nextVolume : destVolume;
        });
      });
    },
    [clearVolumeFadeInOutTimer, startFadeInOut, maxVolume]
  );

  const startFadeIn = useCallback(
    (startVolume = MIN_VOLUME, destVolume = maxVolume) => {
      clearVolumeFadeInOutTimer();
      startFadeInOut(startVolume, destVolume, () => {
        setVolume((prevVolume) => {
          const nextVolume = prevVolume + FADE_IN_OUT_UNIT;
          return nextVolume < destVolume ? nextVolume : destVolume;
        });
      });
    },
    [clearVolumeFadeInOutTimer, startFadeInOut, maxVolume]
  );

  const isFirstRenderRef = useRef(true);
  useEffect(() => {
    if (!isFirstRenderRef.current) {
      setVolume(maxVolume);
    } else {
      isFirstRenderRef.current = false;
    }
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
