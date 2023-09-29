import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { ITask, TaskStatus } from "@/utils/interfaces";
import { API_BASE_URL } from "@/utils/api";

export default function ToDoBoardPage() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get<ITask[]>(`${API_BASE_URL}/tasks`);
        setTasks(data);
      } catch (error) {
        console.error("Error get all todos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error while delete todo:", error);
    }
  };

  if (isLoading) {
    return (
      <Container
        component="main"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container component="main">
      <Typography variant="h2" component="h1" gutterBottom>
        ToDo Board
      </Typography>

      <Link href="/create-task" passHref>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          style={{ marginBottom: "16px" }}
        >
          Create Task
        </Button>
      </Link>

      {Object.values(TaskStatus).map((status) => (
        <Paper
          key={status}
          elevation={3}
          style={{ marginBottom: "16px", padding: "16px" }}
        >
          <Typography variant="h5" component="h2" gutterBottom>
            {status}
          </Typography>
          <List>
            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <ListItem key={task.id}>
                  <ListItemText
                    primary={task.title}
                    secondary={`ID: ${task.id}`}
                  />
                  <ListItemSecondaryAction>
                    <Link href={`/edit-task/${task.id}`} passHref>
                      <IconButton edge="end" aria-label="edit">
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => deleteTask(task.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
          </List>
        </Paper>
      ))}
    </Container>
  );
}
