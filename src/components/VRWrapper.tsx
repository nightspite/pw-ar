/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import { ResizeObserver } from '@juggle/resize-observer';
import {
  Backdrop,
  Environment,
  OrbitControls,
  useHelper,
} from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Spinner } from './spinner';
import { folder, useControls } from 'leva';
import { Ref, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Color, Euler, PerspectiveCamera } from 'three';
import { DirectionalLight, DirectionalLightHelper, Vector3 } from 'three';
import ARCanvas from './ar-canvas';
import ARMarker from './ar-marker';
import { degToRad } from 'three/src/math/MathUtils.js';

const Env = ({ arEnabled }: { arEnabled: boolean }) => {
  // const { envBackground } = useControls('Environment', {
  //   envBackground: {
  //     label: 'envBackground',
  //     value: !arEnabled,
  //   },
  // });

  return (
    <Environment
      background={!arEnabled}
      files={'/assets/hdr/dikhololo_night_1k.hdr'}
    />
  );
};

const Camera = () => {
  const { fov } = useControls('Camera', {
    fov: {
      label: 'fov',
      value: 45,
      step: 1,
      min: 20,
      max: 200,
    },
  });

  const { camera } = useThree();

  useEffect(() => {
    (camera as any).fov = fov;
  }, [fov, camera]);

  useFrame(() => {
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
  });

  return (
    <>
      <OrbitControls
        camera={camera}
        maxDistance={16}
        minDistance={4}
        position={new Vector3(0, 0, 0)}
        makeDefault
      />
    </>
  );
};

const AmbientLight = () => {
  const { intensity, color } = useControls('Ambient light', {
    intensity: {
      label: 'intensity',
      value: 0.05,
      step: 0.01,
      min: -10,
      max: 10,
    },
    color: {
      label: 'color',
      value: '#ffffff',
    },
  });

  const parsedColor = new Color(color);

  return <ambientLight intensity={intensity} color={parsedColor} />;
};

interface Props {
  children: React.ReactNode;
  arEnabled?: boolean;
  optionsEnabled?: boolean;
  patternUrl: string;
  patternRatio?: number;
}

export function VRWrapper({
  children,
  arEnabled = true,
  optionsEnabled = false,
  patternUrl,
  patternRatio = 0.75,
}: Props) {
  const { camera } = useThree();

  if (typeof window === 'undefined') return null;

  console.log(window?.innerWidth, window?.innerHeight);

  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <ARCanvas
          // shadows
          gl={{
            logarithmicDepthBuffer: true,
          }}
          // resize={{ polyfill: ResizeObserver }}
          dpr={window?.devicePixelRatio}
          onCreated={({ gl }) => {
            gl.setSize(window?.innerWidth, window?.innerHeight);
          }}
          arEnabled={arEnabled}
          patternRatio={patternRatio}
          maxDetectionRate={70}
          detectionMode='color_and_matrix'
          labelingMode='black_region'
          debug={true}
        >
          {optionsEnabled ? (
            <>
              <Camera />

              <Env arEnabled={arEnabled} />
              {/* <Lights /> */}
              <AmbientLight />
            </>
          ) : (
            <>
              <Environment
                background={!arEnabled}
                files={'/assets/hdr/dikhololo_night_1k.hdr'}
              />
              <ambientLight intensity={0.1} color={'#fff'} />

              <OrbitControls
                camera={camera}
                maxDistance={16}
                minDistance={4}
                position={new Vector3(0, 0, 0)}
                makeDefault
              />
            </>
          )}

          <ARMarker
            onMarkerFound={() => console.log('found')}
            type='pattern'
            patternUrl={patternUrl}
            params={{
              smooth: true,
              smoothCount: 10,
              smoothTolerance: 0.02,
              smoothThreshold: 1,
            }}
          >
            <group
              scale={1.5}
              // rotation={new Euler(degToRad(-20), degToRad(90), degToRad(0))}
              rotation={new Euler(degToRad(0), degToRad(90), degToRad(0))}
              position={new Vector3(0, 0, 0)}
            >
              {children}
            </group>
          </ARMarker>
        </ARCanvas>
      </Suspense>
    </div>
  );
}

export default VRWrapper;
