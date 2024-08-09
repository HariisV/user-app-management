import { MESSAGE } from '@/const/error-message';
import toast from 'react-hot-toast';

const FetchAPI = async (promise: Promise<any>) => {
  const id = toast.loading(MESSAGE.TOAST_LOADING);
  try {
    const result = await promise;

    if (result?.status === 200 || result?.status === 201) {
      toast.success(result.data.message || MESSAGE.TOAST_FINISH, {
        id,
      });
      return result.data;
    } else {
      toast.error(result?.data?.errors || MESSAGE.TOAST_ERROR, {
        id,
      });
      throw result;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export default FetchAPI;
