/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createShift = /* GraphQL */ `
  mutation CreateShift(
    $input: CreateShiftInput!
    $condition: ModelShiftConditionInput
  ) {
    createShift(input: $input, condition: $condition) {
      id
      date
      startTime
      endTime
      clinicName
      status
      nurseName
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateShift = /* GraphQL */ `
  mutation UpdateShift(
    $input: UpdateShiftInput!
    $condition: ModelShiftConditionInput
  ) {
    updateShift(input: $input, condition: $condition) {
      id
      date
      startTime
      endTime
      clinicName
      status
      nurseName
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteShift = /* GraphQL */ `
  mutation DeleteShift(
    $input: DeleteShiftInput!
    $condition: ModelShiftConditionInput
  ) {
    deleteShift(input: $input, condition: $condition) {
      id
      date
      startTime
      endTime
      clinicName
      status
      nurseName
      createdAt
      updatedAt
      __typename
    }
  }
`;
