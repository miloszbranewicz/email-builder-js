import React, { CSSProperties } from 'react';

import { CopyAll, DeleteOutlined } from '@mui/icons-material';
import { IconButton, Paper, Stack, Tooltip } from '@mui/material';

import { TEditorBlock } from '../../../editor/core';
import { resetDocument, useDocument } from '../../../editor/EditorContext';
import { ColumnsContainerProps } from '../../ColumnsContainer/ColumnsContainerPropsSchema';

const STYLE: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: -52,
  borderRadius: 64,
};

type Props = {
  blockId: string;
};
export default function TuneMenu({ blockId }: Props) {
  const document = useDocument();

  const handleBlockDuplicateClick = () => {
    const block = document[blockId] as TEditorBlock;
    const newBlockId = `block-${Date.now()}`;
    const blockCopy = Object.assign({}, block);
    const nDocument = { ...document, [newBlockId]: blockCopy };
    document['root'].data.childrenIds.push(newBlockId);
    resetDocument(nDocument);
  };

  const handleDeleteClick = () => {
    const filterChildrenIds = (childrenIds: string[] | null | undefined) => {
      if (!childrenIds) {
        return childrenIds;
      }

      return childrenIds.filter((f) => f !== blockId);
    };
    const nDocument: typeof document = { ...document };
    for (const [id, b] of Object.entries(nDocument)) {
      const block = b as TEditorBlock;
      if (id === blockId) {
        continue;
      }
      switch (block.type) {
        case 'EmailLayout':
          nDocument[id] = {
            ...block,
            data: {
              ...block.data,
              childrenIds: filterChildrenIds(block.data.childrenIds),
            },
          };
          break;
        case 'Container':
          nDocument[id] = {
            ...block,
            data: {
              ...block.data,
              props: {
                ...block.data.props,
                childrenIds: filterChildrenIds(block.data.props?.childrenIds),
              },
            },
          };
          break;
        case 'ColumnsContainer':
          nDocument[id] = {
            type: 'ColumnsContainer',
            data: {
              style: block.data.style,
              props: {
                ...block.data.props,
                columns: block.data.props?.columns?.map((c) => ({
                  childrenIds: filterChildrenIds(c.childrenIds),
                })),
              },
            } as ColumnsContainerProps,
          };
          break;
        default:
          nDocument[id] = block;
      }
    }
    delete nDocument[blockId];
    resetDocument(nDocument);
  };

  return (
    <Paper style={STYLE} onClick={(ev) => ev.stopPropagation()}>
      <Stack>
        <Tooltip title="Usuń" placement="left-start">
          <IconButton onClick={handleDeleteClick} sx={{ color: 'text.primary' }}>
            <DeleteOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Duplikuj" placement="left-start">
          <IconButton sx={{ color: 'text.primary' }} onClick={handleBlockDuplicateClick}>
            <CopyAll fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Paper>
  );
}
