import { FirstPageOutlined } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import React from 'react';
type Props = {};

function BackToCrmButton({}: Props) {
  const handleClick = () => {
    console.log('Back to CRM');
  };
  return (
    <Tooltip title="Wróć do szablonów email">
      <IconButton color="error" onClick={handleClick}>
        <FirstPageOutlined />
      </IconButton>
    </Tooltip>
  );
}

export default BackToCrmButton;
