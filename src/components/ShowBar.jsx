import { useState, useEffect } from 'react';

import Lister from './Lister';
import Button from './Button';
import '../App.css';

function getDaysAgo(n) {
  let time = new Date().getTime();
  let changedDate = new Date(time - (n * 24 * 60 * 60 * 1000));
  return changedDate;
}
let records = [
  
];
function ShowBar({identifier}) {
    
    const [id, setId] = useState(0);
    const [inWeek, setInWeek] = useState(0);
    const [inMonth, setInMonth] = useState(0);
    const [in6Months, setIn6Months] = useState(0);
    const [inYear, setInYear] = useState(0);
  
    useEffect(()=> {
      loadData();
    },[])
  
    function loadData() {
      if(JSON.parse(localStorage.getItem(identifier)) !== null) {
        records = JSON.parse(localStorage.getItem(identifier));
        setId(JSON.parse(localStorage.getItem('id'+identifier)));
        console.log('apelare din useEffect ' + identifier);
        resetDates();
      }
    }
    
    function resetDates() { 
        for(let i = 0; i<records.length; i++) {
          records[i].record = new Date(records[i].record);
        }  
    }
  
    function inputRecord() {
      records.push({
        id:id,
        record: new Date(),
      })
      setId(id+1);
      saveData();
    }
  
    function saveData() {
      localStorage.setItem(identifier,JSON.stringify(records));
      localStorage.setItem('id'+identifier,id);
    }
    function get() {   
      console.log(records);   
    }
  
    function deletRecords() {
      localStorage.clear();
      records = [];
      setId(0);
    }
    
    function lastPeriod(n, setValue) {
      let start = getDaysAgo(n).getTime();
      let end = new Date().getTime();
      let result = 0;      
      for(let i = 0; i<records.length; i++) {
        let temp = records[i].record.getTime();
        if(temp >= start && temp <= end) {
            result ++;         
        }
      }
      setValue(result);   
    }
    
  
    return (
      <div id={identifier} className="container">
        <div className='listerContainer'>
          <Lister function={()=> lastPeriod(7,setInWeek)} buttDescription={'Get last week'}
          level={inWeek} maxLevel={7}/>
          <Lister function={()=> lastPeriod(30,setInMonth)} buttDescription={'Get last month'}
          level={inMonth} maxLevel={30}/>
          <Lister function ={() => lastPeriod(180,setIn6Months)} buttDescription={'Get last 6 months'}
          level={in6Months} maxLevel={180}/>
          <Lister function ={() => lastPeriod(360,setInYear)} buttDescription={'Get last year'}
          level={inYear} maxLevel={365}/>
        </div>
        <div className='buttonContainer'>
          <Button function={()=> inputRecord()} description={'Take a record'}/>
          <Button function={() => deletRecords()} description={'Delete records'}/>


        </div>
        
      </div>
    );
}
export default ShowBar;