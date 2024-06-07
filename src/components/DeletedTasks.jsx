import React, { useState, useEffect } from 'react';
import { Box, UnorderedList, Heading, ListItem, Button, Image, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Text } from '@chakra-ui/react';
import deleteIcon from '../assets/deleted.svg'; // Silme ikonu dosya yolunu güncelleyin
import infoIcon from '../assets/info.svg'; // Bilgi ikonu dosya yolunu güncelleyin
import '../App.css';

function DeletedTasks() {
    const [deletedTasks, setDeletedTasks] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        const storedDeletedTasks = JSON.parse(localStorage.getItem('deletedTasks'));
        if (storedDeletedTasks) {
            setDeletedTasks(storedDeletedTasks);
        }
    }, []);

    const handlePermanentDelete = (taskId) => {
        const updatedTasks = deletedTasks.filter((task) => task.id !== taskId);
        setDeletedTasks(updatedTasks);
        localStorage.setItem('deletedTasks', JSON.stringify(updatedTasks));
    };

    const handleInfoTask = (task) => {
        setSelectedTask(task);
        onOpen();
    };

    return (
        <Box>
            <Heading margin="20px">Deleted Tasks</Heading>
            <UnorderedList>
                {deletedTasks.map((task) => (
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
                                <Text><strong>Deleted On:</strong> {selectedTask.deletedAt}</Text>
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

export default DeletedTasks;
