import {
  Box,
  Container,
  Flex,
  Heading,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { DarkModeSwitch } from "@components/darkModeSwitch";
import React from "react";
import { MobileHamburgerMenu } from "./MobileHamburgerMenu";
import { NavMenu } from "./NavMenu";
import { useMobileMenuState } from "./useMobileMenuState";

export const Dashboard = ({ children }: any) => {
  const { isMenuOpen, toggle } = useMobileMenuState();

  return (
    <Flex
      direction="column"
      bg={mode("gray.100", "gray.800")}
      minH="100vh"
      h="100%"
    >
      <Flex align="center" bg="blue.600" color="white" px="6" minH="16">
        <Flex justify="space-between" align="center" w="full">
          <MobileHamburgerMenu onClick={toggle} isOpen={isMenuOpen} />
          <NavMenu.Mobile isOpen={isMenuOpen} />

          {/* Desktop Logo placement */}
          <Heading size="lg" mr={3}>
            Crypto
          </Heading>

          {/* Desktop Navigation Menu */}
          <NavMenu.Desktop />

          {/* Mobile Logo placement */}

          <DarkModeSwitch />
        </Flex>
      </Flex>

      <Box as="main" py={[2, 8]} flex="1" h="100%">
        <Container maxW="7xl">
          <Box
            // bg={mode("white", "gray.700")}
            p="2"
            // rounded="lg"
            // shadow="base"
          >
            <Box color={mode("gray.200", "gray.600")} rounded="lg" h="100%">
              {children}
            </Box>
          </Box>
        </Container>
      </Box>
    </Flex>
  );
};
