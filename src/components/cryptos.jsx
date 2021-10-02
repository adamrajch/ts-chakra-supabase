import React, { useEffect, useState } from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";
import {
  Spinner,
  Input,
  SimpleGrid,
  Box,
  Flex,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import StatCard from "../components/cryptoCard/StatCard";

// eslint-disable-next-line react/prop-types
export default function Cryptocurrencies({ simplified }) {
  console.log(simplified);
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filteredData = cryptosList?.data?.coins.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching)
    return (
      <Flex align="center" justify="center" h="100%" w="100%">
        <Spinner color="red.500" />
      </Flex>
    );

  return (
    <>
      {!simplified && (
        <Box className="search-crypto" my={2}>
          <Input
            placeholder="Search cryptos"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            color={mode("black", "white")}
          />
        </Box>
      )}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={["2", "6"]}>
        {cryptos?.map((coin) => (
          <StatCard
            key={coin.id}
            id={coin.id}
            label={coin.name}
            marketCap={coin.marketCap}
            value={coin.price}
            change={coin.change}
            image={coin.iconUrl}
            rank={coin.rank}
          />
        ))}
      </SimpleGrid>
    </>
  );
}
