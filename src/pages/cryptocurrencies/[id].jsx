import { Dashboard } from "@components/dashboard/App";
import Crypto from "../../components/crypto";
import { useGetCryptoDetailsQuery } from "../../services/cryptoApi";
import { Flex, Spinner } from "@chakra-ui/react";
// eslint-disable-next-line react/prop-types
export default function CryptoPage({ coinID }) {
  const { data, isFetching } = useGetCryptoDetailsQuery(coinID);

  return (
    <Dashboard>
      {isFetching && (
        <Flex align="center" justify="center" h="100%" w="100%">
          <Spinner color="red.500" />
        </Flex>
      )}
      {!isFetching && data && <Crypto coin={data.data.coin} coinId={coinID} />}
    </Dashboard>
  );
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      coinID: params.id,
    },
  };
}
