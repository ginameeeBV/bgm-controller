import { useAtom } from "jotai";
import { useCallback, useMemo, useRef, useState } from "react";
import { fadeInOutTimeAtom, volumeAtom } from "../stores/videos";

interface IFadeConfig {
  startVolume: number;
  endVolume: number;
  unit: number;
}

const MIN_VOLUME = 0;
const FADE_IN_OUT_UNIT = 2;

function useVolume(defaultValue: number = MIN_VOLUME) {
  const [volume, setVolume] = useState(defaultValue);
  const [fadeInOutTime] = useAtom(fadeInOutTimeAtom);
  const [maxVolume] = useAtom(volumeAtom);

  const volumeFadeInOutTimer = useRef<number>();

  const fadeInOutUnit = useMemo(() => {
    if (fadeInOutTime >= 3000) {
      return 1;
    }
    return FADE_IN_OUT_UNIT;
  }, [fadeInOutTime]);

  const clearVolumeFadeInOutTimer = useCallback(() => {
    if (volumeFadeInOutTimer.current) {
      window.clearInterval(volumeFadeInOutTimer.current);
    }
  }, []);

  const startFadeInOut = useCallback(
    (
      { startVolume, endVolume, unit }: IFadeConfig,
      intervalCallback: () => void
    ) => {
      const interval = Math.floor(
        fadeInOutTime / (Math.abs(startVolume - endVolume) / unit)
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
      startFadeInOut(
        { startVolume, endVolume: destVolume, unit: fadeInOutUnit },
        () => {
          setVolume((prevVolume) => {
            const nextVolume = prevVolume - fadeInOutUnit;
            return nextVolume > destVolume ? nextVolume : destVolume;
          });
        }
      );
    },
    [clearVolumeFadeInOutTimer, startFadeInOut, maxVolume, fadeInOutUnit]
  );

  const startFadeIn = useCallback(
    (startVolume = MIN_VOLUME, destVolume = maxVolume) => {
      clearVolumeFadeInOutTimer();
      startFadeInOut(
        { startVolume, endVolume: destVolume, unit: fadeInOutUnit },
        () => {
          setVolume((prevVolume) => {
            const nextVolume = prevVolume + fadeInOutUnit;
            return nextVolume < destVolume ? nextVolume : destVolume;
          });
        }
      );
    },
    [clearVolumeFadeInOutTimer, startFadeInOut, maxVolume, fadeInOutUnit]
  );

  return {
    volume,
    setVolume,
    startFadeOut,
    startFadeIn,
    stopFadeInOut: clearVolumeFadeInOutTimer,
  };
}

export default useVolume;
