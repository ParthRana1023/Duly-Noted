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
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  const fetchNotes = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/notes");
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Create new note function
  const createNote = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Untitled Note", // Provide a default title
          content: "", // Provide default content
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text(); // Get error message from response
        throw new Error(`Failed to create note: ${errorMessage}`);
      }

      const newNote = await response.json();
      setNotes((prevNotes) => [newNote, ...prevNotes]); // Add the new note to the list
      setSelectedNote(newNote); // Select the newly created note
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  useEffect(() => {
    fetchNotes(); // Fetch notes on initial render
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <VStack minH="100svh" spacing={4}>
        <Navbar />
        <Container maxW="container.lg" p={0} flex="1">
          <Flex direction={{ base: "column", md: "row" }} h="full">
            <Sidebar
              notes={notes}
              onSelectNote={setSelectedNote}
              onCreateNote={createNote}
            />
            <Notes
              selectedNote={selectedNote}
              setSelectedNote={setSelectedNote}
              fetchNotes={fetchNotes} // Pass fetchNotes to Notes component
            />
          </Flex>
        </Container>
      </VStack>
    </ChakraProvider>
  );
}

export default App;
