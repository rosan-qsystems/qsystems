export const saveToken = (val: string | null) => {
  if (val) {
    localStorage.setItem('token', val);
  }
};

export const saveFullToken = (val:any) => {
  if (val) {
    localStorage.setItem('token', JSON.stringify(val));
  }
};

export const getToken = (): string | null => {
  const tokenData= localStorage.getItem('token');
  return tokenData ? JSON.parse(tokenData).access_token: null;
};

export const getFullToken = () => {
  const tokenData= localStorage.getItem('token');
  return tokenData ? JSON.parse(tokenData): null;
};

export const getRefreshToken = (): string | null => {
  const tokenData= localStorage.getItem('token');
  return tokenData ? JSON.parse(tokenData).refresh_token : null;
};

export const clearStorage = () => localStorage.clear();
export const removeToken = () => localStorage.removeItem('token');

export const saveUser = (val: any) =>
  localStorage.setItem('user', JSON.stringify(val));

export const saveDefaultSettings = (val: string) =>
  localStorage.setItem('defaultSettings', JSON.stringify(val));

export const getUser = () =>
  localStorage.getItem('user') && localStorage.getItem('user') !== 'undefined'
    ? JSON.parse(localStorage.getItem('user') || '')
    : null;

export const getDefaultSettings = () =>
  localStorage.getItem('defaultSettings') &&
  localStorage.getItem('defaultSettings') !== 'undefined'
    ? JSON.parse(localStorage.getItem('defaultSettings') || '')
    : null;

export const getUserOrganizationFromLocalStorage = () => {
  const data = localStorage.getItem('user');
  let code = '';
  if (data) {
    const dataParsed = JSON.parse(data);
    code = dataParsed.organizationCode;
  }
  return code;
};
