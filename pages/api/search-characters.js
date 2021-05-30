import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { CHARACTER_SEARCH_QUERY } from "../common/graphql";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/",
  cache: new InMemoryCache(),
});

export default async (req, res) => {
  const { search } = req.body;

  try {
    const { data } = await client.query({
      query: gql`
        ${CHARACTER_SEARCH_QUERY(`filter: { name: "${search}" }`)}
      `,
    });

    res.status(200).json({ characters: data.characters.results, error: null });
  } catch (err) {
    if (err.message === "404: Not Found") {
      res.status(400).json({ characters: null, error: "No character found" });
    } else {
      console.error(err);
      res
        .status(500)
        .json({ characters: null, error: "Internal server error" });
    }
  }
};
