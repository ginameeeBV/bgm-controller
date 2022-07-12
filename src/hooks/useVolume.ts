import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
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

  const initFadeInOut = () => {
    stopFadeIn();
    stopFadeOut();
  };

  const startFadeOut = (destVolume = MIN_VOLUME) => {
    initFadeInOut();
    const fadeOutUnit = FADE_IN_OUT_UNIT * (fadeRatio / 100);
    volumeFadeOffTimerRef.current = window.setInterval(() => {
      setVolume((prevVolume) =>
        prevVolume > destVolume ? prevVolume - fadeOutUnit : prevVolume
      );
    }, FADE_IN_OUT_INTERVAL);
  };

  const stopFadeOut = () => {
    if (volumeFadeOffTimerRef.current) {
      clearInterval(volumeFadeOffTimerRef.current);
      volumeFadeOffTimerRef.current = undefined;
    }
  };

  const startFadeIn = (destVolume = MAX_VOLUME) => {
    initFadeInOut();
    const fadeInUnit = FADE_IN_OUT_UNIT * (fadeRatio / 100);
    volumeFadeOnTimerRef.current = window.setInterval(() => {
      setVolume((prevVolume) =>
        prevVolume < destVolume ? prevVolume + fadeInUnit : prevVolume
      );
    }, FADE_IN_OUT_INTERVAL);
  };

  const stopFadeIn = () => {
    if (volumeFadeOnTimerRef.current) {
      clearInterval(volumeFadeOnTimerRef.current);
      volumeFadeOnTimerRef.current = undefined;
    }
  };

  useEffect(() => {
    if (volume <= 0) {
      stopFadeOut();
    }

    if (volume >= 100) {
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
