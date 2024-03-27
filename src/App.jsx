import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Fisheye, ScrollControls } from "@react-three/drei";

import { Overlay } from "./components/Overlay";
import { usePlay } from "./context/Play";


function App() {

  const {play,end} = usePlay();

  return (
    <>
    
      <Canvas camera={{
        position: [0, 0, 5],
        fov: 30,
      }}
      style={{
        display: 'block', // Ensure Canvas behaves as a block element
        height: '100vh',
        width: '100%',
      }}>
        

       
        <color attach="background" args={["#ececec"]} />
        <ScrollControls 
        pages={play && !end ? 20:0} damping={0.5} style={{
          top:"12px",
          left:"0px",
          bottom:"10px",
          right:"10px",
          width:"auto",
          height:"auto",
          animation:"fadeIn 2.4s ease-in-out 1.2s forwards",
          opacity:0,
        }}>
          {/* <Sky sunPosition={[100, 20, 10]} /> */}
          <ambientLight intensity={0.3} />
          <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
          <Experience />
        </ScrollControls>
       
      </Canvas>
     
      <Overlay/>
      
    </>
  );
}

export default App;