import React from "react";
import '../App.css';
export default function Input ({onChange, description, value}) {
    return(
        <div className="inputContainer">
          
          <input type="text" onChange={onChange} value={value} placeholder={description}/>
        </div>
    );
}