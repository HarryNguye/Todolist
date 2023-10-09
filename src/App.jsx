import React, { useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Stack from '@mui/material/Stack'; 
import Header from './components/Header';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


function App() {

  const [todo, setTodo] = React.useState({
    description: '',
    date: '',
    priority: ''
  });
  const [todos, setTodos] = React.useState([]);
  const gridRef = useRef();


const [value, setValue] = useState('one');

const handleChange = (event, value) => {
  setValue(value);
}

  const [columnDefs] = useState([
    { field: 'description', sortable: true, filter: true, floatingFilter: true },
    {
      field: 'priority', sortable: true, filter: true, floatingFilter: true,
      cellStyle: params => params.value == "high" ? { color: 'red' } : { color: 'black' }
    },
    { field: 'date', sortable: true, filter: true, floatingFilter: true }

  ]);

  const handleDate = (date) => {
    const formattedDate = date.format("DD-MM-YYYY")
    setTodo({ ...todo, date: formattedDate });
  };



  const addTodo = () => {
    setTodos([...todos, todo]);
    setTodo({ description: '', date: '', priority: '' });
  }

  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      const row = gridRef.current.getSelectedNodes()[0].id;
      setTodos(todos.filter((item, index) => row != index));
    }
    else {
      alert('Select at least one row');
    }
  }

  return (
    <Container>
      <Header />
    <Stack direction="row" justifyContent="center">
    <Tabs value={value} onChange={handleChange}>
    <Tab value='Home' label='Home'/>
    <Tab value='Todolist' label='Todolist'/>
    </Tabs>
    </Stack>

    <Stack justifyContent="center" alignitems="center">
        {value === 'Home' && <div>Home</div>}
        {value === 'Todolist' && <div>{App}</div>}

    </Stack>


      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        mt={2}
      >
        <TextField
          value={todo.description}
          onChange={e => setTodo({ ...todo, description: e.target.value })}
          label='Description'
        />

        <TextField
          label="Priority"
          value={todo.priority}
          onChange={e => setTodo({ ...todo, priority: e.target.value })}
        />

       {/*<TextField
          label="date"
          value={todo.date}
          onChange={e => setTodo({ ...todo, date: e.target.value })}
        /> */}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker 
        label="Date" 
        value={dayjs(todo.date, "DD-MM-YYYY")} 
        onChange={handleDate} 
        format="DD-MM-YYYY" 
        slotProps={{ textField: { variant: 'standard', error: false } }}  />
      </LocalizationProvider>
      
        <Button variant="contained" onClick={addTodo}>Add Todo</Button>
        <Button variant="contained" color="error" onClick={deleteTodo}>Delete</Button>
      </Stack>
      <Stack
        alignItems="center"
        justifyContent="center">
        <div className='ag-theme-material ' style={{ width: 600, height: 500 }}>
          <AgGridReact
            ref={gridRef}
            onGridReady={params => gridRef.current = params.api}
            rowSelection='single'
            columnDefs={columnDefs}
            rowData={todos}
            animateRows={true}

          />
        </div>
      </Stack>
    </Container>
  )
}

export default App