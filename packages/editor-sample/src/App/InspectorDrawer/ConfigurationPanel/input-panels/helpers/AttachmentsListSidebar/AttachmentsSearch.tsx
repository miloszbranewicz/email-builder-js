import React from 'react';

import TextInput from '../inputs/TextInput';

type Props = {
  onChange: (value: string) => Promise<void>;
};

function AttachmentsSearch({ onChange }: Props) {
  return (
    <TextInput
      label="Wyszukaj załącznik"
      defaultValue=""
      onChange={(v) => onChange(v)}
      placeholder="Nazwa załącznika"
    />
  );
}

export default AttachmentsSearch;
