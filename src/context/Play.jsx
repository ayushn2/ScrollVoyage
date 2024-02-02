import { createContext, useContext, useState } from "react";

const Context = createContext();

export const PlayProvider = ({ children }) => {
  const [play, setPlay] = useState(false);
  const [end, setEnd] = useState(false);
  const [hasScroll, setHasScroll] = useState(false);
  const [events,setEvents] = useState(0)
  const [theme,setTheme] = useState(0)
  const [navDisplay,setNavDisplay] = useState(false)
  
  return (
    <Context.Provider
      value={{
        play,
        setPlay,
        end,
        setEnd,
        hasScroll,
        setHasScroll,
        navDisplay,
        setNavDisplay,
        events,
        setEvents,
        theme,
        setTheme
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const usePlay = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("usePlay must be used within a PlayProvider");
  }

  return context;
};