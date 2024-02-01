export interface Client {
  id?: number;
  name: string;
  phone: string;
  serviceOrder: string;
  clientNumber: string;
  dischargeDate: string;
  note?: string
  sentToday: boolean;
  sentThreeDays: boolean;
  sentSevenDays: boolean;
  sentOneMonth: boolean;
  sentThreeMonths: boolean;
  sentSixMonths: boolean;
}