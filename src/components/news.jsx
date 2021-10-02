import React, { useState } from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import moment from "moment";
import {
  Spinner,
  SimpleGrid,
  Box,
  Select,
  Heading,
  Flex,
  Avatar,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";
// eslint-disable-next-line react/prop-types
export default function News({ simplified }) {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");

  const { data, isFetching: isFetchingData } = useGetCryptosQuery(100);
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });

  if (isFetching || isFetchingData)
    return (
      <Flex align="center" justify="center" h="100%" w="100%">
        <Spinner color="red.500" />
      </Flex>
    );

  return (
    <>
      {!simplified && (
        <Box className="search-crypto" my={2}>
          <Select
            placeholder="Select a Crypto"
            onChange={(e) => setNewsCategory(e.target.value)}
            value={newsCategory}
            color={mode("black", "white")}
          >
            <option value="Cryptocurency"> Cryptocurrency</option>
            {data?.data?.coins?.map((currency) => (
              <option value={currency.name} key={currency.name}>
                {currency.name}
              </option>
            ))}
          </Select>
        </Box>
      )}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={["2", "6"]}>
        {cryptoNews.value.map((news, i) => (
          <Flex
            flexDir="column"
            key={news.url}
            as="a"
            href={news.url}
            target="_blank"
            rel="noreferrer"
            bg={mode("white", "gray.700")}
            rounded="8px"
            shadow="base"
            color={mode("gray.500", "gray.400")}
            p="4"
          >
            <Flex>
              <Heading size="md" color={mode("gray.800", "white")}>
                {news.name}
              </Heading>
            </Flex>
            <Text my={2} color={mode("gray.500", "gray.400")}>
              {news.description.length > 100
                ? `${news.description.substring(0, 100)}...`
                : news.description}
            </Text>
            <Flex align="center" mt="auto">
              <Avatar
                src={
                  news.provider[0]?.image?.thumbnail?.contentUrl || demoImage
                }
                alt=""
                mr={2}
              />
              <Text>{news.provider[0]?.name}</Text>
              <Text flexGrow={1} textAlign="right">
                {moment(news.datePublished).startOf("ss").fromNow()}
              </Text>
            </Flex>
          </Flex>
        ))}
      </SimpleGrid>
    </>
  );
}
