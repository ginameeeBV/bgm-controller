import { useCallback, useEffect, useRef, useState } from "react";

const MAX_VOLUME = 100;
const MIN_VOLUME = 0;

function useVolume(defaultVolume: number) {
  const [volume, setVolume] = useState(defaultVolume);
  const volumeFadeOffTimerRef = useRef<number>();
  const volumeFadeOnTimerRef = useRef<number>();

  const initFadeInOut = useCallback(() => {
    stopFadeIn();
    stopFadeOut();
  }, []);

  const startFadeOut = useCallback(
    (destVolume = MIN_VOLUME) => {
      initFadeInOut();
      volumeFadeOffTimerRef.current = window.setInterval(() => {
        setVolume((prevVolume) =>
          prevVolume > destVolume ? prevVolume - 4 : prevVolume
        );
      }, 80);
    },
    [setVolume, initFadeInOut]
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
      volumeFadeOnTimerRef.current = window.setInterval(() => {
        setVolume((prevVolume) =>
          prevVolume < destVolume ? prevVolume + 4 : prevVolume
        );
      }, 80);
    },
    [setVolume, initFadeInOut]
  );

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
