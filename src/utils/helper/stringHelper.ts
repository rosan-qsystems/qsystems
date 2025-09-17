export const formatName = (firstName: string, lastName: string) => {
  return !!firstName && !!lastName
    ? (
        firstName.charAt(0).toUpperCase() +
        firstName.slice(1) +
        ' ' +
        lastName.charAt(0).toUpperCase() +
        lastName.slice(1)
      ).trim()
    : '-';
};

export const formatAddress = (address: any) =>
  !!address
    ? `${!!address?.description ? address?.description : '-'},
    ${!!address?.city ? address?.city : '-'},
    ${!!address?.state ? address?.state : '-'}
    ${!!address?.zipCode ? address?.zipCode : '-'}
  ${!!address?.countryCode ? address?.countryCode : '-'}
    `
    : '--';

export const formatPhoneNumber = (prefix: any, phone: any): string =>
  `${prefix ? prefix + ' ' : prefix}${phone ? phone : ''}`;

export const truncateString = (
  stringData: string,
  maxLength: number
): string =>
  stringData?.trim()?.length <= maxLength
    ? stringData
    : `${stringData.slice(0, maxLength)}...`;
