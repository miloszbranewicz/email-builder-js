import React from 'react';

import { Box, Typography } from '@mui/material';

import { TEditorBlock } from '../../../documents/editor/core';
import { setDocument, useDocument, useSelectedBlockId } from '../../../documents/editor/EditorContext';

import AttachmentsListSidebarPanel from './input-panels/AttachmentsListSidebarPanel';
import AvatarSidebarPanel from './input-panels/AvatarSidebarPanel';
import ButtonSidebarPanel from './input-panels/ButtonSidebarPanel';
import ColumnsContainerSidebarPanel from './input-panels/ColumnsContainerSidebarPanel';
import ContainerSidebarPanel from './input-panels/ContainerSidebarPanel';
import DividerSidebarPanel from './input-panels/DividerSidebarPanel';
import EmailLayoutSidebarPanel from './input-panels/EmailLayoutSidebarPanel';
import HeadingSidebarPanel from './input-panels/HeadingSidebarPanel';
import HtmlSidebarPanel from './input-panels/HtmlSidebarPanel';
import ImageSidebarPanel from './input-panels/ImageSidebarPanel';
import OfferLinkSidebarPanel from './input-panels/OfferLinkSidebarPanel';
import SpacerSidebarPanel from './input-panels/SpacerSidebarPanel';
import TextSidebarPanel from './input-panels/TextSidebarPanel';

function renderMessage(val: string) {
  return (
    <Box sx={{ m: 3, p: 1, border: '1px dashed', borderColor: 'divider' }}>
      <Typography color="text.secondary">{val}</Typography>
    </Box>
  );
}

export default function ConfigurationPanel() {
  const document = useDocument();
  const selectedBlockId = useSelectedBlockId();

  if (!selectedBlockId) {
    return renderMessage('Kliknij na blok żeby wyświetlić opcje.');
  }
  const block = document[selectedBlockId];
  if (!block) {
    return renderMessage(`Nie znaleziono bloku o identyfikatorze ${selectedBlockId}. Kliknij blok, aby zresetować.`);
  }

  const setBlock = (conf: TEditorBlock) => setDocument({ [selectedBlockId]: conf });
  const { data, type } = block;
  switch (type) {
    case 'Avatar':
      return <AvatarSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'Button':
      return <ButtonSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'ColumnsContainer':
      return (
        <ColumnsContainerSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />
      );
    case 'Container':
      return <ContainerSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'Divider':
      return <DividerSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'Heading':
      return <HeadingSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'Html':
      return <HtmlSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'Image':
      return <ImageSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'EmailLayout':
      return <EmailLayoutSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'Spacer':
      return <SpacerSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'Text':
      return <TextSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'AttachmentsList':
      return (
        <AttachmentsListSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />
      );
    case 'OfferLink':
      return <OfferLinkSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'ClientPanelLink':
      return <OfferLinkSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    default:
      return <pre>{JSON.stringify(block, null, '  ')}</pre>;
  }
}
