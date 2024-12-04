import React from 'react';
import toast from 'react-hot-toast';

import { Save } from '@mui/icons-material';
import { Button, CircularProgress, IconButton, Tooltip, Typography } from '@mui/material';
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
    <Tooltip title="Zapisz Szablon">
      <Button color="info" variant='contained' onClick={handleClick} disabled={isLoading}>
        {isLoading && <CircularProgress size={24} />}
        {!isLoading && <Save />}
        {!isLoading && <Typography marginInlineStart={1}>Zapisz</Typography>}
      </Button>
    </Tooltip>
  );
}

export default SaveTemplateButton;
