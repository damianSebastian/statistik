import { useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Lister from './Lister';
import Button from './Button';
import '../App.css';

function getDaysAgo(n) {
  let time = new Date().getTime();
  let changedDate = new Date(time - (n * 24 * 60 * 60 * 1000));
  return changedDate;
}
let records = [];

function ProgressBarsScreen({identifier}) {
    
  const [inWeek, setInWeek] = useState(0);
  const [inMonth, setInMonth] = useState(0);
  const [in6Months, setIn6Months] = useState(0);
  const [inYear, setInYear] = useState(0);

  useEffect(()=> {
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
    saveData();
    updateLifts();
  }
  function updateLifts() {
    lastPeriod(7,setInWeek);
    lastPeriod(30,setInMonth);
    lastPeriod(180, setIn6Months);
    lastPeriod(365, setInYear);
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
    saveData();
    updateLifts();
  }
  
  function handleDayPressed(input) {
    let temp = false;
    for(let i=0; i<records.length; i++){
      if(records[i].getDate() === input.getDate() &&records[i].getMonth()===input.getMonth() && records[i].getFullYear() ===input.getFullYear()) {
        temp = true;
        break;
      }
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
          <Button func={()=> inputRecord(new Date())}
          description={'Take a record'}/>
          <Button func={() => deletRecords()} description={'Delete records'}/>
        </div>      
      </div>
      <Calendar  value={new Date()} 
      onClickDay={(date) =>handleDayPressed(date) } 
        tileClassName={({date}) => {
          for(let i=0; i<records.length; i++){
            if(records[i].getDate() === date.getDate() &&records[i].getMonth()===date.getMonth() && records[i].getFullYear() ===date.getFullYear()) {
              return 'highlight';
            }
          }
        }}
      />
      
    </div>
  );
}

export default ProgressBarsScreen;