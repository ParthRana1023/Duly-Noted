import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Notes = ({ selectedNote }) => {
  return (
    <Box
      w={{ base: "100%", md: "70%" }}
      p={4}
      borderLeft="1px"
      borderColor="gray.600"
    >
      {selectedNote ? (
        <>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            {selectedNote.title}
          </Text>
          <Text mb={2}>
            Last Updated: {new Date(selectedNote.last_updated).toLocaleString()}
          </Text>
          <Text>{selectedNote.content}</Text>
        </>
      ) : (
        <Text fontSize="lg">Welcome to Duly Noted</Text>
      )}
    </Box>
  );
};

export default Notes;
