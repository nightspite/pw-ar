/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Props, useFrame, useThree } from '@react-three/fiber';
import {
  ArToolkitContext,
  ArToolkitSource,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
} from '@ar-js-org/ar.js/three.js/build/ar-threex';
import React, { createContext, useCallback, useEffect, useMemo } from 'react';

const ARContext = createContext({});
const videoDomElemSelector = '#arjs-video';

export interface ARCanvasProps extends Props {
  arEnabled?: boolean;
  tracking?: boolean;
  patternRatio?: number;
  detectionMode?: 'color' | 'color_and_matrix' | 'mono' | 'mono_and_matrix';
  cameraParametersUrl?: string;
  matrixCodeType?:
    | '3x3'
    | '3x3_HAMMING63'
    | '3x3_PARITY65'
    | '4x4'
    | '4x4_BCH_13_9_3'
    | '4x4_BCH_13_5_5';
  sourceType?: string;
  maxDetectionRate?: number;
  labelingMode?: 'black_region' | 'white_region';
  debug?: boolean;
  onCameraStreamReady?: () => void;
  onCameraStreamError?: () => void;
}

const AR = React.memo(function AR({
  tracking = true,
  children,
  sourceType,
  patternRatio,
  matrixCodeType,
  detectionMode,
  cameraParametersUrl,
  maxDetectionRate,
  labelingMode = 'black_region',
  debug,
  onCameraStreamReady,
  onCameraStreamError,
}: ARCanvasProps) {
  const { gl, camera } = useThree();

  const arContext = useMemo(() => {
    const arToolkitSource = new ArToolkitSource({ sourceType });
    const arToolkitContext = new ArToolkitContext({
      cameraParametersUrl,
      detectionMode,
      patternRatio,
      matrixCodeType,
      maxDetectionRate,
      labelingMode,
      debug,
    });

    return { arToolkitContext, arToolkitSource };
  }, [
    sourceType,
    cameraParametersUrl,
    detectionMode,
    patternRatio,
    matrixCodeType,
    maxDetectionRate,
    labelingMode,
    debug,
  ]);

  const onResize = useCallback(() => {
    const { arToolkitContext, arToolkitSource } = arContext;

    arToolkitSource.onResizeElement();
    arToolkitSource.copyElementSizeTo(gl.domElement);
    if (arToolkitContext.arController !== null) {
      arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas);
      camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    }
  }, [gl, arContext, camera]);

  const onUnmount = useCallback(() => {
    typeof window !== undefined &&
      window?.removeEventListener('resize', onResize);

    arContext.arToolkitContext.arController.dispose();
    if (arContext.arToolkitContext.arController.cameraParam) {
      arContext.arToolkitContext.arController.cameraParam.dispose();
    }

    delete arContext.arToolkitContext;
    delete arContext.arToolkitSource;

    const video = document.querySelector(
      videoDomElemSelector
    ) as HTMLVideoElement;
    if (video) {
      // @ts-ignore
      video.srcObject?.getTracks().map((track) => track.stop());
      video.remove();
    }
  }, [onResize, arContext]);

  useEffect(() => {
    arContext.arToolkitSource.init(() => {
      const video = document.querySelector(
        videoDomElemSelector
      ) as HTMLVideoElement;
      if (video) {
        video.style.position = 'fixed';

        video.onloadedmetadata = () => {
          console.log(
            'actual source dimensions',
            video.videoWidth,
            video.videoHeight
          );

          if (video?.videoWidth > video.videoHeight) {
            arContext.arToolkitContext.arController.orientation = 'landscape';
            arContext.arToolkitContext.arController.options.orientation =
              'landscape';
          } else {
            arContext.arToolkitContext.arController.orientation = 'portrait';
            arContext.arToolkitContext.arController.options.orientation =
              'portrait';
          }

          if (onCameraStreamReady) {
            onCameraStreamReady();
          }
          onResize();
        };
      }
    }, onCameraStreamError);

    arContext.arToolkitContext.init(() =>
      camera.projectionMatrix.copy(
        arContext.arToolkitContext.getProjectionMatrix()
      )
    );

    window?.addEventListener('resize', onResize);

    return onUnmount;
  }, [
    arContext,
    camera,
    onCameraStreamReady,
    onCameraStreamError,
    onResize,
    onUnmount,
  ]);

  useFrame(() => {
    if (!tracking) {
      return;
    }

    if (
      arContext.arToolkitSource &&
      arContext.arToolkitSource.ready !== false
    ) {
      arContext.arToolkitContext.update(arContext.arToolkitSource.domElement);
    }
  });

  const value = useMemo(
    () => ({ arToolkitContext: arContext.arToolkitContext }),
    [arContext]
  );

  return <ARContext.Provider value={value}>{children}</ARContext.Provider>;
});

const useAR = () => {
  const arValue = React.useContext(ARContext);
  return React.useMemo(() => ({ ...arValue }), [arValue]);
};

export { AR, useAR };
