import { RefObject, useRef, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Badge,
  Icon,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { RiCloseFill } from "react-icons/ri";
import dayjs from "dayjs";
import { ModalClient } from "./ModalClient";
import { Client } from "../../../contexts/Typing";
import { filterClients } from "../../../contexts/Filters";
import { DELETE_CLIENT, GET_CLIENTS_FILTER } from "../../../lib/queries";
import { SentBadge } from "./SentBadge";

function daysFromNow(date: string) {
  const now = dayjs();
  const providedDate = dayjs(date);
  const differenceInDays = now.diff(providedDate, "day");

  if (differenceInDays < 1) return "hoje";
  if (differenceInDays == 1) return "ontem";
  return differenceInDays + " dias";
}

interface ClientsTableType {
  selectedFilter: string;
  clientNumberFilter: string;
  clientNameFilter: string;
}

export function ClientsTable({
  selectedFilter,
  clientNumberFilter,
  clientNameFilter,
}: ClientsTableType) {
  const { data, loading, refetch } = useQuery<{ clientsFiltered: Client[] }>(
    GET_CLIENTS_FILTER,
    {
      variables: {
        clientNumber: clientNumberFilter,
        clientName: clientNameFilter,
      },
    }
  );

  console.log(data)

  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const onClose = () => setIsOpen(false);

  // const filteredClients = data?.clientsFiltered ?? [];
  const filteredClients = data
    ? filterClients(data.clientsFiltered, selectedFilter)
    : [];

  const [deleteClient] = useMutation<
    { deleteClient: string },
    { deleteClientId: string }
  >(DELETE_CLIENT);

  const handleDeleteConfirmation = (clientId: number) => {
    setSelectedClientId(clientId);
    setIsOpen(true);
  };

  const handleDeleteClient = async (id: number) => {
    setIsLoading(true);
    await deleteClient({
      variables: {
        deleteClientId: id.toString(),
      },
    });
    setIsOpen(false);
    await refetch();

    toast({
      title: "Cliente excluído com sucesso!",
      position: "top-right",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setIsLoading(false);
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100%">
        <Spinner />
      </Flex>
    );
  }

  const sortByDischargeDate = (a: Client, b: Client) => {
    const dateA = parseInt(a.dischargeDate);
    const dateB = parseInt(b.dischargeDate);
    return dateB - dateA;
  };

  // const sortedClients = filteredClients.slice().sort(sortByDischargeDate);
  const sortedClients = filteredClients
    ? filteredClients.slice().sort(sortByDischargeDate)
    : [];

  return (
    <>
      <Table colorScheme="whiteAlpha" w="100%">
        <Thead w="100%">
          <Tr color="blue.500">
            <Th>Cliente</Th>
            <Th display={{ base: "none", md: "table-cell" }}>OS</Th>
            <Th>Data da baixa</Th>
            <Th display={{ base: "none", md: "table-cell" }}>Contato</Th>
            <Th width={8}></Th>
          </Tr>
        </Thead>

        <Tbody>
          {sortedClients.map((client) => (
            <Tr key={client.id}>
              <Td
                maxW={{ base: "20px", md: "initial" }}
                fontSize="14px"
                overflow="clip"
              >
                <Flex direction="column" gap="2">
                  <Flex gap="2" fontWeight="bold" color="gray.50">
                    <Badge colorScheme="linkedin">{client.clientNumber}</Badge>
                    <Text>{client.name}</Text>
                  </Flex>
                  <Flex gap="2" w="100%">
                    <SentBadge badgeValue={client.sentToday} />
                    <SentBadge badgeValue={client.sentThreeDays} />
                    <SentBadge badgeValue={client.sentSevenDays} />
                    <SentBadge badgeValue={client.sentOneMonth} />
                    <SentBadge badgeValue={client.sentThreeMonths} />
                    <SentBadge badgeValue={client.sentSixMonths} />
                  </Flex>
                </Flex>
              </Td>

              <Td display={{ base: "none", md: "table-cell" }}>
                {client.serviceOrder}
              </Td>
              <Td>
                <Badge colorScheme="green" p="1" w="50%" textAlign="center">
                  {daysFromNow(client.dischargeDate)}
                  <Text fontSize="11px">
                    {dayjs(client.dischargeDate).format("DD/MM")}
                  </Text>
                </Badge>
              </Td>
              <Td display={{ base: "none", md: "table-cell" }}>
                {client.phone}
              </Td>
              <Td>
                <Flex gap="1">
                  <ModalClient
                    id={client.id}
                    name={client.name}
                    phone={client.phone}
                    serviceOrder={client.serviceOrder}
                    clientNumber={client.clientNumber}
                    dischargeDate={dayjs(client.dischargeDate).format(
                      "DD/MM/YYYY"
                    )}
                    note={client.note}
                    sentToday={client.sentToday}
                    sentThreeDays={client.sentThreeDays}
                    sentSevenDays={client.sentSevenDays}
                    sentOneMonth={client.sentOneMonth}
                    sentThreeMonths={client.sentThreeMonths}
                    sentSixMonths={client.sentSixMonths}
                  />
                  <Button
                    size="sm"
                    onClick={() => {
                      if (typeof client.id === "string") {
                        handleDeleteConfirmation(client.id);
                      } else {
                        console.error("Client ID is undefined");
                      }
                    }}
                  >
                    <Icon as={RiCloseFill} />
                  </Button>
                  <AlertDialog
                    isOpen={isOpen && selectedClientId === client.id}
                    leastDestructiveRef={
                      cancelRef as RefObject<HTMLButtonElement>
                    }
                    onClose={onClose}
                  >
                    <AlertDialogOverlay>
                      <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                          Confirmar exclusão
                        </AlertDialogHeader>
                        <AlertDialogBody>
                          Tem certeza de que deseja excluir este cliente?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                          <Button ref={cancelRef} onClick={onClose}>
                            Cancelar
                          </Button>
                          <Button
                            ml={3}
                            colorScheme="red"
                            isLoading={isLoading}
                            onClick={async () => {
                              if (typeof client.id === "string") {
                                await handleDeleteClient(client.id);
                              } else {
                                console.error("Client ID is undefined");
                                onClose();
                              }
                            }}
                          >
                            Excluir
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialogOverlay>
                  </AlertDialog>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}
