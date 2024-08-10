import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

const TaskForm = ({
  open,
  handleClose,
  taskName,
  taskDescription,
  setTaskName,
  setTaskDescription,
  handleSave,
  editMode,
}) => {
  const [nameError, setNameError] = useState(false);

  const validateTaskName = (name) => {
    if (!name.trim()) {
      setNameError(true);
      return false;
    }
    setNameError(false);
    return true;
  };

  const onSave = () => {
    if (validateTaskName(taskName)) {
      handleSave();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "16px", // Rounded corners for the modal
        },
      }}
    >
      <DialogTitle
        sx={{
          fontSize: "18px",
          fontWeight: "bold",
          padding: "8px 24px",
          bgcolor: "#F6F7FB", // Background color similar to header
        }}
      >
        {editMode ? "Edit Task" : "Add New Task"}
      </DialogTitle>
      <DialogContent
        sx={{
          padding: "24px",
          bgcolor: "#FFFFFF", // White background for content
        }}
      >
        <TextField
          autoFocus
          label="Task Name"
          fullWidth
          size="small"
          value={taskName}
          onChange={(e) => {
            setTaskName(e.target.value);
            validateTaskName(e.target.value); // Validate on change
          }}
          error={nameError}
          helperText={nameError ? "Task name is required" : ""}
          sx={{
            margin: "9px 0px 12px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px", // Slightly rounded input fields
            },
          }}
        />
        <TextField
          label="Description"
          fullWidth
          size="small"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          sx={{
            marginBottom: "0px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px", // Slightly rounded input fields
            },
          }}
        />
      </DialogContent>
      <DialogActions
        sx={{
          padding: "7px 16px",
          bgcolor: "#F6F7FB", // Light background for actions
          borderBottomLeftRadius: "16px",
          borderBottomRightRadius: "16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={handleClose}
          sx={{
            color: "#1976d2", // Primary color
            textTransform: "none",
            borderRadius: "12px",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onSave}
          variant="contained"
          sx={{
            backgroundColor: "#1976d2", // Primary color
            color: "#ffffff",
            textTransform: "none",
            borderRadius: "12px",
            "&:hover": {
              backgroundColor: "#1565c0", // Slightly darker on hover
            },
          }}
        >
          {editMode ? "Update Task" : "Add Task"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskForm;
