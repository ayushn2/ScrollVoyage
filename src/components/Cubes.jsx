import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { fadeOnBeforeCompile, fadeOnBeforeCompileFlat } from "../utils/fadeMaterial";
import { useState } from "react";
import { RenderTexture, PerspectiveCamera, Text, ContactShadows } from '@react-three/drei'
import { suspend } from 'suspend-react'




export function Cube({ sceneOpacity, ...props }) {


  return (
    <group {...props} dispose={null}>
      {/* <mesh > */}
        {/* <meshStandardMaterial
          ref={materialRef}
          onBeforeCompile={fadeOnBeforeCompile}
          envMapIntensity={2}
          transparent
        /> */}
        {/* <boxGeometry />
        <meshNormalMaterial
        onBeforeCompile={fadeOnBeforeCompile}/>
      </mesh> */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} />
      {/* <Cub onBeforeCompile={fadeOnBeforeCompileFlat}/> */}
      <Dodecahedron position={[1, 1, 6]} scale={0.5} />
      <Dodecahedron position={[1, 0.5, 0]} scale={0.2} />
      <ContactShadows frames={1} position={[0, -0.5, 0]} blur={1} opacity={0.75} />
      <ContactShadows frames={1} position={[0, -0.5, 0]} blur={3} color="orange" />
      {/* <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} /> */}
    </group>
  );
}

function Cub() {
  const textRef = useRef()
  useFrame((state) => (textRef.current.position.x = Math.sin(state.clock.elapsedTime) * 2))
  return (
    <mesh>
      <boxGeometry />
      <meshMatcapMaterial >
        <RenderTexture attach="map" anisotropy={32}>
          <PerspectiveCamera makeDefault manual aspect={1 / 1} position={[0, 0, 5]} />
          <color attach="background" args={['#5A4FCF']} />
          {/* <ambientLight intensity={0.5} /> */}
          <directionalLight position={[10, 10, 5]} />
          <Text font={'public/fonts/DMSerifDisplay-Regular.ttf'} ref={textRef} fontSize={2.6} color="#e1e1e1">
            Ignus
          </Text>
         
        </RenderTexture>
      </meshMatcapMaterial>
      
    </mesh>
  )
}

function Dodecahedron(props) {
  const meshRef = useRef()
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  useFrame(() => (meshRef.current.rotation.x += 0.01))
  return (
    <group {...props}>
      <mesh
        ref={meshRef}
        scale={clicked ? 1.5 : 1}
        onClick={() => click(!clicked)}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}>
        <dodecahedronGeometry args={[0.75]} />
        <meshStandardMaterial color={hovered ? '#4c0000' : '#020605'} />
      </mesh>
    </group>
  )
}
