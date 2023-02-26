import { useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Lister from './Lister';
import {Button} from '@mui/material';

import '../App.css';

function getDaysAgo(n) {
  let time = new Date().getTime();
  let changedDate = new Date(time - (n * 24 * 60 * 60 * 1000));
  return changedDate;
}
let records = [];
let recordsMap = new Map();

function ProgressBarsScreen({identifier}) {
    
  const [inWeek, setInWeek] = useState(0);
  const [inMonth, setInMonth] = useState(0);
  const [in6Months, setIn6Months] = useState(0);
  const [inYear, setInYear] = useState(0);

  useEffect(()=> {
    recordsMap.clear();
    loadData();   
  },[identifier]);

  function loadData() {
    if(JSON.parse(localStorage.getItem(identifier)) !== null) {    
      records = JSON.parse(localStorage.getItem(identifier));     
      console.log('apelare din useEffect ' + identifier);
      resetDates();      
    } else {
      records=[];
    }
    updateLifts();
  }

  function resetDates() { 
      for(let i = 0; i<records.length; i++) {
        records[i] = new Date(records[i]);
      }  
  }

  function inputRecord(input) {
    records.push(input);
    updateLifts();
    saveData();
    
  }

  function saveData() {
    localStorage.setItem(identifier,JSON.stringify(records));
  }

  function deletRecords() {
    records = [];
    recordsMap.clear();
    saveData();
    updateLifts();
  }
  function updateLifts() {
    resetMap();
    lastPeriod(7,setInWeek);
    lastPeriod(30,setInMonth);
    lastPeriod(180, setIn6Months);
    lastPeriod(365, setInYear);
  }
  function resetMap() {
    records.forEach((r)=> recordsMap.set(r.toDateString(),true));
    
  }
  
  function lastPeriod(n, setValue) {
    let start = getDaysAgo(n).getTime();
    let end = new Date().getTime();
    let result = 0;      
    for(let i = 0; i<records.length; i++) {
      let temp = records[i].getTime();
      if(temp >= start && temp <= end) {
          result ++;         
      }
    }
    setValue(result);   
  }
  function deleteSpecificDay(input) {
    let newRec = records.filter((record) => (record.getDate() !== input.getDate() || record.getMonth()!==input.getMonth() || record.getFullYear() !==input.getFullYear()));
    records = newRec;
    recordsMap.clear();
    saveData();
    updateLifts();
  }
  
  function handleDayPressed(input) {
    let temp = false;
    if(recordsMap.has(input.toDateString())) {
      temp = true;
      
    }
    
    if(temp) {
      const confirm = window.confirm('Are you sure you want to delete this day?');
      if(confirm) {      
        deleteSpecificDay(input);
      }
    } else {
      const confirm = window.confirm('Are you sure you want to add this day?');
      if (confirm) {
        inputRecord(input);
      }

    }
  }
  return (
    <div className='container'>
      <div  className="progressBars">
        <p className='statusText title'>{identifier}</p>
        <div className='listerContainer'>
          <Lister level={inWeek} maxLevel={7}/>
          <Lister level={inMonth} maxLevel={30}/>
          <Lister level={in6Months} maxLevel={180}/>
          <Lister level={inYear} maxLevel={365}/>
        </div>
        <div className='buttonContainer'>
          <Button variant="contained" onClick={()=> inputRecord(new Date())} color="success">Take a record</Button>
          <Button variant='contained' onClick={() => deletRecords()} color="error">Delete records</Button>
        </div>      
      </div>
      <Calendar value={new Date()} 
      onClickDay={(date) =>handleDayPressed(date) } 
      tileClassName={({date}) => {
          if(recordsMap.has(date.toDateString())) {
            return 'highlight';
          }
          return '';
        }}
      />
      
    </div>
  );
}

export default ProgressBarsScreen;

// tileClassName={({date}) => {
//   for(let i=0; i<records.length; i++){
//     if(records[i].getDate() === date.getDate() &&records[i].getMonth()===date.getMonth() && records[i].getFullYear() ===date.getFullYear()) {
//       return 'highlight';
//     }
//   }
// }}