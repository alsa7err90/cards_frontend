import { useMemo } from "react";
import { useState } from "react";

export function useAmountAfterFee() {
  
  const [amountAfterFee, setAmountAfterFee] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [ amount, setAmount ] = useState();

  const  changeAmountAfterFeeToCalc = useMemo((val,fee)=>{
   
    setAmountAfterFee(val)
    const total = val*100/(100-fee);
    
    var fixedNum = parseFloat(total).toFixed( 2 );
    setAmount(fixedNum);
    
    setTotalAmount(fixedNum);
  })

  
  const  changeTotalAmountToCalc  = useMemo((val,fee)=>{
    
    setTotalAmount(val)
    const total = val - ( val * (fee / 100)) ;
   
    var fixedNum = parseFloat(total).toFixed( 2 );
    setAmount(fixedNum);
    setAmountAfterFee(fixedNum);
  })

  return {
    amountAfterFee,
    totalAmount,
    changeTotalAmountToCalc,
    changeAmountAfterFeeToCalc,
    amount,
    setAmount,
    setTotalAmount
  };
}
