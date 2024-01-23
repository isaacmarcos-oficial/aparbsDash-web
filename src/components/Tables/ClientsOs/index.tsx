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
} from "@chakra-ui/react";
import { RefObject, useRef, useState } from "react";
import moment from "moment";
import "moment/locale/pt-br";
import { ModalClient } from "./ModalClient";
import { RiCloseFill } from "react-icons/ri";
import { useQuery, useMutation } from "@apollo/client";
import { Client } from "../../../contexts/Typing";
import { DELETE_CLIENT, GET_CLIENTS } from "../../../lib/queries";
import { SentBadge } from "./SentBadge";
import { filterClients } from "../../../contexts/Filters";

export function ClientsTable({ selectedFilter }: { selectedFilter: string }) {
  const { data, refetch } = useQuery<{ clients: Client[] }>(GET_CLIENTS);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const onClose = () => setIsOpen(false);

  const filteredClients = data
    ? filterClients(data.clients, selectedFilter)
    : [];

  const [deleteClient] = useMutation<
    { deleteClient: string },
    { deleteClientId: string }
  >(DELETE_CLIENT);

  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

  const handleDeleteConfirmation = (clientId: number) => {
    setSelectedClientId(clientId);
    setIsOpen(true);
  };

  const handleDeleteClient = async (id: number) => {
    setIsLoading(true)
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
    setIsLoading(false)
  };

  const sortByDischargeDate = (a: Client, b: Client) => {
    const dateA = parseInt(a.dischargeDate);
    const dateB = parseInt(b.dischargeDate);
    return dateB - dateA;
  };

  const sortedClients = filteredClients.slice().sort(sortByDischargeDate);

  return (
    <>
      <Table colorScheme="whiteAlpha" w="100%">
        <Thead w="100%">
          <Tr color="blue.500">
            <Th>Cliente</Th>
            <Th display={{ base: "none", md: "table-cell" }}>Veículo</Th>
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
                  <Text fontWeight="bold">{client.name}</Text>
                  <Flex gap="2">
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
                {client.vehicle}
              </Td>
              <Td display={{ base: "none", md: "table-cell" }}>
                {client.serviceOrder}
              </Td>
              <Td>
                <Badge colorScheme="green" p="1" w="100%" textAlign="center">
                  {moment(parseInt(client.dischargeDate))
                    .locale("pt-br")
                    .fromNow()}
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
                    vehicle={client.vehicle}
                    dischargeDate={moment(
                      parseInt(client.dischargeDate)
                    ).format("DD/MM/YYYY")}
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
                      if (typeof client.id === 'string') {
                        handleDeleteConfirmation(client.id);
                      } else {
                        // Tratar o caso de client.id ser undefined
                        console.error('Client ID is undefined');
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
                              if (typeof client.id === 'string') {
                                await handleDeleteClient(client.id);
                              } else {
                                console.error('Client ID is undefined');
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
