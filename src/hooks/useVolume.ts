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

  const volumeFadeOffTimerRef = useRef<number>();
  const volumeFadeOnTimerRef = useRef<number>();

  const initFadeInOut = useCallback(() => {
    stopFadeIn();
    stopFadeOut();
  }, []);

  const startFadeOut = useCallback(
    (destVolume = MIN_VOLUME) => {
      initFadeInOut();
      const fadeOutUnit = FADE_IN_OUT_UNIT * (fadeRatio / 100);
      volumeFadeOffTimerRef.current = window.setInterval(() => {
        setVolume((prevVolume) =>
          prevVolume > destVolume ? prevVolume - fadeOutUnit : prevVolume
        );
      }, FADE_IN_OUT_INTERVAL);
    },
    [setVolume, initFadeInOut, fadeRatio]
  );

  const stopFadeOut = () => {
    if (volumeFadeOffTimerRef.current) {
      clearInterval(volumeFadeOffTimerRef.current);
      volumeFadeOffTimerRef.current = undefined;
    }
  };

  const startFadeIn = useCallback(
    (destVolume = MAX_VOLUME) => {
      initFadeInOut();
      const fadeInUnit = FADE_IN_OUT_UNIT * (fadeRatio / 100);
      volumeFadeOnTimerRef.current = window.setInterval(() => {
        setVolume((prevVolume) =>
          prevVolume < destVolume ? prevVolume + fadeInUnit : prevVolume
        );
      }, FADE_IN_OUT_INTERVAL);
    },
    [setVolume, initFadeInOut, fadeRatio]
  );

  const stopFadeIn = () => {
    if (volumeFadeOnTimerRef.current) {
      clearInterval(volumeFadeOnTimerRef.current);
      volumeFadeOnTimerRef.current = undefined;
    }
  };

  useEffect(() => {
    if (volume <= MIN_VOLUME) {
      setVolume(MIN_VOLUME);
      stopFadeOut();
      return;
    }

    if (volume >= MAX_VOLUME) {
      setVolume(MAX_VOLUME);
      stopFadeIn();
    }
  }, [volume]);

  return {
    volume,
    setVolume,
    startFadeOut,
    stopFadeOut,
    startFadeIn,
    stopFadeIn,
  };
}

export default useVolume;
