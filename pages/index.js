import { useState } from "react";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import Head from "next/head";

import Characters from "./components/Characters";
import {
  Flex,
  Box,
  Heading,
  Stack,
  useToast,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import { CHARACTER_SEARCH_QUERY } from "./common/graphql";
import axios from "axios";

export default function Home({ characters: initialState }) {
  const toast = useToast();
  const [search, setSearch] = useState("");
  const [characters, setCharacters] = useState(initialState);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const results = await axios.post("/api/search-characters", { search });

    const { characters, error } = results.data;
    if (error) {
      toast({
        position: "bottom",
        title: "An error occured",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      setCharacters(characters);
    }
  };

  const handleReset = (e) => {
    setSearch("");
    setCharacters(initialState);
  };

  return (
    <Flex direction="column" justify="center" align="center">
      <Head>
        <title>Rick and Morty Fun Test!</title>
      </Head>

      <Box
        mb={4}
        flexDirection="column"
        align="center"
        justifyContent="center"
        py={8}
      >
        <Heading as="h1" size="2xl" mb={8}>
          Rick and Morty
        </Heading>

        <form
          data-testid="search-box"
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          <Stack maxWidth={350} width="100%" mb={8} isInline>
            <Input
              placeholder="Search"
              value={search}
              border="none"
              onChange={handleInputChange}
            />

            <IconButton
              type="reset"
              colorScheme="red"
              aria-label="Reset input field"
              icon={<CloseIcon />}
              disabled={!!!search}
            />

            <IconButton
              type="submit"
              colorScheme="blue"
              aria-label="Search inputed text"
              icon={<SearchIcon />}
              disabled={!!!search}
            />
          </Stack>
        </form>

        <Characters characters={characters} />
      </Box>
    </Flex>
  );
}

export const getStaticProps = async () => {
  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql/",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      ${CHARACTER_SEARCH_QUERY("page: 1")}
    `,
  });

  return {
    props: {
      characters: data.characters.results,
    },
  };
};
