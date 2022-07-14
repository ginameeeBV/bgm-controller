import { useAtom } from "jotai";
import { useCallback, useEffect, useRef, useState } from "react";
import { fadeRatioAtom, volumeAtom } from "../stores/videos";

const MIN_VOLUME = 0;
const FADE_IN_OUT_INTERVAL = 80;
const FADE_IN_OUT_UNIT = 4;

function useVolume(defaultValue: number) {
  const [volume, setVolume] = useState(defaultValue);
  const [fadeRatio] = useAtom(fadeRatioAtom);
  const [maxVolume] = useAtom(volumeAtom);

  const volumeFadeInOutTimer = useRef<number>();

  const clearVolumeFadeInOutTimer = useCallback(() => {
    if (volumeFadeInOutTimer.current) {
      window.clearInterval(volumeFadeInOutTimer.current);
    }
  }, []);

  const startFadeOut = useCallback(
    (destVolume = MIN_VOLUME) => {
      clearVolumeFadeInOutTimer();
      const fadeOutUnit = FADE_IN_OUT_UNIT * (fadeRatio / 100);

      volumeFadeInOutTimer.current = window.setInterval(() => {
        setVolume((prevVolume) => {
          const nextVolume = prevVolume - fadeOutUnit;
          return nextVolume > destVolume ? nextVolume : destVolume;
        });
      }, FADE_IN_OUT_INTERVAL);
    },

    [setVolume, clearVolumeFadeInOutTimer, fadeRatio]
  );

  const startFadeIn = useCallback(
    (destVolume = maxVolume) => {
      clearVolumeFadeInOutTimer();
      const fadeInUnit = FADE_IN_OUT_UNIT * (fadeRatio / 100);
      volumeFadeInOutTimer.current = window.setInterval(() => {
        setVolume((prevVolume) => {
          const nextVolume = prevVolume + fadeInUnit;
          return nextVolume < destVolume ? nextVolume : destVolume;
        });
      }, FADE_IN_OUT_INTERVAL);
    },
    [setVolume, clearVolumeFadeInOutTimer, fadeRatio, maxVolume]
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
