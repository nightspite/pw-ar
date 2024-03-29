/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    ['node-0']: THREE.Mesh
  }
  materials: {
    Astronaut_mat: THREE.MeshStandardMaterial
  }
}

export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/assets/models/ASTRONAUT.gltf') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group name="Astronaut">
        <group name="Astronautglb">
          <mesh name="node-0" geometry={nodes['node-0'].geometry} material={materials.Astronaut_mat} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/ASTRONAUT.gltf')
