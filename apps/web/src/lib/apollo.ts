
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const client = new ApolloClient({
  // We'll update this URL when you provide the actual GraphQL API
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

// GraphQL operation definitions
export const GET_LOG_ENTRIES = gql`
  query GetLogEntries {
    logEntries {
      id
      name
      date
      description
      updatedAt
      location
      createdAt
    }
  }
`;

export const CREATE_LOG_ENTRY = gql`
  mutation CreateLogEntry($input: CreateLogEntryInput!) {
    createLogEntry(input: $input) {
      id
      name
      description
      date
      location
      updatedAt
      createdAt
    }
  }
`;

export const UPDATE_LOG_ENTRY = gql`
  mutation UpdateLogEntry($id: ID!, $input: UpdateLogEntryInput!) {
    updateLogEntry(id: $id, input: $input) {
      id
      name
      date
      description
      location
      updatedAt
      createdAt
    }
  }
`;

export const DELETE_LOG_ENTRY = gql`
  mutation DeleteLogEntry($id: ID!) {
    deleteLogEntry(id: $id) {
      id
    }
  }
`;
