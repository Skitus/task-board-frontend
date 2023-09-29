import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState, ChangeEvent, FormEvent } from "react";
import { TaskStatus } from "@/utils/interfaces";
import { API_BASE_URL } from "@/utils/api";
import { INDEX_PATH } from "@/utils/route";

export default function CreateTaskPage() {
  const [title, setTitle] = useState<string>("");
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.ToDo);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/tasks/create`, { title, status });
      router.push(INDEX_PATH);
    } catch (error) {
      console.error("Error whilte creating todo:", error);
    }
  };

  const handleBack = () => {
    router.push(INDEX_PATH);
  };

  return (
    <Container component="main">
      <Typography variant="h2" component="h1" gutterBottom>
        Create Task
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Status"
          select
          value={status}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setStatus(e.target.value as TaskStatus)
          }
          required
          fullWidth
          margin="normal"
        >
          {Object.values(TaskStatus).map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
        <Button
          onClick={handleBack}
          variant="contained"
          style={{ marginLeft: "8px" }}
        >
          Back
        </Button>
      </Box>
    </Container>
  );
}
