import { gql } from "@apollo/client";

export const GET_CLIENTS = gql`
  query {
    clients {
      id
      name
      phone
      serviceOrder
      clientNumber
      dischargeDate
      sentToday
      sentThreeDays
      sentSevenDays
      sentOneMonth
      sentThreeMonths
      sentSixMonths
    }
  }
`;

export const GET_CLIENTS_FILTER = gql`
  query ($clientName: String, $clientNumber: String) {
    clientsFiltered(clientName: $clientName, clientNumber: $clientNumber) {
      id
      name
      phone
      serviceOrder
      clientNumber
      dischargeDate
      note
      sentToday
      sentThreeDays
      sentSevenDays
      sentOneMonth
      sentThreeMonths
      sentSixMonths
    }
  }
`;
export const GET_ALL_CLIENT_NUMBERS = gql`
  query GetAllClientNumbers {
    clients {
      clientNumber
    }
  }
`;

export const CREATE_CLIENT = gql`
  mutation CreateClient($createClientObject: CreateClientInput!) {
    createClient(createClientObject: $createClientObject) {
      id
      name
      phone
      serviceOrder
      clientNumber
      dischargeDate
      note
      sentToday
      sentThreeDays
      sentSevenDays
      sentOneMonth
      sentThreeMonths
      sentSixMonths
    }
  }
`;

export const EDIT_CLIENT = gql`
  mutation EditClient($editClientObject: EditClientInput!) {
    editClient(editClientObject: $editClientObject) {
      id
      name
      phone
      serviceOrder
      clientNumber
      dischargeDate
      note
      sentToday
      sentThreeDays
      sentSevenDays
      sentOneMonth
      sentThreeMonths
      sentSixMonths
    }
  }
`;

export const DELETE_CLIENT = gql`
  mutation deleteClient($deleteClientId: String!) {
    deleteClient(id: $deleteClientId)
  }
`;
