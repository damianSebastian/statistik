import React from "react";
import '../App.css';
export default function Input ({onChange, description, value, type="text"}) {
    return(
        <div className="inputContainer">
          
          <input type={type} onChange={onChange} value={value} placeholder={description}/>
        </div>
    );
}