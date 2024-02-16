import { Flex, Heading, Input, Select, TableContainer } from "@chakra-ui/react";
import Header from "./components/Header";
import { ClientsTable } from "./components/Tables/ClientsOs";
import { ModalNewClient } from "./components/Tables/ClientsOs/ModalNewClient";
import { useState } from "react";

const filterOptions = [
  { label: "Todos os clientes", value: "Todos" },
  { label: "Hoje", value: "hoje" },
  // { label: "3 dias", value: "3 dias" },
  { label: "7 dias", value: "7 dias" },
  { label: "30 dias", value: "30 dias" },
  { label: "90 dias", value: "90 dias" },
  { label: "180 dias", value: "180 dias" },
];

function App() {
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const [clientNumberFilter, setClientNumberFilter] = useState("");
  const [clientNameFilter, setClientNameFilter] = useState("");

  return (
    <Flex
      direction="column"
      minH="100vh"
      bg="gray.900"
      color="gray.50"
      px={{ base: "4", md: "none" }}
    >
      <Header />

      <Flex
        w="100%"
        maxWidth={1480}
        my="6"
        mx="auto"
        flex="1"
        p="6"
        gap="4"
        align="flex-start"
        bg="gray.800"
        rounded={8}
        direction="column"
      >
        <Flex justify="space-between" w="100%" align="center">
          <Heading size="lg">Clientes</Heading>
          <Flex direction={{ base: "column", md: "row" }} gap="4">
            <Flex gap="2">
              <Input
                size="sm"
                colorScheme="blackAlpha"
                borderColor="gray.500"
                borderRadius="5"
                w="120px"
                placeholder="Nº do Cliente"
                type="number"
                value={clientNumberFilter}
                onChange={(e) => setClientNumberFilter(e.target.value)}
              />

              <Input
                size="sm"
                colorScheme="blackAlpha"
                borderColor="gray.500"
                borderRadius="5"
                w="120px"
                placeholder="Nome do Cliente"
                type="text"
                value={clientNameFilter}
                onChange={(e) => setClientNameFilter(e.target.value)}
              />
            </Flex>

            <Flex gap="2">
              <Flex>
              <Select
                size="sm"
                colorScheme="blackAlpha"
                borderColor="gray.500"
                borderRadius="5"
                w="150px"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                {filterOptions.map((option) => (
                  <option
                    key={option.value}
                    style={{ background: "#181B23", color: "#D1D2DC" }}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </Select>
              </Flex>
              <ModalNewClient />
            </Flex>
          </Flex>
        </Flex>

        <TableContainer w="100%" h="100%">
          <ClientsTable
            selectedFilter={selectedFilter}
            clientNumberFilter={clientNumberFilter}
            clientNameFilter={clientNameFilter}
          />
        </TableContainer>

        <Flex></Flex>
      </Flex>
    </Flex>
  );
}

export default App;
