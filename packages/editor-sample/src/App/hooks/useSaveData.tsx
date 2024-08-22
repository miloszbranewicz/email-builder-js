import { useState } from 'react';
import { useDocument } from '../../documents/editor/EditorContext';

export const useSaveData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const document = useDocument();

  const save = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(window?.email?.generator?.updateTemplate || window.location.href, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': window?.email?.generator?.csrf || '',
        },

        body: JSON.stringify({
          template_id: window?.email?.generator?.templateID || '',
          template_json: document,
        }),
      });

      return response;
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { save, isLoading, error };
};
