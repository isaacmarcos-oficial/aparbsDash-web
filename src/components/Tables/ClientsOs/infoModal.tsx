import { Flex, FormLabel, Input, } from "@chakra-ui/react";

interface InfoModalProps {
  initialValue?: string
  label: string;
  info?: string
  infoType: string;
  onChange: (value: string) => void;
}

export function InfoModal({ info, initialValue, label, infoType, onChange }: InfoModalProps) {
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
      <Input
        value={initialValue}
        placeholder={info}
        borderColor="gray.700"
        type={infoType}
        bg="gray.800"
        color="gray.50"
        onChange={e => onChange(e.target.value)}
        // onChange={e => onChange && onChange(e.target.value)}
        w="50%"
        py="1"
        px="3"
        rounded="5"
      />
    </Flex>
  );
}
