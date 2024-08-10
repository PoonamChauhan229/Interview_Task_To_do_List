import { useState, useEffect } from 'react';
import { Container, Box, Divider } from '@mui/material';
import TaskHeader from './Components/TaskHeader';
import TaskList from './Components/TaskList';
import TaskForm from './Components/TaskForm';



const App = () => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [taskId, setTaskId] = useState(null);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All'); // New state for filter

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setTaskName('');
    setTaskDescription('');
  };

  const handleSaveTask = () => {
    
    if (editMode) {
      const taskToUpdate = tasks.find((element) => element.id === taskId);

      if (taskToUpdate) {
        console.log("Updating task:", taskToUpdate);
        
        const updatedTasks = tasks.map(task =>
          task.id === taskId
            ? { ...task, name: taskName, description: taskDescription }
            : task
        );
        setTasks(updatedTasks);
      } else {
        console.error("Task not found, unable to update.");
      }
    } else {
      // Adding new task
      const newTask = {
        id: Date.now(),
        name: taskName,
        description: taskDescription,
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }
  
    handleClose();
  };
  

  const openEditModal = (task) => {
    setEditMode(true);
    setTaskId(task.id);
    setTaskName(task.name);
    setTaskDescription(task.description);
    setOpen(true);
  };

  const handleDeleteTask = (id) => {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
  };

  const handleCompleteTask = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') return true;
    if (filter === 'Open') return !task.completed;
    if (filter === 'Closed') return task.completed;
  });

  return (
    <>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#F6F7FB"
      // paddingTop="40px"
    >
      <Container
        maxWidth="sm"
        sx={{
          borderRadius: '16px',
          padding: '24px',
          bgcolor: '#fff',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        }}
      >
        <TaskHeader
          handleClickOpen={handleClickOpen}
          onFilterChange={setFilter}
          currentFilter={filter}
        />
        <Divider sx={{ marginBottom: '16px' }} />
        <TaskList
          tasks={filteredTasks}
          handleCompleteTask={handleCompleteTask}
          openEditModal={openEditModal}
          handleDeleteTask={handleDeleteTask}
        />
        <TaskForm
          open={open}
          handleClose={handleClose}
          taskName={taskName}
          taskDescription={taskDescription}
          setTaskName={setTaskName}
          setTaskDescription={setTaskDescription}
          handleSave={handleSaveTask}
          editMode={editMode}
        />
      </Container>
    </Box>

</>
  );
};

export default App;
