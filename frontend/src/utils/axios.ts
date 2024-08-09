import axios, { AxiosResponse } from 'axios';
import { SERVER_URL_API } from '@/const';
import { useAuthStore } from '@/stores/auth-store';

const handleError = (error: any) => {
  if (error.response.status === 401 && localStorage.getItem('authentication')) {
    localStorage.removeItem('authentication');
    window.location.href = '/auth/login';
  }
  return { ...error.response, error: true };
};

export async function getData(url: string, params?: any) {
  try {
    const token = useAuthStore.getState().token
      ? useAuthStore.getState().token
      : '';

    const result = await axios.get(`${SERVER_URL_API}/${url}`, {
      params,
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
      },
    });
    return result.data.data;
  } catch (error) {
    return handleError(error);
  }
}

export async function postData(
  url: string,
  payload?: any
  // formData: boolean
) {
  try {
    const token = useAuthStore.getState().token
      ? useAuthStore.getState().token
      : '';

    const result = await axios.post(`${SERVER_URL_API}${url}`, payload, {
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
      },
    });
    return result;
  } catch (error) {
    return handleError(error);
  }
}

export async function patchData(
  url: string,
  payload: any
): Promise<AxiosResponse> {
  try {
    const token = useAuthStore.getState().token
      ? useAuthStore.getState().token
      : '';

    Object.keys(payload).forEach((key) => {
      if (payload[key] === null || payload[key] === undefined) {
        payload[key] = '';
      }
    });

    return await axios.patch(`${SERVER_URL_API}/${url}`, payload, {
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
      },
    });
  } catch (error) {
    return handleError(error);
  }
}
export async function deleteData(url: string, payload?: any) {
  try {
    const token = useAuthStore.getState().token
      ? useAuthStore.getState().token
      : '';
    return await axios.delete(`${SERVER_URL_API}${url}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
      },
      data: payload,
    });
  } catch (error) {
    return handleError(error);
  }
}
