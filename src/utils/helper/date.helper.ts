const pad = (num: number) => String(num).padStart(2, '0');

export const formatDate = (date: any) => {
  const d = new Date(date);

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  const month = months[d.getMonth()];
  const day = pad(d.getDate());
  const year = d.getFullYear();
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());

  return `${month} ${day}, ${year}`;
};

export const formatDateWithTime = (date: any) => {
  const d = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  return new Intl.DateTimeFormat('en-GB', options).format(d);
};

export const formatDateWithoutTime = (date: any) => {
  const d = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  };
  return new Intl.DateTimeFormat('en-GB', options).format(d);
};

export const formatDateGlobal = (date: any) => {
  const d = new Date(date);
  const day = pad(d.getDate());
  const month = d.toLocaleString('default', { month: 'short' });
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
};
