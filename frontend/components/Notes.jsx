import React, { useEffect, useState } from "react";
import { Text, Box, Textarea, Button, Input, useToast } from "@chakra-ui/react";

const Notes = ({ selectedNote, setSelectedNote, fetchNotes }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const toast = useToast();

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [selectedNote]);

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/notes/${selectedNote.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title, // Use local title state
            content: content, // Use local content state
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update note");
      }

      const updatedNote = await response.json();
      setSelectedNote(updatedNote); // Update selected note to the newly updated note
      fetchNotes(); // Refresh the notes after updating

      toast({
        title: "Note updated.",
        description: "Your note has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating note:", error);
      toast({
        title: "Update failed.",
        description: "An error occurred while updating your note.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      w={{ base: "100%", md: "70%" }}
      p={4}
      borderLeft="1px"
      borderColor="gray.600"
    >
      {selectedNote ? (
        <>
          <Input
            fontSize="2xl"
            fontWeight="bold"
            mb={4}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type your note content here..."
            size="lg"
            mb={4}
          />
          <Button colorScheme="teal" onClick={handleSave}>
            Save Changes
          </Button>
        </>
      ) : (
        <Text fontSize="lg">Select a note to view its content.</Text>
      )}
    </Box>
  );
};

export default Notes;
