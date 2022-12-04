
import ShowBar from "./components/ShowBar";
import './App.css';
import { useEffect, useState } from "react";
import Button from "./components/Button";

let vector=['Dance','Sport'];
function App() {
  const [identifier, setIdentifier] = useState("Dance");
  
  useEffect(()=> {
    console.log(identifier);
  },[identifier])


  return (
    <div className="app">
      <div className="menu">
        {vector.map(el => <Button func={()=> setIdentifier(el)} description={el}/>)}      
      </div>     
      <ShowBar 
    identifier={identifier} 
    />    
    </div>
  )
}

export default App;
