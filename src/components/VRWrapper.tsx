/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import { Environment, OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { Spinner } from './spinner';
import { Suspense } from 'react';
import { Euler } from 'three';
import { Vector3 } from 'three';
import ARCanvas from './ar-canvas';
import ARMarker from './ar-marker';
import { degToRad } from 'three/src/math/MathUtils.js';

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
  patternUrl,
  patternRatio = 0.75,
}: Props) {
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
          // patternRatio={patternRatio}
          maxDetectionRate={70}
          // detectionMode='color_and_matrix'
          // labelingMode='black_region'
          // debug={true}
        >
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
            <Components arEnabled={arEnabled} />

            <group
              scale={1.5}
              // rotation={new Euler(degToRad(-20), degToRad(90), degToRad(0))}
              rotation={new Euler(degToRad(0), degToRad(0), degToRad(0))}
              position={
                arEnabled ? new Vector3(0, 0, 0) : new Vector3(0, -2, 0)
              }
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

export const Components = ({ arEnabled }: { arEnabled: boolean }) => {
  const { camera } = useThree();

  return (
    <>
      <Environment
        background={!arEnabled}
        files={'/assets/hdr/studio_small_03_1k.hdr'}
        // files={'/assets/hdr/dikhololo_night_1k.hdr'}
      />
      <ambientLight intensity={0.1} color={'#fff'} />

      {!arEnabled ? (
        <OrbitControls
          camera={camera}
          maxDistance={16}
          minDistance={4}
          position={new Vector3(0, 0, 0)}
          makeDefault
        />
      ) : null}
    </>
  );
};
