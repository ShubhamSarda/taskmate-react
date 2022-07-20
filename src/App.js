import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import AddTask from './components/AddTask';
import ShowTask from './components/ShowTask';

function App() {
  const [task, setTask] = useState("");
  const [tasklist, setTasklist] = useState(JSON.parse(localStorage.getItem('tasklist')) || []);
  const [editid, setEditid] = useState(0);
  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('theme')) || "medium");

  const handleSubmit = (event) => {
    event.preventDefault();    

    if(editid){
      const date = new Date();
      const selectedTask = tasklist.find(task => task.id === editid);
      const updateTask = tasklist.map((e) => (e.id === selectedTask.id ? (e = {id: e.id, name: task, time: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`}) : {id: e.id, name: e.name, time: e.time}));
      setTasklist(updateTask);
      setEditid(0);
      setTask("");
      return;
    }

    if(task){
      const date = new Date();
      setTasklist([...tasklist, {id: date.getTime(), name: task, time: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`}]);
      setTask("");
    }

  }

  const handleEdit = (id) => {
    const selectedTask = tasklist.find(task => task.id === id);
    setTask(selectedTask.name);
    setEditid(id);
  }

  const handleDelete = (id) => {
    const updatedTasklist = tasklist.filter(task => task.id !== id);
    setTasklist(updatedTasklist);
  }

  useEffect(() => {
    localStorage.setItem('tasklist', JSON.stringify(tasklist));
  }, [tasklist]);

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  return (
    <div className={"App " + theme}>
      <div className="container">
        <Header setTheme={setTheme} theme={theme}>
          Taskmate
        </Header>
        <AddTask handleSubmit={handleSubmit} editid={editid} task={task} setTask={setTask}/>
        <ShowTask tasklist={tasklist} setTasklist={setTasklist} handleEdit={handleEdit} handleDelete={handleDelete}/>
      </div>
    </div>
  );
}

export default App;
