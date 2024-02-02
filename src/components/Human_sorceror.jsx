/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/models/human_sorceror.glb 
Author: Dr Helmi Norman (https://sketchfab.com/helmi.norman)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/parameswara-chronicles-sorcerer-sitting-d8526aab1e8644199c8fe426fed92ecd
Title: Parameswara Chronicles: Sorcerer Sitting
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Human_Sorceror(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('./public/models/human_sorceror.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={1.96}>
          <group name="da95eebcd8a343ca8b523e9bf7400575fbx" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} />
                  <group name="Object_6" />
                  <group name="Ch39" />
                  <skinnedMesh name="Object_7" geometry={nodes.Object_7.geometry} material={materials.Ch39_Body} skeleton={nodes.Object_7.skeleton} />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/human_sorceror.glb')
