import React from "react";
import { Line } from "react-chartjs-2";
import {
  Box,
  Flex,
  Text,
  Heading,
  useColorModeValue as mode,
} from "@chakra-ui/react";

// eslint-disable-next-line react/prop-types
const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(
      new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <Box w="100%">
      <Flex
        justify="space-between"
        align="center"
        w="100%"
        color={mode("black", "white")}
      >
        <Heading>{coinName} Price Chart </Heading>
        <Flex>
          <Text mx={2}>Change: {coinHistory?.data?.change}%</Text>
          <Text>
            Current {coinName} Price: ${currentPrice}
          </Text>
        </Flex>
      </Flex>
      <Line data={data} options={options} />
    </Box>
  );
};

export default LineChart;
