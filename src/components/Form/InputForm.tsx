import { Input } from "@chakra-ui/react";

type SearchInputProps = {
  inputType: string;
  inputPlaceholder: string
}

export function SearchInput(props: SearchInputProps) {
  return (
    <Input
      size="sm"
      colorScheme="blackAlpha"
      borderColor="gray.500"
      borderRadius="5"
      w="120px"
      placeholder={props.inputPlaceholder}
      type={props.inputType}
    />
  );
}
