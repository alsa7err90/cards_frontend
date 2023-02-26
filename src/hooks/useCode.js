import { useState } from "react";

export function useCode(){
    const [code , setCode ]=useState();
    const changeCode = (e)=>{
        const note = e.target.value;
        setCode(note); 
    }
    return {
        code , changeCode
    }
}