import { Box, useColorModeValue as mode } from "@chakra-ui/react";
import * as React from "react";
import { Stat } from "./Stat";
import { StatLabel } from "./StatLabel";
import { StatNumber } from "./StatNumber";

export const Statistic = ({ label, value }: any) => (
  <Box bg={mode("gray.50", "gray.800")} w="100%">
    <Stat key={label}>
      <StatLabel>{label}</StatLabel>
      <StatNumber>{value}</StatNumber>
    </Stat>
  </Box>
);
