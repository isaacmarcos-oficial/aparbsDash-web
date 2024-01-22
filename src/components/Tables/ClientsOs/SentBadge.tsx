import { Icon } from "@chakra-ui/react";
import {
  RiCheckboxCircleFill,
  RiCheckboxBlankCircleLine,
} from "react-icons/ri";

type SentBadgeProps = {
  badgeValue: boolean;
};

export function SentBadge({ badgeValue }: SentBadgeProps) {
  return (
    <Icon
      boxSize="1rem"
      as={badgeValue ? RiCheckboxCircleFill : RiCheckboxBlankCircleLine}
      color={badgeValue ? "green.300" : "gray"}
    />
  );
}
