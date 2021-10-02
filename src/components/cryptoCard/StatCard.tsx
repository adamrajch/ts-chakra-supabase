import {
  Box,
  Flex,
  Grid,
  Image,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import millify from "millify";
import * as React from "react";
import { Indicator } from "./Indicator";
interface StatCardProps {
  label: string;
  marketCap: number;
  value: number;
  change: number;
  image: string;
  rank: number;
  id: number;
}

export default function StatCard(props: StatCardProps) {
  const { label, marketCap, value, change, image, rank, id } = props;
  const isNegative = change < 0;

  return (
    <Flex
      direction="column"
      align="center"
      p="4"
      bg={mode("white", "gray.700")}
      rounded="8px"
      shadow="base"
      color={mode("gray.500", "gray.400")}
      textAlign="center"
      as="a"
      href={`/cryptocurrencies/${id}`}
    >
      <Box w="100%">
        <Grid
          templateColumns="repeat(3, 1fr)"
          justifyItems="center"
          alignItems="center"
        >
          <Text textAlign="left" marginRight="auto">
            {rank}
          </Text>
          <Text
            fontSize="xs"
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="wide"
            gridColumnStart="2"
          >
            {label}
          </Text>
          <Image src={image} h="30px" w="30px" marginLeft="auto" />
        </Grid>

        <Flex align="center" w="100%" justify="center">
          <Text
            fontSize="3xl"
            color={mode("gray.500", "gray.400")}
            as="span"
            fontWeight="bold"
            mr={1}
          >
            $
          </Text>
          <Text
            as="span"
            color={mode("gray.800", "white")}
            fontSize="4xl"
            fontWeight="bold"
            lineHeight="1"
          >
            {millify(value)}
          </Text>
        </Flex>

        <Text fontWeight="bold" fontSize="md" my={2}>
          Market Cap: {millify(marketCap)}
        </Text>
        <Indicator type={isNegative ? "down" : "up"} value={`${change}%`} />
      </Box>
    </Flex>
  );
}
