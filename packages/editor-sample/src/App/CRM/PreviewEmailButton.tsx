import { OpenInNew } from '@mui/icons-material';
import { CircularProgress, IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { useSaveData } from '../hooks/useSaveData';
import toast from 'react-hot-toast';
import { getPreviewTemplateURL } from '../helpers/getPreviewURL';

function PreviewEmailButton() {
  const { isLoading, error, save } = useSaveData();

  const handleClick = async () => {
    save().then((res) => {
      if (res?.ok) {
        if (res.status >= 200 && res.status < 300) {
          toast.success('Szablon został zapisany');

          setTimeout(() => {
            const previewURL = getPreviewTemplateURL();
            window.open(previewURL, '_blank');
          }, 1000);
        }
      } else {
        toast.error('Wystąpił błąd podczas zapisywania szablonu');
      }
      return res;
    });
  };

  return (
    <Tooltip title="Podejrzyj email">
      <IconButton onClick={handleClick} disabled={isLoading}>
        {isLoading && <CircularProgress />}
        {!isLoading && <OpenInNew />}
      </IconButton>
    </Tooltip>
  );
}

export default PreviewEmailButton;
