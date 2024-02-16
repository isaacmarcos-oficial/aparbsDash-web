import { Button } from '@chakra-ui/react'

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void
}

export function PaginationItem({ isCurrent = false, number, onPageChange }: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button 
        size='sm'
        fontSize='xs'
        width='4'
        colorScheme='green'
        disabled
        _disabled={{
          bg: 'red.500',
          cursor: 'default'
        }}
      >
        {number}
      </Button>
    )
  }
  return (
    <Button 
      color="gray.500"
      size='sm'
      fontSize='xs'
      width='4'
      bg='gray.900'
      _hover={{
        bg: 'gray.700', color:"gray.400"
      }}
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  )
}