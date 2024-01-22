export interface Client {
  id?: number;
  name: string;
  phone: string;
  serviceOrder: string;
  vehicle: string;
  dischargeDate: string;
  sentToday: boolean;
  sentThreeDays: boolean;
  sentSevenDays: boolean;
  sentOneMonth: boolean;
  sentThreeMonths: boolean;
  sentSixMonths: boolean;
}