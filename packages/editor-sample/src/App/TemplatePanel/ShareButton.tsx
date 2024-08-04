import React, { useState } from 'react';

import { Snackbar } from '@mui/material';

import { useDocument } from '../../documents/editor/EditorContext';

export default function ShareButton() {
  const document = useDocument();
  const [message, setMessage] = useState<string | null>(null);

  const onClick = async () => {
    const c = encodeURIComponent(JSON.stringify(document));
    location.hash = `#code/${btoa(c)}`;
    setMessage('Adres URL został zaktualizowany. Skopiuj go, aby udostępnić bieżący szablon.');
  };

  const onClose = () => {
    setMessage(null);
  };

  return (
    <>
      {/* <IconButton onClick={onClick}>
        <Tooltip title="Udostępnij template">
          <IosShareOutlined fontSize="small" />
        </Tooltip>
      </IconButton> */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={message !== null}
        onClose={onClose}
        message={message}
      />
    </>
  );
}
