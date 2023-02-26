import '../App.css';
import { useState } from "react";
import { Button, Autocomplete,TextField, List, ListItem, ListItemButton,ListItemText,IconButton } from '@mui/material';
import DeleteIcon  from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
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
  const [input, setInput] = useState('');
  const [delValue, setDelValue] = useState('');

  

  function addCategory(input) {
    if(input !=='') {
      records.push(input);
      localStorage.setItem(recordsKey, records);
      setInput('');
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
        <div className='inputComponent'>
          <TextField className='inputField' id="outlined-basic" label="Name of Category" variant="outlined" value={input} onChange={e => setInput(e.target.value)} margin="normal"/>
          <IconButton aria-label='add' color='primary' size='large' onClick={()=> addCategory(input)}>
              <AddIcon/>
          </IconButton>       

        </div>
        <div className='inputComponent'>
          <Autocomplete

            id="controllable-states-demo" 
            options={records}
            sx={{ width: 200 }}
            getOptionLabel={(option) => option.toLowerCase()}
            value={delValue}
            onChange={(event, newValue) => {
            setDelValue(newValue);
      }}
            renderInput={(params) => <TextField {...params} label="Categories" />}
          />
          <IconButton aria-label='delete' color='error' size='large' onClick={()=> {
            deleteCategory(delValue);           
            }}>
              <DeleteIcon />
            </IconButton>    

        </div>
              <List>
              {records.map(el => <ListItem className='listItem' disablePadding key={el}>
                                    <ListItemButton className="listItemButton" onClick={()=> setIdentifier(el)}>
                                      <ListItemText primary={<span className='listItemText'>{el}</span>}/>
                                    </ListItemButton>
                                  </ListItem>
                )}               
              </List>
              
      </div>     
      <ProgressBarsScreen 
    identifier={identifier} 
    />       
    </div>
  )
}

export default App;
