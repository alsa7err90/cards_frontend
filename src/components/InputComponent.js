import React from "react";
import Input from "react-validation/build/input";

function InputComponent(props) {
  return (
    <>
    <div className="row pt-1 " > 
     
        <div className="col-3">
        <p className="form-label">
          {props.label}
        </p> 
        </div>
        <div className="col-9">
        {props.type === "tel" ?
       ( 
         <Input
         type="tel"
         className="form-control "
         name={props.name}
         pattern={props.pattern}
         validations={props.validations}
         value={props.value}
         onChange={props.onChange} 
         placeholder={props.placeholder}
         required={props.isRequired}
         maxLength={props.maxLength} 
        //  pattern="[0-9]{10}"
       />):
       
        <Input
          type={props.type}
          className={props.className}
          name={props.name}
          validations={props.validations}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          required={props.isRequired}
          step={props.step} 
           
        />}
        
        {props.msg && (
          <div id={props.name} className="form-text">
            {props.msg}
          </div>
        )}
        </div>
      </div>
      
    </>
  );
}

export default InputComponent;
