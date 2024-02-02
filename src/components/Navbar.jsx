import "./Nav.css"
import { useState } from "react"
import Nav from "./Nav"
import { usePlay } from "../context/Play";
import useSound from 'use-sound';
import music from "/music/lost-soul.mp3"
import { useEffect } from "react";


const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);
  
    const toggle = () => setPlaying(!playing);
  
    useEffect(() => {
        playing ? audio.play() : audio.pause();
      },
      [playing]
    );
  
    useEffect(() => {
      audio.addEventListener('ended', () => setPlaying(false));
      return () => {
        audio.removeEventListener('ended', () => setPlaying(false));
      };
    }, []);
  
    return [playing, toggle];
  };

const Navbar = ()=>{
    const [playing, toggle] = useAudio(music);
    const [setPlay,{ stop, isPlaying }] = useSound(music);
    const {navDisplay,setNavDisplay} = usePlay()
    const {play} = usePlay()
    return(
        <div className={`${navDisplay ?"navbar--active":"navbar"}r`}
        style={{opacity:play?1:0}}>
                    {/* <input id="checkbox" type="checkbox" 
                     onClick={()=>{
                        setNavDisplay(!navDisplay)
                    }}
                    
                     />
                        <label style={{
                            background:"none",
                            border:"none",
                            position:"fixed",
                            right:"5%",
                            top:"5%",
                            zIndex:10,
                            pointerEvents:"auto",
                            }} 
                            className="toggle" 
                            for="checkbox">
                            <div id="bar1" class="bars"></div>
                            <div id="bar2" class="bars"></div>
                            <div id="bar3" class="bars"></div>
                        </label> */}
                   
                   <div className="about-button"
                //    onClick={()=>{
                //     setNavDisplay(!navDisplay)
                // }}
                style={{
                  background:"none",
                  border:"none",
                  position:"fixed",
                  right:"5%",
                  top:"5%",
                  zIndex:10,
                  pointerEvents:"auto",
                  margin:0,
                  padding:0,
                  }}>
                    <div className="about-button-wrapper">
                    <div 
                    className="text"
                    
                    >About</div>
                        <span className="icon">
                        <p>About</p>
                        </span>
                    </div>
                    </div>

                       
                            {/* <div className={`loader`}
                            style={{
                            
                              border:"none",
                              position:"fixed",
                              left:"5%",
                              top:"5%",
                              zIndex:10,
                              cursor:"pointer",
                              pointerEvents:"auto",
                              width:"100px"
                              }} 
                              onClick={toggle}>
                              <div className={`dot ${playing ? "dot-click":""}`}></div>
                              <div className={`dot ${playing ? "dot-click":""}`}></div>
                              <div className={`dot ${playing ? "dot-click":""}`}></div>
                            </div> */}

                            <div className={`spinner ${playing?"spinner-click":""}`}
                            style={{
                            
                              border:"none",
                              position:"fixed",
                              left:"5%",
                              top:"3%",
                              zIndex:10,
                              cursor:"pointer",
                              pointerEvents:"auto",
                              
                              }} 
                              onClick={toggle}
                            >
                                <div className={`spinner1`}></div>
                            </div>
                    
                        <div style={{
                            opacity: navDisplay ? 1 : 0,
                            transition: 'all 1s ease-in-out',
                            position: 'fixed',
                            top: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(82, 23, 122, 0.8)',
                            overflow: 'hidden',
                            pointerEvents:navDisplay?"auto":"none"
                            //   transition:"all 1s" // Optional: Ensure that the content is hidden outside the container
                            }}>
                        <Nav />
                        </div>


                    </div>
    )
}

export default Navbar;