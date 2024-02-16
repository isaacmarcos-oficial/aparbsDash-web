import {
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  FormLabel,
  Stack,
  Button,
  Icon,
  useDisclosure,
  Grid,
  Checkbox,
  Flex,
  Heading,
  Input,
  useToast,
  FormControl,
  Textarea,
} from "@chakra-ui/react";
import { RiCheckFill, RiEdit2Fill } from "react-icons/ri";
import { InfoModal } from "./infoModal";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Client } from "../../../contexts/Typing";
import { EDIT_CLIENT } from "../../../lib/queries";
import moment from "moment";

export function ModalClient(props: Client) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [editClient] = useMutation(EDIT_CLIENT);
  const toast = useToast();

  const [values, setValues] = useState({
    id: props.id,
    name: props.name,
    phone: props.phone,
    serviceOrder: props.serviceOrder,
    clientNumber: props.clientNumber,
    dischargeDate: moment(props.dischargeDate, "DD/MM/YYYY").isValid()
      ? moment(props.dischargeDate, "DD/MM/YYYY").toISOString()
      : null,
    note: props.note,
    sentToday: props.sentToday,
    sentThreeDays: props.sentThreeDays,
    sentSevenDays: props.sentSevenDays,
    sentOneMonth: props.sentOneMonth,
    sentThreeMonths: props.sentThreeMonths,
    sentSixMonths: props.sentSixMonths,
  });

  const handleInputChange = (name: string, value: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleEditClient = async () => {
    setIsLoading(true);
    try {
      await editClient({
        variables: {
          editClientObject: {
            ...values,
          },
        },
      });
      toast({
        title: `Cliente: ${values.name} editado com sucesso`,
        position: "top-right",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      const errorMessage =
        (error as Error).message || "Ocorreu um erro desconhecido.";
      toast({
        title: `Erro ao editar ${values.name}:`,
        description: errorMessage,
        position: "top-right",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  };

  return (
    <Stack>
      <Button
        as="a"
        size="sm"
        colorScheme="gray"
        cursor="pointer"
        onClick={onOpen}
      >
        <Icon as={RiEdit2Fill}></Icon>
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
          <ModalHeader>
            <Heading
              color="gray.50"
              textTransform="uppercase"
              fontSize="20px"
              fontWeight="bold"
            >
              Dados do cliente
            </Heading>
          </ModalHeader>
          <ModalBody>
            <Flex direction="column" gap="8">
              <Grid
                w="100%"
                gap="3"
                fontSize="14px"
                templateColumns={{
                  lg: "repeat(2, 1fr)",
                  base: "repeat(1, 1fr",
                }}
              >
                <InfoModal
                  label="Número do cliente"
                  info={props.clientNumber}
                  onChange={(value: string) =>
                    handleInputChange("clientNumber", value)
                  }
                  infoType="text"
                />
                <InfoModal
                  label="Nome Completo"
                  info={props.name}
                  onChange={(value: string) => handleInputChange("name", value)}
                  infoType="text"
                />
                <InfoModal
                  label="Contato"
                  info={props.phone}
                  onChange={(value: string) =>
                    handleInputChange("phone", value)
                  }
                  infoType="text"
                />
                <InfoModal
                  label="Ordem de serviço"
                  info={props.serviceOrder}
                  onChange={(value: string) =>
                    handleInputChange("serviceOrder", value)
                  }
                  infoType="number"
                />

                <Flex w="100%" align="center" justify="space-between">
                  <FormLabel
                    color="gray.400"
                    fontSize="14px"
                    textTransform="uppercase"
                    fontWeight="bold"
                  >
                    Dada de Inclusão:
                  </FormLabel>
                  <Input
                    placeholder={props.dischargeDate}
                    borderColor="gray.700"
                    isReadOnly
                    type="text"
                    bg="gray.800"
                    color="gray.50"
                    w="50%"
                    py="1"
                    px="3"
                    rounded="5"
                  />
                </Flex>
              </Grid>

              <Grid
                w="100%"
                gap="1"
                templateColumns={{
                  lg: "repeat(5, 1fr)",
                  base: "repeat(2, 1fr)",
                }}
                templateRows={{ lg: "repeat(1, 1fr)", base: "repeat(3, 1fr)" }}
                fontSize="14px"
                fontWeight="500"
              >
                <Checkbox
                  colorScheme="green"
                  color={values.sentToday ? "green.300" : ""}
                  isChecked={values.sentToday}
                  onChange={(e) =>
                    setValues({ ...values, sentToday: e.target.checked })
                  }
                  aria-label="Sent Today"
                  order={{ lg: "1", base: "1" }}
                >
                  Hoje
                </Checkbox>

                <Checkbox
                  colorScheme="green"
                  color={values.sentSevenDays ? "green.300" : ""}
                  isChecked={values.sentSevenDays}
                  onChange={(e) =>
                    setValues({ ...values, sentSevenDays: e.target.checked })
                  }
                  order={{ lg: "2", base: "3" }}
                >
                  7 dias
                </Checkbox>
                <Checkbox
                  colorScheme="green"
                  color={values.sentOneMonth ? "green.300" : ""}
                  isChecked={values.sentOneMonth}
                  onChange={(e) =>
                    setValues({ ...values, sentOneMonth: e.target.checked })
                  }
                  order={{ lg: "3", base: "5" }}
                >
                  1 mês
                </Checkbox>
                <Checkbox
                  colorScheme="green"
                  color={values.sentThreeMonths ? "green.300" : ""}
                  isChecked={values.sentThreeMonths}
                  onChange={(e) =>
                    setValues({ ...values, sentThreeMonths: e.target.checked })
                  }
                  order={{ lg: "4", base: "2" }}
                >
                  3 meses
                </Checkbox>
                <Checkbox
                  colorScheme="green"
                  color={values.sentSixMonths ? "green.300" : ""}
                  isChecked={values.sentSixMonths}
                  onChange={(e) =>
                    setValues({ ...values, sentSixMonths: e.target.checked })
                  }
                  order={{ lg: "5", base: "4" }}
                >
                  6 meses
                </Checkbox>
              </Grid>

              <FormControl id="note">
                <FormLabel>Observação:</FormLabel>
                <Textarea
                  placeholder={props.note}
                  value={values.note}
                  onChange={(e) => handleInputChange("note", e.target.value)}
                  name="note"
                  rounded="5"
                  bg="gray.800"
                  borderColor="gray.700"
                  _hover={{ borderColor: "gray.700" }}
                />
              </FormControl>
              <Button
                colorScheme="green"
                mt="4"
                w="100%"
                size="sm"
                isLoading={isLoading}
                onClick={handleEditClient}
              >
                <Icon as={RiCheckFill} boxSize="1rem" />
                Confirmar envio
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Stack>
  );
}
