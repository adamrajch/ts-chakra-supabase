/* eslint-disable new-cap */
/* eslint-disable react/prop-types */
import HTMLReactParser from "html-react-parser";
import millify from "millify";
import {
  Flex,
  Heading,
  Box,
  Text,
  Container,
  Divider,
  useColorModeValue as mode,
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useGetCryptoHistoryQuery } from "../services/cryptoApi";
import LineChart from "./lineChart";
export default function Crypto(props) {
  // eslint-disable-next-line react/prop-types
  const { coin, coinId } = props;
  const [timeperiod, setTimeperiod] = useState("7d");
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timeperiod,
  });
  //   const { data, isFetching } = useGetCryptoDetailsQuery(cryptoID);
  console.log("my coin: ", coin);

  const cryptoDetails = coin;
  //   console.log(data);
  console.log(cryptoDetails.price);

  const time = ["24h", "7d", "30d", "1y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
    },
    { title: "Rank", value: cryptoDetails.rank },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`,
    },
    {
      title: "Market Cap",
      value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails.numberOfMarkets,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails.numberOfExchanges,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails.approvedSupply ? "Yes" : "No",
    },
    {
      title: "Total Supply",
      value: `$ ${millify(cryptoDetails.totalSupply)}`,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(cryptoDetails.circulatingSupply)}`,
    },
  ];

  return (
    <>
      <Heading textAlign="center" color={mode("black", "white")}>
        {coin.name} ({coin.slug})
      </Heading>
      <Text textAlign="center" color={mode("black", "white")}>
        {cryptoDetails.name} live price in US Dollar (USD). View value
        statistics, market cap and supply.
      </Text>
      <Select
        placeholder="Select Timeperiod"
        value={timeperiod}
        onChange={(e) => setTimeperiod(e.target.value)}
        color={mode("black", "white")}
        w={["90%", "33%"]}
        mx="auto"
        my={3}
      >
        {time.map((date) => (
          <option key={date}>{date}</option>
        ))}
      </Select>
      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails.price)}
        coinName={cryptoDetails.name}
      />
      <Flex flexDir={["column", "row"]} justify="space-between">
        <Container
          // bg={mode("white", "gray.700")}
          rounded="8px"
          shadow="base"
          color={mode("gray.500", "gray.400")}
          p="4"
          maxW="md"
        >
          <Heading textAlign="center" color={mode("black", "white")}>
            Overview
          </Heading>

          {stats.map(({ title, value }) => (
            <Box py={2} key={title}>
              <Flex justify="space-between" mb={1}>
                <Text>{title}</Text>
                <Text color={mode("black", "white")}>{value}</Text>
              </Flex>
              <Divider />
            </Box>
          ))}
        </Container>
        <Container
          // bg={mode("white", "gray.700")}
          rounded="8px"
          shadow="base"
          color={mode("gray.500", "gray.400")}
          p="4"
          maxW="md"
        >
          <Heading textAlign="center" color={mode("black", "white")}>
            Other Stats
          </Heading>

          {genericStats.map(({ title, value }) => (
            <Box py={2} key={title}>
              <Flex justify="space-between" mb={1}>
                <Text>{title}</Text>
                <Text color={mode("black", "white")}>{value}</Text>
              </Flex>
              <Divider />
            </Box>
          ))}
        </Container>
      </Flex>

      <Container color={mode("black", "white")} maxW="4xl">
        <Heading textAlign="center" size="lg">
          Details
        </Heading>
        {HTMLReactParser(cryptoDetails.description)}
      </Container>
      <Container
        // bg={mode("white", "gray.700")}
        rounded="8px"
        shadow="base"
        color={mode("gray.500", "gray.400")}
        p="4"
        maxW="md"
        my={2}
      >
        <Heading textAlign="center" color={mode("black", "white")}>
          Links
        </Heading>

        {cryptoDetails.links?.map((link) => (
          <Box py={2} key={link.name}>
            <Flex justify="space-between" mb={1}>
              <Text>{link.type}</Text>
              <Text
                as="a"
                href={link.url}
                target="_blank"
                rel="noreferrer"
                color={mode("black", "white")}
              >
                {link.name}
              </Text>
            </Flex>
            <Divider />
          </Box>
        ))}
      </Container>
    </>
  );
}
