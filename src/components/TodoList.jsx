import React, { useState, useEffect } from 'react';
import '../App.css';
import checkIcon from '../assets/check.svg';
import { Input, Button, Heading, Box, UnorderedList, ListItem, Image, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Text } from '@chakra-ui/react';
import deleteIcon from '../assets/deleted.svg';
import infoIcon from '../assets/info.svg'; // Bilgi ikonu dosya yolunu güncelleyin

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [taskText, setTaskText] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleInputChange = (e) => {
        setTaskText(e.target.value);
    };

    const handleAddTask = () => {
        if (taskText.trim() !== '') {
            const newTask = { text: taskText, id: Date.now(), createdAt: new Date().toLocaleString() };
            const updatedTasks = [...tasks, newTask];
            setTasks(updatedTasks);
            setTaskText('');
        }
    };

    const handleDeleteTask = (taskId) => {
        const deletedTask = tasks.find(task => task.id === taskId);
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));

        const deletedTasks = JSON.parse(localStorage.getItem('deletedTasks')) || [];
        deletedTask.deletedAt = new Date().toLocaleString();
        localStorage.setItem('deletedTasks', JSON.stringify([...deletedTasks, deletedTask]));
    };

    const handleCompleteTask = (taskId) => {
        const completedTask = tasks.find(task => task.id === taskId);
        completedTask.completedAt = new Date().toLocaleString();
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));

        const completedTasks = JSON.parse(localStorage.getItem('completeTasks')) || [];
        localStorage.setItem('completeTasks', JSON.stringify([...completedTasks, completedTask]));
    };

    const handleInfoTask = (task) => {
        setSelectedTask(task);
        onOpen();
    };

    return (
        <>
            <Heading margin="20px">TodoList app</Heading>
            <Box display="flex" flexDirection="row">
                <Input
                    onChange={handleInputChange}
                    value={taskText}
                    className="input"
                    bg="#FD5647"
                    width="250px"
                    placeholder="enter a task"
                    border="2px solid black"
                />
                <Button onClick={handleAddTask} border="2px solid black" marginLeft="10px">
                    Add
                </Button>
            </Box>
            <UnorderedList>
                {tasks.map((task) => (
                    <ListItem key={task.id} className="listItem">
                        {task.text}
                        <Box display="flex">
                            <Button
                                onClick={() => handleCompleteTask(task.id)}
                                width="50px"
                                margin="5px"
                                height="30px"
                                bg="white"
                                border="2px solid black"
                            >
                                <Image src={checkIcon} />
                            </Button>
                            <Button
                                onClick={() => handleDeleteTask(task.id)}
                                width="50px"
                                margin="5px"
                                height="30px"
                                bg="white"
                                border="2px solid black"
                            >
                                <Image src={deleteIcon} />
                            </Button>
                            <Button
                                onClick={() => handleInfoTask(task)}
                                width="50px"
                                margin="5px"
                                height="30px"
                                bg="white"
                                border="2px solid black"
                            >
                                <Image src={infoIcon} />
                            </Button>
                        </Box>
                    </ListItem>
                ))}
            </UnorderedList>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Task Information</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {selectedTask && (
                            <>
                                <Text><strong>Task:</strong> {selectedTask.text}</Text>
                                <Text><strong>Created On:</strong> {selectedTask.createdAt}</Text>
                            </>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default TodoList;
