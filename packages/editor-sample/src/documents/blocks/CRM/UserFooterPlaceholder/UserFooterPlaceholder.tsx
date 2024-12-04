import React from 'react';
import { UserFooterPlaceholderProps } from './UserFooterPlaceholderPropsSchema';
import { Typography } from '@mui/material';


export const OfferAttachmentsPlaceholderPropsDefaults = {
  text: 'Tu pojawi się lista plików oferty',
} as const;

export function UserFooterPlaceholder({  props }: UserFooterPlaceholderProps) {
  return (
    <div>
      <Typography variant="h6" p={2}>
        Blok stopki użytkownika
      </Typography>
    </div>
  );
}
