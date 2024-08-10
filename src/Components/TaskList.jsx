import { Stack } from '@mui/material';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, handleCompleteTask, openEditModal, handleDeleteTask }) => {
  return (
    <Stack spacing={2}>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          handleCompleteTask={handleCompleteTask}
          openEditModal={openEditModal}
          handleDeleteTask={handleDeleteTask}
        />
      ))}
    </Stack>
  );
};

export default TaskList;
