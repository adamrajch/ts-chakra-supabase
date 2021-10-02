import {
  Box,
  BoxProps,
  Container,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";

export const PageHeader = (props: BoxProps) => (
  <Box
    bg={useColorModeValue("white", "gray.900")}
    pt="8"
    shadow="sm"
    {...props}
  >
    <Container maxW="7xl">
      <Heading size="lg" mb="3">
        Forms
      </Heading>
    </Container>
  </Box>
);
