import { useEffect } from "react";

const Topper = ({ children }) => {

  useEffect(() => {
    if (window.history?.scrollRestoration) 
        window.history.scrollRestoration = 'manual' 
    window.scrollTo({top: 0, behavior: 'auto'})
  }, [])

  return children
}

export default Topper;