import { useState } from "react";


export function useUrlWebsite(){
    const [urlWebsite,setUrlWebsite]=useState("");
  
    const changeUrlWebsite = (e)=>{
      const note = e.target.value;
      setUrlWebsite(note); 
    }
  
    return {
      urlWebsite,changeUrlWebsite 
    };
  
  }