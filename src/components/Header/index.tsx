import { Flex, Img, Heading } from "@chakra-ui/react";


export default function Header() {

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="7rem"
      mx="auto"
      mt="4"
      px="6"
      align="center"
      justify={{ base:"space-between", md:"center"}}
      bg="gray.800"
      rounded="10"
      gap="14"
    >
      <Img
        h="60px"
        src="https://www.aparbs.com.br/Aparbs%20Dark%203.svg" >
      </Img>

      <Heading>
        Aparbs Dash
      </Heading>
    </Flex>
  );
}
