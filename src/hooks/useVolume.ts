import { useAtom } from "jotai";
import { useCallback, useEffect, useRef, useState } from "react";
import { fadeRatioAtom } from "../stores/videos";

const MAX_VOLUME = 100;
const MIN_VOLUME = 0;
const FADE_IN_OUT_INTERVAL = 80;
const FADE_IN_OUT_UNIT = 4;

function useVolume(defaultVolume: number) {
  const [volume, setVolume] = useState(defaultVolume);
  const [fadeRatio] = useAtom(fadeRatioAtom);

  const volumeFadeInOutTimer = useRef<number>();

  const clearVolumeFadeInOutTimer = useCallback(() => {
    if (volumeFadeInOutTimer.current) {
      window.clearTimeout(volumeFadeInOutTimer.current);
    }
  }, []);

  const startFadeOut = useCallback(
    (destVolume = MIN_VOLUME) => {
      clearVolumeFadeInOutTimer();
      const fadeOutUnit = FADE_IN_OUT_UNIT * (fadeRatio / 100);

      volumeFadeInOutTimer.current = window.setInterval(() => {
        setVolume((prevVolume) =>
          prevVolume > destVolume ? prevVolume - fadeOutUnit : prevVolume
        );
      }, FADE_IN_OUT_INTERVAL);
    },

    [setVolume, clearVolumeFadeInOutTimer, fadeRatio]
  );

  const startFadeIn = useCallback(
    (destVolume = MAX_VOLUME) => {
      clearVolumeFadeInOutTimer();
      const fadeInUnit = FADE_IN_OUT_UNIT * (fadeRatio / 100);
      volumeFadeInOutTimer.current = window.setInterval(() => {
        setVolume((prevVolume) =>
          prevVolume < destVolume ? prevVolume + fadeInUnit : prevVolume
        );
      }, FADE_IN_OUT_INTERVAL);
    },
    [setVolume, clearVolumeFadeInOutTimer, fadeRatio]
  );

  useEffect(() => {
    if (volume <= MIN_VOLUME) {
      setVolume(MIN_VOLUME);
      clearVolumeFadeInOutTimer();
      return;
    }

    if (volume >= MAX_VOLUME) {
      setVolume(MAX_VOLUME);
      clearVolumeFadeInOutTimer();
    }
  }, [clearVolumeFadeInOutTimer, volume]);

  return {
    volume,
    setVolume,
    startFadeOut,
    startFadeIn,
    stopFadeInOut: clearVolumeFadeInOutTimer,
  };
}

export default useVolume;
