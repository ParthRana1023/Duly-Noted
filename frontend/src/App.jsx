import React, { useState, useEffect } from "react";
import {
  VStack,
  Container,
  Flex,
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Notes from "../components/Notes";

const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.800" : "white",
        color: props.colorMode === "dark" ? "white" : "black",
        transition: "background-color 0.5s ease, color 0.5s ease",
      },
    }),
  },
});

function App() {
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("/api/notes")
      .then((response) => response.json())
      .then((data) => setNotes(data.notes))
      .catch((error) => console.error("Error fetching notes:", error));
  }, []);

  const handleCreateNote = () => {
    const newNote = {
      id: notes.length + 1,
      title: "New Note",
      content: "This is a new note.",
    };
    setNotes([...notes, newNote]);
  };

  return (
    <ChakraProvider theme={theme}>
      <VStack minH="100vh" spacing={4}>
        <Navbar />
        <Container maxW="container.lg" p={0} flex="1">
          <Flex direction={{ base: "column", md: "row" }} h="full">
            <Sidebar
              notes={notes}
              onSelectNote={setSelectedNote}
              onCreateNote={handleCreateNote}
            />
            <Notes selectedNote={selectedNote} />
          </Flex>
        </Container>
      </VStack>
    </ChakraProvider>
  );
}

export default App;
