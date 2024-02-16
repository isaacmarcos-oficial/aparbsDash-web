import {
  Flex,
  FormLabel,
  Editable,
  EditableInput,
  EditablePreview,
  Button,
  useEditableControls,
} from "@chakra-ui/react";
import { RxCheck, RxPencil1 } from "react-icons/rx";

interface InfoModalProps {
  initialValue?: string;
  label: string;
  info?: string;
  infoType?: string;
  onChange: (value: string) => void;
}

export function InfoModal({
  info,
  initialValue,
  label,
  onChange,
}: InfoModalProps) {
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <Button
        bg="gray.800"
        _hover={{ bg:"gray.700" }}
        colorScheme="blackAlpha"
        size="xs" {...getSubmitButtonProps()}>
        <RxCheck />
      </Button>
    ) : (
      <Button
        bg="gray.800"
        _hover={{ bg:"gray.700" }}
        colorScheme="blackAlpha"
        size="xs" {...getEditButtonProps()}>
        <RxPencil1 />
      </Button>
    );
  }

  return (
    <Flex align="center" w="100%" justify="space-between">
      <FormLabel
        color="gray.400"
        fontSize="14px"
        textTransform="uppercase"
        fontWeight="bold"
      >
        {label}:
      </FormLabel>

      <Editable
        defaultValue={initialValue}
        placeholder={info}
        isPreviewFocusable={false}
        onSubmit={(value) => onChange(value)}
        w="50%"
      >
        <Flex gap="2" align="center" mr="-8">
          <EditablePreview
            borderColor="gray.700"
            bg="gray.800"
            color="gray.500"
            py="1"
            px="3"
            rounded="5"
            w="100%"
          />
          <EditableInput
            borderColor="gray.700"
            bg="gray.800"
            color="gray.50"
            py="1"
            px="3"
            rounded="5"
          />
          <EditableControls />
        </Flex>
      </Editable>
    </Flex>
  );
}
