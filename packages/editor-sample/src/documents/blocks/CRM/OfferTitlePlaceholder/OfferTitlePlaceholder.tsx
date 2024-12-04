import React from 'react';
import { OfferTitlePlaceholderProps } from './OfferTitlePlaceholderPropsSchema';
import { Typography } from '@mui/material';


export const OfferTitlePlaceholderPropsDefaults = {
  text: 'Tu pojawi się tytuł oferty',
} as const;

export function OfferTitlePlaceholder({  props }: OfferTitlePlaceholderProps) {
  return (
    <div>
      <Typography variant="h6" p={2}>
        Blok tytułu oferty
      </Typography>
    </div>
  );
}
