import { usePlay } from "../../context/Play"
import "./path_nav.css"
export const Theme = ()=>{
    const {theme,setTheme} = usePlay()
    
    return (
        <div 
        className={`events-container ${theme === 1?"events--container--appear":""}`}
        >
            <p>Theme</p>
            <button onClick={()=>{setTheme(2)}}>Continue</button>
        </div>
    )
}

