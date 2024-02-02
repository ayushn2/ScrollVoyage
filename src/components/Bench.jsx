/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/models/bench/Bench.glb 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Bench(props) {
  const { nodes, materials } = useGLTF('./models/bench/Bench.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes['Node-Mesh'].geometry} material={materials.mat20} />
      <mesh geometry={nodes['Node-Mesh_1'].geometry} material={materials.mat23} />
    </group>
  )
}

useGLTF.preload('/Bench.glb')