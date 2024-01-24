import { Client } from "./Typing";
import dayjs from "dayjs";

export const filterClients = (clients: Client[], filter: string) => {
  const today = dayjs().subtract(1, "days").startOf("day");
  const threeDaysAgo = dayjs().subtract(3, "days").startOf("day");
  const sevenDaysAgo = dayjs().subtract(7, "days").startOf("day");
  const oneMonthAgo = dayjs().subtract(30, "days").startOf("day");
  const threeMonthAgo = dayjs().subtract(90, "days").startOf("day");
  const sixMonthAgo = dayjs().subtract(180, "days").startOf("day");

  switch (filter) {
    case "hoje":
      return clients.filter((client) =>
        dayjs(parseInt(client.dischargeDate)).isAfter(today)
      );
    case "3 dias":
      return clients.filter((client) =>
        dayjs(parseInt(client.dischargeDate)).isBefore(today) &&
          dayjs(parseInt(client.dischargeDate)).isAfter(threeDaysAgo)
      );
    case "7 dias":
      return clients.filter((client) =>
        dayjs(parseInt(client.dischargeDate)).isBefore(threeDaysAgo) &&
        dayjs(parseInt(client.dischargeDate)).isAfter(sevenDaysAgo) 
      );
    case "30 dias":
      return clients.filter((client) =>
        dayjs(parseInt(client.dischargeDate)).isBefore(sevenDaysAgo) &&
        dayjs(parseInt(client.dischargeDate)).isAfter(oneMonthAgo)
      );
    case "90 dias":
      return clients.filter((client) =>
        dayjs(parseInt(client.dischargeDate)).isBefore(oneMonthAgo) &&
        dayjs(parseInt(client.dischargeDate)).isAfter(threeMonthAgo)
      );
      case "180 dias":
        return clients.filter((client) =>
          dayjs(parseInt(client.dischargeDate)).isBefore(threeMonthAgo) &&
          dayjs(parseInt(client.dischargeDate)).isAfter(sixMonthAgo)
        );
    default:
      return clients;
  }
};