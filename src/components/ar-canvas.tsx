/* eslint-disable indent */
import { Canvas } from '@react-three/fiber';

import { AR, ARCanvasProps } from './ar';

const ARCanvas = ({
  arEnabled = true,
  tracking = true,
  children,
  patternRatio = 0.5,
  detectionMode = 'mono_and_matrix',
  cameraParametersUrl = 'data/camera_para.dat',
  matrixCodeType = '3x3',
  sourceType = 'webcam',
  maxDetectionRate = 60,
  labelingMode = 'black_region',
  debug = false,
  onCameraStreamReady,
  onCameraStreamError,
  ...props
}: ARCanvasProps) => (
  <Canvas
    camera={arEnabled ? { position: [0, 0, 0] } : props.camera}
    {...props}
  >
    {arEnabled ? (
      <AR
        tracking={tracking}
        patternRatio={patternRatio}
        matrixCodeType={matrixCodeType}
        detectionMode={detectionMode}
        maxDetectionRate={maxDetectionRate}
        labelingMode={labelingMode}
        sourceType={sourceType}
        cameraParametersUrl={cameraParametersUrl}
        onCameraStreamReady={onCameraStreamReady}
        onCameraStreamError={onCameraStreamError}
        debug={debug}
      >
        {children}
      </AR>
    ) : (
      children
    )}
  </Canvas>
);

export default ARCanvas;
