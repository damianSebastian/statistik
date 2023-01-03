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
  const [showCalendar, setShowCalendar] = useState(false);
  const [markedDates, setMarkedDates] = useState([]);

  useEffect(()=> {
    loadData();   
  });

  function loadData() {
    if(JSON.parse(localStorage.getItem(identifier)) !== null) {
      console.log(localStorage.getItem(identifier));
      records = JSON.parse(localStorage.getItem(identifier));     
      console.log('apelare din useEffect ' + identifier);
      getMarkedDates(records);
      resetDates();      
    } else {
      records=[];
    }
    updateLifts();
  }
  function getMarkedDates(input) {
    let temp =[];
    for(let i = 0; i <input.length;i++) {
      temp.push(new Date(input[i]));
    }
    setMarkedDates(temp);
  }
  function resetDates() { 
      for(let i = 0; i<records.length; i++) {
        records[i] = new Date(records[i]);
      }  
  }

  function inputRecord() {
    records.push(new Date());
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

  return (
    <div  className="container">
      <Button description={'Toggle Calendar'} func={() => setShowCalendar(!showCalendar)}/>
      {showCalendar && <Calendar  value={new Date()} 
        tileClassName={({date,view}) => {
          for(let i=0; i<markedDates.length; i++){
            if(markedDates[i].getDate() === date.getDate() &&markedDates[i].getMonth()===date.getMonth() && markedDates[i].getFullYear() ===date.getFullYear()) {
              return 'highlight';
            }
          }
        }}
      />}
      <p className='statusText title'>{identifier}</p>
      <div className='listerContainer'>
        <Lister level={inWeek} maxLevel={7}/>
        <Lister level={inMonth} maxLevel={30}/>
        <Lister level={in6Months} maxLevel={180}/>
        <Lister level={inYear} maxLevel={365}/>
      </div>
      <div className='buttonContainer'>
        <Button func={()=> inputRecord()}
        description={'Take a record'}/>
        <Button func={() => deletRecords()} description={'Delete records'}/>
      </div>      
    </div>
  );
}

export default ProgressBarsScreen;