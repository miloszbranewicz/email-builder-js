import React from 'react';
import toast from 'react-hot-toast';

import { Save } from '@mui/icons-material';
import { CircularProgress, IconButton, Tooltip } from '@mui/material';
import { useSaveData } from '../hooks/useSaveData';
import { getPreviewTemplateURL } from '../helpers/getPreviewURL';




function SaveTemplateButton() {
  const { 
    error,
    isLoading,
    save
  } = useSaveData()

  const handleClick = async () => {
    save().then((res) => {
      if (res?.ok) {
        if (res.status >= 200 && res.status < 300) {
          toast.success('Szablon został zapisany');
        }
      } else {
        toast.error('Wystąpił błąd podczas zapisywania szablonu');
      }
      return res;
    });
  };

  return (
    <Tooltip title="Zapisz template">
      <IconButton color="primary" onClick={handleClick} disabled={isLoading}>
        {isLoading && <CircularProgress size={24} />}
        {!isLoading && <Save />}
      </IconButton>
    </Tooltip>
  );
}

export default SaveTemplateButton;
