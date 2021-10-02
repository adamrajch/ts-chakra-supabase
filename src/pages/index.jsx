import {
  Flex,
  Stack,
  Heading,
  Box,
  Spinner,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { Dashboard } from "@components/dashboard/App";
import { Statistic } from "@components/stats/App";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Cryptocurrencies from "../components/cryptos";
import millify from "millify";
import Link from "next/link";
export default function Home() {
  const { data, isFetching } = useGetCryptosQuery(10);

  const globalStats = data?.data?.stats;
  if (isFetching)
    return (
      <Flex align="center" justify="center" h="100%" w="100%">
        <Spinner color="red.500" />
      </Flex>
    );
  return (
    <Dashboard>
      {!isFetching && data && (
        <>
          <Box mb={4}>
            <Heading color={mode("black", "white")}>Global Stats</Heading>
          </Box>
          <Stack direction={["column", "row"]} spacing={2}>
            <Statistic
              label="Total Cryptocurrencies"
              value={globalStats.total}
            />
            <Statistic
              label="Total Exchanges"
              value={millify(globalStats.totalExchanges)}
            />
            <Statistic
              label="Total Market Cap"
              value={millify(globalStats.totalMarketCap)}
            />
            <Statistic
              label="24hr Volume"
              value={millify(globalStats.total24hVolume)}
            />
            <Statistic
              label="Total Markets"
              value={millify(globalStats.totalMarkets)}
            />
          </Stack>
          <Flex align="center" justify="space-between" my={4}>
            <Heading color={mode("black", "white")}>Top Coins</Heading>
            <Link href="/cryptocurrencies">See more</Link>
          </Flex>

          <Cryptocurrencies simplified />
        </>
      )}
    </Dashboard>
  );
}
