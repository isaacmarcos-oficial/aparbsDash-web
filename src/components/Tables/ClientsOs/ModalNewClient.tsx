import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Icon,
  Input,
  Text,
  Modal,
  ModalBody,
  ModalContent,
  Stack,
  useDisclosure,
  useToast,
  ModalCloseButton,
  Textarea,
} from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";
import { useMutation } from "@apollo/client";
import { CREATE_CLIENT } from "../../../lib/queries";
import { Client } from "../../../contexts/Typing";
import { useState } from "react";

export function ModalNewClient() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [createClient] = useMutation(CREATE_CLIENT);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const clientData: Client = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      serviceOrder: formData.get("serviceOrder") as string,
      clientNumber: formData.get("clientNumber") as string,
      dischargeDate: formData.get("dischargeDate") as string,
      note: formData.get("note") as string,
      sentToday: false,
      sentThreeDays: false,
      sentSevenDays: false,
      sentOneMonth: false,
      sentThreeMonths: false,
      sentSixMonths: false,
    };

    setIsLoading(true);
    try {
      await createClient({
        variables: {
          createClientObject: clientData,
        },
      });
      localStorage.setItem("clientCreated", "true");
      toast({
        title: "Cliente criado com sucesso!",
        description: `Cliente: ${clientData.name}`,
        position: "top-right",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1800);
    } catch (error) {
      const errorMessage =
        (error as Error).message || "Ocorreu um erro desconhecido.";

      toast({
        title: `Erro ao criar cliente: ${clientData.name}`,
        description: errorMessage,
        position: "top-right",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setIsLoading(false)
  };

  return (
    <Stack>
      <Button
        onClick={onOpen}
        as="a"
        size="sm"
        fontSize="sm"
        colorScheme="green"
        ml={{ base: "0", md: "4" }}
        cursor="pointer"
      >
        <Icon as={RiAddLine} fontSize={20} />
        <Text display={{ base: "none", md: "flex" }}>Novo cliente</Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalContent
          bg="gray.900"
          borderColor="transparent"
          boxShadow="2xl"
          minW="50%"
          color="gray.50"
          p="12"
        >
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <form onSubmit={handleSubmit}>
                <Flex direction="column" gap="4">
                  <Grid
                    templateColumns={{
                      lg: "repeat(2, 1fr)",
                      base: "repeat(1,1fr)",
                    }}
                    w="100%"
                    gap="4"
                  >
                    <FormControl id="clientNumber" isRequired>
                      <FormLabel>Número do cliente:</FormLabel>
                      <Input
                        type="number"
                        name="clientNumber"
                        placeholder="Digite o número do cliente"
                        rounded="5"
                        bg="gray.800"
                        borderColor="gray.700"
                        _hover={{ borderColor: "gray.700" }}
                      />
                    </FormControl>
                    <FormControl id="name" isRequired>
                      <FormLabel>Cliente:</FormLabel>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Digite o nome do cliente"
                        rounded="5"
                        bg="gray.800"
                        borderColor="gray.700"
                        _hover={{ borderColor: "gray.700" }}
                      />
                    </FormControl>
                    <FormControl id="phone" isRequired>
                      <FormLabel>Contato:</FormLabel>
                      <Input
                        type="number"
                        name="phone"
                        placeholder="Digite o de telefone"
                        rounded="5"
                        bg="gray.800"
                        borderColor="gray.700"
                        _hover={{ borderColor: "gray.700" }}
                      />
                    </FormControl>
                    <FormControl id="serviceOrder" isRequired>
                      <FormLabel>Ordem de Serviço:</FormLabel>
                      <Input
                        type="number"
                        name="serviceOrder"
                        placeholder="Digite a Ordem de Serviço"
                        rounded="5"
                        bg="gray.800"
                        borderColor="gray.700"
                        _hover={{ borderColor: "gray.700" }}
                      />
                    </FormControl>
                    
                    <FormControl id="dischargeDate" isRequired>
                      <FormLabel>Data da baixa:</FormLabel>
                      <Input
                        type="date"
                        name="dischargeDate"
                        rounded="5"
                        bg="gray.800"
                        borderColor="gray.700"
                        _hover={{ borderColor: "gray.700" }}
                      />
                    </FormControl>
                    <FormControl id="note">
                      <FormLabel>Observação:</FormLabel>
                      <Textarea
                        name="note"
                        rounded="5"
                        bg="gray.800"
                        borderColor="gray.700"
                        _hover={{ borderColor: "gray.700" }}
                      />
                    </FormControl>
                  </Grid>
                  <Button
                    isLoading={isLoading}
                    colorScheme="green"
                    type="submit"
                  >
                    Adicionar Cliente
                  </Button>
                </Flex>
              </form>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Stack>
  );
}
