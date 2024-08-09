import { useState } from 'react';

export default function useLoading(defaultValue = false) {
  const [isLoading, setIsLoading] = useState<boolean>(defaultValue);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return { isLoading, startLoading, stopLoading };
}
