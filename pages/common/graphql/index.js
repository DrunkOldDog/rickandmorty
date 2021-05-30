export const CHARACTER_SEARCH_QUERY = (query) => `
  query {
    characters(${query}) {
      info {
        count
        pages
      }
      results {
        id
        name
        image
        location {
          id
          name
        }
        origin {
          id
          name
        }
        episode {
          id
          episode
          air_date
        }
      }
    }
  }
`;
