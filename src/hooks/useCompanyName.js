import { useState } from "react";



export function useCompanyName(){
    const [companyNampe , setCompanyName]=useState("");
  
    const changeCompanyName = (e)=>{
      const note = e.target.value;
      setCompanyName(note); 
    };
  
    return {
      companyNampe,
      changeCompanyName,
    };
  }
