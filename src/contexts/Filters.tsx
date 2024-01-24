import { Client } from "./Typing";
import dayjs from "dayjs";

export const filterClients = (clients: Client[], filter: string) => {
  const today = dayjs().format('YYYY-MM-DD');
  const threeDaysAgo = dayjs().subtract(3, 'days').format('YYYY-MM-DD');
  const sevenDaysAgo = dayjs().subtract(7, 'days').format('YYYY-MM-DD');
  const oneMonthAgo = dayjs().subtract(30, 'days').format('YYYY-MM-DD');
  const threeMonthAgo = dayjs().subtract(90, 'days').format('YYYY-MM-DD');
  const sixMonthAgo = dayjs().subtract(180, 'days').format('YYYY-MM-DD');

  switch (filter) {
    case "hoje":
      return clients.filter(client =>
        dayjs(parseInt(client.dischargeDate)).format('YYYY-MM-DD') === today
      );
    case "3 dias":
      return clients.filter(client =>
        dayjs(parseInt(client.dischargeDate)).format('YYYY-MM-DD') >= threeDaysAgo &&
        dayjs(parseInt(client.dischargeDate)).format('YYYY-MM-DD') < today
      );
    case "7 dias":
      return clients.filter(client =>
        dayjs(parseInt(client.dischargeDate)).format('YYYY-MM-DD') >= sevenDaysAgo &&
        dayjs(parseInt(client.dischargeDate)).format('YYYY-MM-DD') < threeDaysAgo
      );
    case "30 dias":
      return clients.filter(client =>
        dayjs(parseInt(client.dischargeDate)).format('YYYY-MM-DD') >= oneMonthAgo &&
        dayjs(parseInt(client.dischargeDate)).format('YYYY-MM-DD') < sevenDaysAgo
      );
    case "90 dias":
      return clients.filter(client =>
        dayjs(parseInt(client.dischargeDate)).format('YYYY-MM-DD') >= threeMonthAgo &&
        dayjs(parseInt(client.dischargeDate)).format('YYYY-MM-DD') < oneMonthAgo
      );
      case "180 dias":
        return clients.filter(client =>
          dayjs(parseInt(client.dischargeDate)).format('YYYY-MM-DD') >= threeMonthAgo &&
          dayjs(parseInt(client.dischargeDate)).format('YYYY-MM-DD') < sixMonthAgo
        );
      
    default:
      return clients;
  }
};