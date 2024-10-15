import React from "react";
import { Box, Stack, Button, Text, useColorMode, Icon } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

const Sidebar = ({ notes = [], onSelectNote, onCreateNote }) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      w={{ base: "100%", md: "30%" }}
      p={4}
      borderRight="1px"
      borderColor={colorMode === "dark" ? "gray.600" : "gray.300"}
      bg={colorMode === "light" ? "white" : "transparent"}
    >
      <Text
        fontSize="lg"
        fontWeight="bold"
        mb={4}
        color={colorMode === "dark" ? "white" : "black"}
      >
        Notes
      </Text>

      <Button
        leftIcon={<Icon as={FaPlus} />}
        colorScheme="teal"
        variant="solid"
        mb={4}
        onClick={onCreateNote} // Call the createNote function when the button is clicked
        w="full"
      >
        Create New Note
      </Button>

      <Stack spacing={3}>
        {notes.map((note) => (
          <Button
            key={note.id}
            variant="ghost"
            onClick={() => onSelectNote(note)}
            justifyContent="flex-start"
            color={colorMode === "dark" ? "white" : "black"}
            _hover={{ bg: colorMode === "dark" ? "gray.600" : "gray.200" }}
          >
            {note.title}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default Sidebar;
