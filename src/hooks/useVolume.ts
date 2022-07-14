import { useAtom } from "jotai";
import { useCallback, useEffect, useRef, useState } from "react";
import { fadeInOutTimeAtom } from "../stores/videos";

const MAX_VOLUME = 100;
const MIN_VOLUME = 0;
const FADE_IN_OUT_UNIT = 2;

function useVolume(defaultVolume: number) {
  const [volume, setVolume] = useState(defaultVolume);
  const [fadeInOutTime] = useAtom(fadeInOutTimeAtom);

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
    (startVolume = MAX_VOLUME, destVolume = MIN_VOLUME) => {
      clearVolumeFadeInOutTimer();
      doFadeThings(startVolume, destVolume, () => {
        setVolume((prevVolume) =>
          prevVolume > destVolume ? prevVolume - FADE_IN_OUT_UNIT : prevVolume
        );
      });
    },
    [clearVolumeFadeInOutTimer, doFadeThings]
  );

  const startFadeIn = useCallback(
    (startVolume = MIN_VOLUME, destVolume = MAX_VOLUME) => {
      clearVolumeFadeInOutTimer();
      doFadeThings(startVolume, destVolume, () => {
        setVolume((prevVolume) =>
          prevVolume < destVolume ? prevVolume + FADE_IN_OUT_UNIT : prevVolume
        );
      });
    },
    [clearVolumeFadeInOutTimer, doFadeThings]
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
