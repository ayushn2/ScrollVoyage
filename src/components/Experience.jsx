import { Center, Float, PerspectiveCamera, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect } from "react";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Background } from "./Background";
import { Cloud } from "./Cloud";
import { Lamp } from "./Lamp";
import { Text } from "@react-three/drei";
import { Vector3 } from "three";

import { Image,Stars } from "@react-three/drei";

import { fadeOnBeforeCompileFlat } from "../utils/fadeMaterial"
import { usePlay } from "../context/Play";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { Bench } from "./Bench";

import { Hot_air_balloon } from "./Hot_air_balloon";


const LINE_NB_POINTS = 12000;
const FRICTION_DISTANCE = 42;

export const Experience = () => {

const curvePoints = useMemo(()=>[
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, -10),
    new THREE.Vector3(-2.25, 0, -20),
    new THREE.Vector3(-3, 0, -30),
    new THREE.Vector3(0, 0, -40),
    new THREE.Vector3(5, 0, -50),
    new THREE.Vector3(7, 0, -60),
    new THREE.Vector3(5, 0, -70),
    new THREE.Vector3(1, 0, -80),
    new THREE.Vector3(0, 0, -90),
    new THREE.Vector3(0, 0, -100),
],[]);

const sceneOpacity = useRef(0);
const lineMaterialRef = useRef();


const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
        curvePoints,
      false,
      "catmullrom",
      0.5
    );
}, []);

const textSections = useMemo(()=>{
  return [
      {
      position:window.innerWidth > window.innerHeight ?new Vector3(
        4,
        1,
        -55
      ):new Vector3(
        7.5,
        0.7,
        -55
      ),
      title:"Theme",
      subtitle: 'Cultural Heritage',
      fontSize:1,
    },
    {
      position:window.innerWidth > window.innerHeight ? new Vector3(
        0,
        0.5,
        -101
      ):new Vector3(
        0,
        1,
        -101
      ),
      title:"IGNUS 24",
      fontSize:window.innerWidth > window.innerHeight ? 0.5:0.4,
    },
    {
      position:window.innerWidth > window.innerHeight ? new Vector3(
        -2.4,
        1.8,
        -10,
      ):
      new Vector3(
        1,
        1,
        -8,
      ),
      title:"About Us",
      subtitle:"IGNUS, the much anticipated annual socio-cultural fest of IIT Jodhpur, is now back, after three years. Ignus celebrates art, culture and pluralism. It provides a stage for the creative and intellectual minds from across the country to showcase their incredible talent and creativity through art and culture.",
      fontSize:0.7,
    }
  ]
  });

  const cubes = useMemo(
    () => [
      // STARTING
      
      
      {
        scale: window.innerWidth > window.innerHeight ? (new Vector3(4, 4,4)):(new Vector3(12,12,12)),
        position: window.innerWidth > window.innerHeight ? new Vector3(-5, 0.2, -15):new Vector3(-12, 0.2, -20),
        // rotation: new Euler(-Math.PI / 5, Math.PI / 6, 0),
      },
      {
        scale: new Vector3(8, 8, 5),
        position: new Vector3(11, 0, -22),
      },
     
      {
        scale: new Vector3(7, 7, 7),
        position: new Vector3(
          curvePoints[3].x + 3,
          curvePoints[3].y - 10,
          curvePoints[3].z + 50
        ),
      },
      {
        scale: new Vector3(3, 3, 3),
        position: new Vector3(
          curvePoints[3].x - 10,
          curvePoints[3].y,
          curvePoints[3].z + 30
        ),
        // rotation: new Euler(Math.PI / 4, 0, Math.PI / 5),
      },
      // {
      //   scale: new Vector3(4, 4, 4),
      //   position: new Vector3(
      //     curvePoints[3].x - 20,
      //     curvePoints[3].y - 5,
      //     curvePoints[3].z - 8
      //   ),
      //   rotation: new Euler(Math.PI, 0, Math.PI / 5),
      // },
      {
        scale: new Vector3(8, 8, 8),
        position: new Vector3(
          curvePoints[3].x - 3,
          curvePoints[3].y - 1,
          curvePoints[3].z - 20
        ),
        // rotation: new Euler(0, Math.PI / 3, 0),
      },
      // FOURTH POINT
      {
        scale: new Vector3(4, 4, 4),
        position: new Vector3(
          curvePoints[4].x + 6,
          curvePoints[4].y - 0,
          curvePoints[4].z - 45
        ),
      },
      {
        scale: new Vector3(3, 3, 3),
        position: new Vector3(
          curvePoints[4].x - 4,
          curvePoints[4].y - 0,
          curvePoints[4].z - 58
        ),
        // rotation: new Euler(Math.PI / 4, 0, Math.PI / 5),
      },
      {
        scale: new Vector3(3, 3, 3),
        position: new Vector3(
          curvePoints[4].x + 12,
          curvePoints[4].y + 0,
          curvePoints[4].z - 22
        ),
        // rotation: new Euler(Math.PI / 3, 0, Math.PI / 3),
      },
      // FINAL
      
    ],
    []
  );

  const linePoints = useMemo(() => {
    return curve.getPoints(LINE_NB_POINTS);
  }, [curve]);

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -1);
    shape.lineTo(0, 1);

    return shape;
  }, [curve]);

  const cameraGroup = useRef();
  const scroll = useScroll();
  const camera = useRef();


  const {play,setPlay,end,setEnd,revisit,setRevisit,navDisplay,events,setEvents,setTheme,theme} = usePlay();

  
  const lastScroll = useRef(0)


  useFrame((_state, delta) => {

    const scrollOffset = Math.max(0, scroll.offset);

    tl.current.progress(scrollOffset / 10);

    let friction = 1;
    let resetCameraRail = true;
    // LOOK TO CLOSE TEXT SECTIONS
    textSections.forEach((textSection) => {
      const distance = textSection.position.distanceTo(
        cameraGroup.current.position
      );

      if (distance < FRICTION_DISTANCE) {
        friction = Math.max(distance / FRICTION_DISTANCE, 0.1);
        const targetCameraRailPosition = new Vector3(
          (1 - distance / FRICTION_DISTANCE) * textSection.cameraRailDist,
          0,
          0
        );
        
        resetCameraRail = false;
      }
    });
    if (resetCameraRail) {
      const targetCameraRailPosition = new Vector3(0, 0, 0);
      cameraRail.current.position.lerp(targetCameraRailPosition, delta);
    }
    
    if(window.innerWidth > window.innerHeight){
      // landscape
      camera.current.fov = 30;//30
      camera.current.position.z = 0;
   
    }else{
      // portrait
      camera.current.fov = 90;
      camera.current.position.z = 0;
     
    }

    // lineMaterialRef.current.opacity = sceneOpacity.current;
    if(play && !end && sceneOpacity<1){
      sceneOpacity.current = THREE.MathUtils.lerp(
        sceneOpacity.current,
        1,
        delta * 0.1
      );
    }

    if(end && sceneOpacity.current>0){
      sceneOpacity.current = THREE.MathUtils.lerp(
        sceneOpacity.current,
        0,
        delta
      )
    }

    
    if(end){
      return ;
    }
    
    let lerpedScrollOffset = THREE.MathUtils.lerp(
      lastScroll.current,
      scrollOffset,
      delta * friction
    );
    
    lerpedScrollOffset = Math.min(lerpedScrollOffset,1);
    lerpedScrollOffset = Math.max(lerpedScrollOffset,0);

    lastScroll.current = lerpedScrollOffset;

    const curPointIndex = Math.min(
      Math.round(scroll.offset * linePoints.length),
      linePoints.length - 1
    );
    const curPoint = linePoints[curPointIndex];

    

    const pointAhead =
      linePoints[Math.min(curPointIndex + 1, linePoints.length - 1)];

    const xDisplacement = (pointAhead.x - curPoint.x) * 80;

    // Math.PI / 2 -> LEFT
    // -Math.PI / 2 -> RIGHT

    const angleRotation =
      (xDisplacement < 0 ? 1 : -1) *
      Math.min(Math.abs(xDisplacement), Math.PI / 3);

    
    const targetCameraQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        cameraGroup.current.rotation.x,
        angleRotation,
        cameraGroup.current.rotation.z
      )
    );

    cameraGroup.current.quaternion.slerp(targetCameraQuaternion, delta * 2);

    cameraGroup.current.position.lerp(curPoint, delta * 24);

    

    

  //   if (
  //     cameraGroup.current.position.z <
  //     curvePoints[curvePoints.length - 1].z + (window.innerWidth > window.innerHeight ? 2.2 : 1)
  //   ) {
  //     setEnd(true);
      
  //   }
  //   if (
  //     cameraGroup.current.position.z <
  //     curvePoints[curvePoints.length - 1].z + 53 && events!=2
  //   ){
   
  //       setEvents(1)
  //    }
  //    if (
  //     cameraGroup.current.position.z <
  //     curvePoints[curvePoints.length - 1].z + 28 && theme!=2
  //   ){
  //       setTheme(1)
  // }
    // if(revisit){
    //   setEnd(false)
    //   window.location.reload();
    //   setPlay(true)
    //   setRevisit(false)
     
    // }
    
    
    
  });

  const tl = useRef();
  const backgroundColors = useRef({
    colorA: "#3535cc",
    colorB: "#abaadd",
  });

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

    tl.current.to(backgroundColors.current, {
      duration: 0.1,
      colorA: "#001F3F",
      colorB: "#4B0082",
    });
    tl.current.to(backgroundColors.current, {
      duration: 0.1,
      // colorA: "#424242",
      colorA: "#001F3F",
      // colorB: "#ffcc00",
      colorB:"#4B0082",
    });
    tl.current.to(backgroundColors.current, {
      duration: 1,
      // colorA: "#81318b",
      // colorB: "#55ab8f",
    });

    tl.current.pause();
  }, []);


  return (
    <>
    <directionalLight position={[0,3,1]} intensity={0.1} />
      {/* <OrbitControls enableZoom={false} /> */}
      <group ref={cameraGroup}>
        <Background backgroundColors={backgroundColors} />
        <PerspectiveCamera
        ref={camera}
        position={[0, 0, 5]} 
        fov={20} 
        makeDefault />
      </group>

      {/* text */}

      {/* {
        play && !navDisplay && textSections.map((textSection,index)=>(
          <TextSection {...textSection} key={index} style={{ opacity: 1 }} />
        ))
      } */}
      {/* <group position={[1,1,-8]}>
      <Image url="1.jpg" 
      transparent 
      opacity={0.5} 
      scale={1.8}
      />
      </group> */}

      <group position={[ 0,1,-107]}>
      {/* <Text3D smooth={1} lineHeight={0.5} letterSpacing={-0.025}>{`hello\nworld`}</Text3D> */}
      {/* <Center top center>
        <Text3D 
        
        font="./fonts/gentilis_regular.typeface.json">
              IGNUS 24
              <meshMatcapMaterial/>
             
          </Text3D>
      </Center> */}
      
      </group>
 
        

      {/* LINE */}
      <group position-y={window.innerWidth > window.innerHeight?-0.6:-1}>
        
        <mesh>
          <extrudeGeometry
            args={[
              shape,
              {
                steps: LINE_NB_POINTS,
                bevelEnabled: false,
                extrudePath: curve,
              },
            ]}
          />
          <meshToonMaterial 
          color={"rgb(157, 79, 153)"} 
          ref={lineMaterialRef}
          
          // transparent
          envMapIntensity={2}
          onBeforeCompile={fadeOnBeforeCompileFlat}/>
        </mesh>
        
      </group>

{/* {
  play && !navDisplay && textSections.map((textSection,index)=>(
<mesh opacity={1} scale={[1, 1, 1.5]} position={[10, -0.4, -60]}>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
  ))
} */}

{/* {
play && !navDisplay && cubes.map((cloud, index) => (
          <Cube 
          style={{PointerEvent:"none"}} 
          sceneOpacity={sceneOpacity} 
          {...cloud} 
          key={index} />
        ))
} */}
{/* <Float floatIntensity={1} rotationIntensity={0.01}>
<group 
// position={[4.3, 0.5, -15]}
position={[MathUtils.randFloat(1.8, 1.91), MathUtils.randFloat(0.9, 0.91), MathUtils.randFloat(-15,-14.09)]}
rotateY={Math.PI/2}
>
<ContactShadows position={[2, -0.1, 0]} opacity={0.7} scale={40} blur={1} />
<Image rotateY={Math.PI/2} scale={MathUtils.randFloat(3, 3.3)} url="./1.jpeg"/>
</group>
</Float> */}

      {/* Text */}

     {/* <group position={window.innerWidth > window.innerHeight ?
        [4,3,-85]
      :
        [-1.4,2,-85]
      }
      rotateY={Math.PI}>
      <Text color="white"
                anchorx={"left"}
                anchorY="center"
                position-y={0.25}
               
                fontSize={0.6}
                maxWidth={6.5}
                font={"./fonts/DMSerifDisplay-Regular.ttf"}>
                Hey, It's Ayush
                    <meshStandardMaterial
                    color={"white"}
                    onBeforeCompile={fadeOnBeforeCompileFlat}/>

      </Text>
      <Text
      color="white"
      anchorx={"left"}
      anchorY="top"
      position-y={-0.8}
      fontSize={0.5}
      maxWidth={1.8}
      font={"./fonts/DMSerifDisplay-Regular.ttf"}>
         I Design
         I Create
         I Solve Problems
         <meshStandardMaterial
                    color={"white"}
                    onBeforeCompile={fadeOnBeforeCompileFlat}/>
      </Text>
     </group> */}
     <group 
     position={window.innerWidth > window.innerHeight ?
        [4,3,-85]
      :
        [-1.4,2,-85]
      }>
     <Text
      color="white"
      anchorx={"left"}
      anchorY="top"
      position-y={-0.8}
      fontSize={1.5}
      maxWidth={9.8}
      font={"./fonts/DMSerifDisplay-Regular.ttf"}>
         I Resolve
         
         <meshStandardMaterial
                    color={"white"}
                    onBeforeCompile={fadeOnBeforeCompileFlat}/>
      </Text>
     </group>
     <group 
     position={window.innerWidth > window.innerHeight ?
        [-4,3,-55]
      :
        [-4,3,-55]
      }>
     <Text
      color="white"
      anchorx={"left"}
      anchorY="top"
      position-y={-0.8}
      fontSize={1.5}
      maxWidth={9.8}
      font={"./fonts/DMSerifDisplay-Regular.ttf"}>
         I Create
         
         <meshStandardMaterial
                    color={"white"}
                    onBeforeCompile={fadeOnBeforeCompileFlat}/>
      </Text>
     </group>

     <group 
     position={window.innerWidth > window.innerHeight ?
        [4,3,-25]
      :
        [4,3,-25]
      }>
     <Text
      color="white"
      anchorx={"left"}
      anchorY="top"
      position-y={-0.8}
      fontSize={1.5}
      maxWidth={9.8}
      font={"./fonts/DMSerifDisplay-Regular.ttf"}>
         I Design
         
         <meshStandardMaterial
                    color={"white"}
                    onBeforeCompile={fadeOnBeforeCompileFlat}/>
      </Text>
     </group>

     <group 
     position={window.innerWidth > window.innerHeight ?
        [0,5,-110]
      :
        [0,5,-110]
      }>
     {/* <Text
      color="white"
      anchorx={"left"}
      anchorY="top"
      position-y={-0.8}
      fontSize={1.5}
      maxWidth={9.8}
      font={"./fonts/DMSerifDisplay-Regular.ttf"}>
         Contact Me
         
         <meshStandardMaterial
                    color={"white"}
                    onBeforeCompile={fadeOnBeforeCompileFlat}/>
      </Text> */}
      {/* <Text  color="white"
      anchorx={"left"}
      anchorY="top"
      position-y={-2.8}
      fontSize={0.5}
      maxWidth={1.8}>
        iayush.n2@gmail.com
        <meshStandardMaterial
                    color={"white"}
                    onBeforeCompile={fadeOnBeforeCompileFlat}/>
      </Text> */}
     </group>
     <Float floatIntensity={10} rotationIntensity={0.2}>
     <Hot_air_balloon 
     scale={0.2} 
     position={[-9, -1.4, -50]}/>
     </Float>
      
      {/* lamps */}
      <Lamp scale={[0.5,0.5,0.5]} position={window.innerWidth > window.innerHeight?[5.26, -0.6, -54]:[5.26, -1, -54]} />
      <Lamp scale={[0.5,0.5,0.5]} position={window.innerWidth > window.innerHeight?[7.6, -0.6, -63]:[7.6, -1, -63]} />
      <Lamp 
      scale={[0.5,0.5,0.5]} 
      position={window.innerWidth > window.innerHeight?[4.06, -0.6, -70]:[4.06, -1, -70]} />
      <Lamp 
      scale={[0.5,0.5,0.5]} 
      position={window.innerWidth > window.innerHeight?[2.24, -0.6, -79]:[2.24, -1, -79]} />
      <Lamp 
      scale={[0.5,0.5,0.5]} 
      position={window.innerWidth > window.innerHeight?[-0.9, -0.6, -99.7]:[-0.9, -1, -99.7]} />
      <Lamp 
      scale={[0.5,0.5,0.5]} 
      position={window.innerWidth > window.innerHeight?[0.88, -0.6, -99.73]:[0.88, -1, -99.73]} />
      <Lamp 
      scale={[0.5,0.5,0.5]} 
      position={window.innerWidth > window.innerHeight?[1.5, -0.6, -44.73]:[1.5, -1, -44.73]} />
      <Lamp 
      scale={[0.5,0.5,0.5]} 
      position={window.innerWidth > window.innerHeight?[5.4, -0.6, -48.73]:[5.4, -1, -48.73]} />
    
      <Stars 
      position={[6.1, -0.6, -80]}
      radius={window.innerWidth > window.innerHeight?90:200} 
      depth={50} 
      count={5500} 
      factor={4} 
      saturation={0} 
      fade 
      speed={2}/>
      {/* remains */}
      {/* <Remains opacity={2} scale={[3,3,3]} position={[-7.5, -1.2, -50]} /> */}
      {/* bench */}
      <Bench 
      opacity={1} 
      scale={[1, 1, 1]} 
      position={window.innerWidth > window.innerHeight?[-3.8, -0.3, -28]:[-3.8,-0.75,-28]} 
      rotation-y={Math.PI}/>
      <Bench 
      opacity={1} 
      scale={[1, 1, 1]} 
      position={window.innerWidth > window.innerHeight?[-1.2, -0.3, -39]:[-1.2,-0.75,-39]} 
      rotation-y={Math.PI/1.2}/>
      <Bench 
      opacity={1} 
      scale={[1, 1, 1]} 
      position={window.innerWidth > window.innerHeight?[7.2, -0.3, -65]:[7.2,-0.75,-65]} 
      rotation-y={Math.PI/12}/>
      <Bench 
      opacity={1} 
      scale={[1, 1, 1]} 
      position={window.innerWidth > window.innerHeight?[-0.1, -0.3, -82]:[-0.1,-0.75,-82]} 
      rotation-y={Math.PI}/>
      {/* <Human_Sorceror opacity={1} scale={[1, 1, 1]} position={[-3.8, -0.3, -28]} rotation-y={Math.PI} /> */}
      {/* <Bench
      opacity={1} 
      scale={1} 
      position={window.innerWidth > window.innerHeight?[4.6, -0.3, -48]:[4.6, -0.75, -48]} 
      rotation-y={-Math.PI/1.65}/> */}
      {/* <Fence scale={[0.01,0.04,0.1]} position={[0.8, -0.46, -6]} rotation-y={Math.PI/70} /> */}
      {/* CLOUDS */}
      <Cloud opacity={1} scale={[2, 2, 2.5]} position={[-10.8, -1.2, -28]} />
        {/* <Float floatIntensity={10} rotationIntensity={0.2}> */}
        {/* <Cloud 
        opacity={1}  
        scale={[1, 1, 2]} 
        
        position={[4.3, 0.5, -15]}
        rotation-y={Math.PI}/> */}
        {/* </Float> */}
      
      
      <Cloud opacity={1}  scale={[1, 1, 2]} position={[14, -0.4, -60]} rotation-y={Math.PI}/>
      <Cloud
        opacity={0}
        scale={[1,1,1]}
        rotation-y={Math.PI / 3}
        position={[-3.5,0.2,-32]}
      /> 
     
      <Cloud
        opacity={1}
        scale={[0.4, 0.4, 0.4]}
        rotation-y={Math.PI / 9}
        position={[-3,-0.5,-50]}
      /> 

      <Cloud opacity={1} scale={[0.5, 0.5, 0.5]} position={[-1, 1, -63]} />
     {/* <Cloud opacity={0.5} scale={[0.8, 0.8, 0.8]} position={[0, 1, -100]} /> */}
     
    </>
  );
};