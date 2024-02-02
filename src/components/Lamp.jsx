
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { SpotLight } from '@react-three/drei'

export function Lamp(props) {
  const { nodes, materials } = useGLTF('./models/lamp-post/lamp.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cylinder096.geometry} material={materials['Black.012']} />
      <mesh geometry={nodes.Cylinder096_1.geometry} material={materials['Yellow.007']} />
            
    </group>
  )
}

useGLTF.preload('/lamp.gltf')