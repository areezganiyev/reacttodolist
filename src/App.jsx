import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Box, UnorderedList, ListItem, Image } from '@chakra-ui/react';
import TodoList from './components/TodoList';
import CompleteTask from './components/CompleteTask';
import DeletedTasks from './components/DeletedTasks';
import Home from './assets/home.svg'
import CompletedIcon from './assets/completed.svg';
import DeletedIcon from './assets/deleted.svg';







function App() {
  return (
      <Box className="container" minHeight="100vh" backgroundColor="#FFC567" width="100vw" display="flex" alignItems="center" justifyContent="center">
          <Box className="sidebar" display="flex" flexDirection="column" border="2px solid black" margin="20px">
              <UnorderedList listStyleType="none" display="flex" flexDirection="column">
                  <ListItem className="menulist">
                      <Link to="/" className="menubutton">
                          <Image src={Home} />
                      </Link>
                  </ListItem>
                  <ListItem className="menulist">
                      <Link to="/complete" className="menubutton">
                          <Image src={CompletedIcon} />
                      </Link>
                  </ListItem>
                  <ListItem className="menulist">
                      <Link to="/deleted" className="menubutton">
                          <Image src={DeletedIcon} />
                      </Link>
                  </ListItem>
              </UnorderedList>
          </Box>
          <Box className="todolist" bg="#058CD7" maxWidth="450px" minHeight="600px" border="2px solid black" borderRadius="15px" display="flex" alignItems="center" flexDirection="column">
              <Routes>
                  <Route path="/" element={<TodoList />} />
                  <Route path="/complete" element={<CompleteTask />} />
                  <Route path="/deleted" element={<DeletedTasks />} />
              </Routes>
          </Box>
      </Box>
  );
}

export default App;
