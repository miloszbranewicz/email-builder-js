import React from 'react';
import { OfferAttachmentsPlaceholderProps } from './OfferAttachmentsPlaceholderPropsSchema';
import { Typography } from '@mui/material';


export const OfferAttachmentsPlaceholderPropsDefaults = {
  text: 'Tu pojawi się lista plików oferty',
} as const;

export function OfferAttachmentsPlaceholder({  props }: OfferAttachmentsPlaceholderProps) {
  return (
    <div>
      <Typography variant="h6" p={2}>
        Blok pliki oferty
      </Typography>
    </div>
  );
}
