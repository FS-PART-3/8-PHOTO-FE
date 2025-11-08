import { useState } from 'react';

function useAsync(asyncFunction) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const wrappedFunction = async (...args) => {
    try {
      setError(null);
      setPending(true);
      return await asyncFunction(...args);
    } catch (error) {
      console.log(error);
      setError(error.message);
      return;
    } finally {
      setPending(false);
    }
  };

  return [pending, error, setError, wrappedFunction];
}

export default useAsync;
