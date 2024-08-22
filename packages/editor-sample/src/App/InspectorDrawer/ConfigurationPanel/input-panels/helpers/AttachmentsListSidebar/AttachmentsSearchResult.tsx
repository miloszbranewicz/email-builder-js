import React from 'react';

import { Box } from '@mui/material';

import { Attachment } from '../../AttachmentsListSidebarPanel';

type Props = {
  data: Attachment[];
  setAttachment: (file: { name: string; url: string }) => void;
};

function AttachmentsSearchResult({ data, setAttachment }: Props) {
  return (
    <Box
      maxHeight={300}
      sx={{
        overflowY: 'auto',
      }}
    >
      {data?.map((file) => (
        <Box
          sx={{
            cursor: 'pointer',
            padding: 1,
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
          }}
          key={file.id}
          onClick={() =>
            setAttachment({
              name: file.name,
              url: file.url ?? '',
            })
          }
        >
          {file.name}
        </Box>
      ))}
    </Box>
  );
}

export default AttachmentsSearchResult;
