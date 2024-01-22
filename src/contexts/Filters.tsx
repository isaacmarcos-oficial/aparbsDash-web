import moment from "moment";
import { Client } from "./Typing";

export const filterClients = (clients: Client[], filter: string) => {
  const today = moment().startOf("day");
  const threeDaysAgo = moment().subtract(3, "days").startOf("day");
  const sevenDaysAgo = moment().subtract(7, "days").startOf("day");
  const oneMonthAgo = moment().subtract(30, "days").startOf("day");
  const threeMonthAgo = moment().subtract(90, "days").startOf("day");
  const sixMonthAgo = moment().subtract(180, "days").startOf("day");

  switch (filter) {
    case "hoje":
      return clients.filter((client) =>
        moment(parseInt(client.dischargeDate)).isAfter(today)
      );
    case "3 dias":
      return clients.filter((client) =>
        moment(parseInt(client.dischargeDate)).isBefore(today) &&
          moment(parseInt(client.dischargeDate)).isAfter(threeDaysAgo)
      );
    case "7 dias":
      return clients.filter((client) =>
        moment(parseInt(client.dischargeDate)).isBefore(threeDaysAgo) &&
        moment(parseInt(client.dischargeDate)).isAfter(sevenDaysAgo) 
      );
    case "30 dias":
      return clients.filter((client) =>
        moment(parseInt(client.dischargeDate)).isBefore(sevenDaysAgo) &&
        moment(parseInt(client.dischargeDate)).isAfter(oneMonthAgo)
      );
    case "90 dias":
      return clients.filter((client) =>
        moment(parseInt(client.dischargeDate)).isBefore(oneMonthAgo) &&
        moment(parseInt(client.dischargeDate)).isAfter(threeMonthAgo)
      );
      case "180 dias":
        return clients.filter((client) =>
          moment(parseInt(client.dischargeDate)).isBefore(threeMonthAgo) &&
          moment(parseInt(client.dischargeDate)).isAfter(sixMonthAgo)
        );
    default:
      return clients;
  }
};