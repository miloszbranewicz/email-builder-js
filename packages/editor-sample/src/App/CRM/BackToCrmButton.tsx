import { FirstPageOutlined } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
type Props = {};

function BackToCrmButton({}: Props) {
  const [open, setOpen] = useState(false);
  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleBackToCrm = () => {
    window.location.href = window.email.generator.backURL || '/';
  };
  return (
    <Tooltip title="Wróć do szablonów email">
      <>
        <Button color="error" variant="contained" onClick={handleOpenModal}>
          <FirstPageOutlined />
          <Typography>Wróć</Typography>
        </Button>
        <Dialog open={open} onClose={handleCloseModal}>
          <DialogTitle>Czy na pewno chcesz wrócić do CRM?</DialogTitle>
          <DialogContent>

          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={handleCloseModal}>
              Anuluj
            </Button>
            <Button onClick={handleBackToCrm}>Wróć do CRM</Button>
          </DialogActions>
        </Dialog>
      </>
    </Tooltip>
  );
}

export default BackToCrmButton;
