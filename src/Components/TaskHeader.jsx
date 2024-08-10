import { Box, Typography, Button, Chip } from '@mui/material';

const TaskHeader = ({ handleClickOpen, onFilterChange, currentFilter }) => {
  const handleChipClick = (filter) => {
    onFilterChange(filter);
  };

  return (
    <>
    
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight="bold">Today's Task</Typography>
        <Button 
          variant="contained" 
          sx={{ borderRadius: '12px', backgroundColor: '#E0EDFF', color: '#1976d2' }}
          onClick={handleClickOpen}
        >
          + New Task
        </Button>
      </Box>

      <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '16px' }}>

      </Typography>

      <Box display="flex" alignItems="center" sx={{ marginBottom: '16px' }}>
        <Chip 
          label="All" 
          color={currentFilter === 'All' ? 'primary' : 'default'}
          sx={{ marginRight: '8px', backgroundColor: currentFilter === 'All' ? '#E0EDFF' : '#F3F4F6', color: '#1976d2' }} 
          onClick={() => handleChipClick('All')}
        />
        <Chip 
          label="Open" 
          color={currentFilter === 'Open' ? 'primary' : 'default'}
          sx={{ marginRight: '8px', backgroundColor: currentFilter === 'Open' ? '#E0EDFF' : '#F3F4F6' }} 
          onClick={() => handleChipClick('Open')}
        />
        <Chip 
          label="Closed" 
          color={currentFilter === 'Closed' ? 'primary' : 'default'}
          sx={{ backgroundColor: currentFilter === 'Closed' ? '#E0EDFF' : '#F3F4F6' }} 
          onClick={() => handleChipClick('Closed')}
        />
      </Box>
    </>
  );
};

export default TaskHeader;
