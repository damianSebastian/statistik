import '../App.css';
import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/InputText";
import ProgressBarsScreen from '../components/ProgressBarsScreen';

let records=[];
const recordsKey = 'records';
loadData();
function loadData() {
  if(localStorage.getItem(recordsKey)!==null) {
    records= localStorage.getItem(recordsKey).split(',');     
    console.log(records);     
  }
}

function App() {
  const [identifier, setIdentifier] = useState(records[0]);
  const [inputValue, setInputValue] = useState('');
  const [delValue, setDelValue] = useState('');

  function addCategory(input) {
    if(input !=='') {

      records.push(input);
      localStorage.setItem(recordsKey, records);
      setInputValue('');
    } else {
      alert('Introduceti o valoare');
    }
    
  }

  function deleteCategory(input) {
    let temp = records.findIndex(el => el === input);
    if(temp !== -1)  {
      records.splice(temp,1);
      localStorage.setItem(recordsKey,records);
      localStorage.removeItem(input);
      setDelValue('');
      setIdentifier(records[0]);
    } else {
      alert('Nu exista acest element');
    }
  }

  return (
    <div className="app">
    
      <div className='side-menu'>        
          <Input description={'Add category'} onChange={e => setInputValue(e.target.value)} value={inputValue}/>        
          <Button description={'Add category'} func={() => addCategory(inputValue)}/>
          <Input description={'Delete category'} onChange={e => setDelValue(e.target.value)} value={delValue}/>
          <Button description={'Delete category'} func={()=> deleteCategory(delValue)}/>
          {records.map(el => <Button key={el} func={()=> setIdentifier(el)} description={el}/>)}    
      </div>     
      <ProgressBarsScreen 
    identifier={identifier} 
    />    
    </div>
  )
}

export default App;
