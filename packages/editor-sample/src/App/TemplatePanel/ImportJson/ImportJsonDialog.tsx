import React, { useState } from 'react';

import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';

import { resetDocument } from '../../../documents/editor/EditorContext';

import validateJsonStringValue from './validateJsonStringValue';

type ImportJsonDialogProps = {
  onClose: () => void;
};
export default function ImportJsonDialog({ onClose }: ImportJsonDialogProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (ev) => {
    const v = ev.currentTarget.value;
    setValue(v);
    const { error } = validateJsonStringValue(v);
    setError(error ?? null);
  };

  let errorAlert = null;
  if (error) {
    errorAlert = <Alert color="error">{error}</Alert>;
  }

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Zaimportuj JSON</DialogTitle>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          const { error, data } = validateJsonStringValue(value);
          setError(error ?? null);
          if (!data) {
            return;
          }
          resetDocument(data);
          onClose();
        }}
      >
        <DialogContent>
          <Typography color="text.secondary" paragraph>
            Wklej JSON z templatem, który chcesz zaimportować.
          </Typography>
          {errorAlert}
          <TextField
            error={error !== null}
            value={value}
            onChange={handleChange}
            type="text"
            helperText="Spowoduje to zastąpienie bieżącego szablonu."
            variant="outlined"
            fullWidth
            rows={10}
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={onClose}>
            Anuluj
          </Button>
          <Button variant="contained" type="submit" disabled={error !== null}>
            Importuj
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
