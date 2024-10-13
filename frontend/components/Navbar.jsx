import React from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  useColorMode,
  Switch,
  Icon,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { FaSun, FaMoon } from "react-icons/fa";

const Links = ["Home", "About", "Services", "Contact"];

const NavLink = ({ children }) => (
  <Button
    px={2}
    py={1}
    rounded={"md"}
    bg="transparent"
    _hover={{ bg: "gray.200" }}
    _dark={{ _hover: { bg: "gray.600" } }}
    _focus={{ boxShadow: "none" }}
    href={"#"}
  >
    {children}
  </Button>
);

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      bg={colorMode === "dark" ? "gray.700" : "gray.100"}
      px={4}
      width="100%"
      transition="background-color 0.5s ease, color 0.5s ease"
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box fontWeight="bold">Duly Noted</Box>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />

        <HStack
          spacing={8}
          alignItems={"center"}
          display={{ base: "none", md: "flex" }}
        >
          {Links.map((link) => (
            <NavLink key={link}>{link}</NavLink>
          ))}
        </HStack>

        <HStack spacing={2}>
          <Icon
            as={colorMode === "dark" ? FaSun : FaMoon}
            color={colorMode === "dark" ? "yellow.400" : "blue.500"}
          />
          <Switch
            isChecked={colorMode === "dark"}
            onChange={toggleColorMode}
            colorScheme="teal"
          />
        </HStack>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
