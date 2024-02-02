import { usePlay } from "../../context/Play"
import "./path_nav.css"
export const Events = ()=>{
    const {events,setEvents} = usePlay()
    
    return (
        <div 
        className={`events-container ${events === 1?"events--container--appear":""}`}
        >
            <p>EVENTS</p>
            <button onClick={()=>{setEvents(2)}}>Continue</button>
        </div>
    )
}