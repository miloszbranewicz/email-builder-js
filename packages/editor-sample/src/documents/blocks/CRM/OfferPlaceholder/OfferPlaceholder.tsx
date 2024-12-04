import React from 'react';
import { OfferPlaceholderProps } from './OfferPlaceholderPropsSchema';
import { Typography } from '@mui/material';

export const OfferPlaceholderPropsDefaults = {
  text: 'Tu pojawi się lista mieszkań',
} as const;

export function OfferPlaceholder({ props }: OfferPlaceholderProps) {
  return (
    <div>
      <Typography variant="h6" p={2}>
        Blok mieszkań oferty
      </Typography>
    </div>
  );
}
