import React, { useState, useEffect } from 'react';
import { Box, UnorderedList, ListItem, Button, Image, Heading, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Text } from '@chakra-ui/react';
import deleteIcon from '../assets/deleted.svg'; // Silme ikonu dosya yolunu güncelleyin
import infoIcon from '../assets/info.svg'; // Bilgi ikonu dosya yolunu güncelleyin
import '../App.css';

function CompleteTask() {
    const [completeTasks, setCompleteTasks] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        const storedCompleteTasks = JSON.parse(localStorage.getItem('completeTasks'));
        if (storedCompleteTasks) {
            setCompleteTasks(storedCompleteTasks);
        }
    }, []);

    const handlePermanentDelete = (taskId) => {
        const updatedTasks = completeTasks.filter((task) => task.id !== taskId);
        setCompleteTasks(updatedTasks);
        localStorage.setItem('completeTasks', JSON.stringify(updatedTasks));
    };

    const handleInfoTask = (task) => {
        setSelectedTask(task);
        onOpen();
    };

    return (
        <Box>
            <Heading margin="20px">Completed Tasks</Heading>
            <UnorderedList>
                {completeTasks.map((task) => (
                    <ListItem key={task.id} className='listItem'>
                        {task.text}
                        <Box display="flex" justifyContent="flex-end">
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
                            <Button
                                onClick={() => handlePermanentDelete(task.id)}
                                width="50px"
                                margin="5px"
                                height="30px"
                                bg="white"
                                border="2px solid black"
                            >
                                <Image src={deleteIcon} />
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
                                <Text><strong>Completed On:</strong> {selectedTask.completedAt}</Text>
                            </>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default CompleteTask;
