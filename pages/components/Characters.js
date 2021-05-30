import { Image } from "@chakra-ui/image";
import { Text } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/layout";
import { SimpleGrid } from "@chakra-ui/layout";

export default function Characters({ characters }) {
  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={40}>
      {characters?.map(({ id, image, name, origin, location }) => (
        <div key={id}>
          <Image src={image} width={300} height={300} alt={name} />
          <Heading as="h4" align="center" size="md">
            {name}
          </Heading>
          <Text align="center">Origin: {origin.name}</Text>
          <Text align="center">Location: {location.name}</Text>
        </div>
      ))}
    </SimpleGrid>
  );
}
