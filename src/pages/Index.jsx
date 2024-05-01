import React, { useState } from 'react';
import { Box, Input, Button, List, ListItem, ListIcon, IconButton, useToast } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No input',
        description: "Please enter a task.",
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isCompleted: false }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Box p={5}>
      <Input
        placeholder="Add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addTask()}
      />
      <Button onClick={addTask} colorScheme="blue" mt={2}>Add Task</Button>
      <List spacing={3} mt={4}>
        {tasks.map(task => (
          <ListItem key={task.id} d="flex" justifyContent="space-between" alignItems="center">
            <Box as="span" textDecoration={task.isCompleted ? 'line-through' : 'none'}>
              {task.text}
            </Box>
            <Box>
              <IconButton
                icon={<FaCheckCircle />}
                onClick={() => toggleCompletion(task.id)}
                colorScheme={task.isCompleted ? 'green' : 'gray'}
                aria-label="Mark as completed"
              />
              <IconButton
                icon={<FaTrash />}
                onClick={() => deleteTask(task.id)}
                colorScheme="red"
                ml={2}
                aria-label="Delete task"
              />
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;