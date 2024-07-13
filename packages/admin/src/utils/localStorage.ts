import { ACCESS_TOKEN, CACHED_URL } from 'admin/src/constants/localStorage';

export const getToken = () => localStorage.getItem(ACCESS_TOKEN);

export const getCachedUrl = () => localStorage.getItem(CACHED_URL);

export const removeCachedUrl = () => localStorage.removeItem(CACHED_URL);

export const isHavingToken = () => !!getToken();
