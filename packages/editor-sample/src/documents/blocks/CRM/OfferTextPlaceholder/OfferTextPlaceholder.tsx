import React from 'react';
import { OfferTextPlaceholderProps } from './OfferTextPlaceholderPropsSchema';
import { Typography } from '@mui/material';


export const OfferTextPlaceholderPropsDefaults = {
  text: 'Tu pojawi się tekst oferty',
} as const;

export function OfferTextPlaceholder({  props }: OfferTextPlaceholderProps) {
  return (
    <div>
      <Typography variant="h6" p={2}>
        Blok tekstu oferty
      </Typography>
    </div>
  );
}
