import React from 'react';

import {
  AccountCircleOutlined,
  Attachment,
  Crop32Outlined,
  HMobiledataOutlined,
  HorizontalRuleOutlined,
  HtmlOutlined,
  ImageOutlined,
  Link,
  NotesOutlined,
  SmartButtonOutlined,
} from '@mui/icons-material';

import { TEditorBlock } from '../../../../editor/core';

type TButtonProps = {
  label: string;
  icon: JSX.Element;
  block: () => TEditorBlock;
};
export const BUTTONS: TButtonProps[] = [
  {
    label: 'Nagłówek',
    icon: <HMobiledataOutlined />,
    block: () => ({
      type: 'Heading',
      data: {
        props: { text: 'Lorem ipsum dolor' },
        style: {
          padding: { top: 16, bottom: 16, left: 24, right: 24 },
        },
      },
    }),
  },
  {
    label: 'Tekst',
    icon: <NotesOutlined />,
    block: () => ({
      type: 'Text',
      data: {
        props: { text: 'Lorem ipsum dolor' },
        style: {
          padding: { top: 16, bottom: 16, left: 24, right: 24 },
          fontWeight: 'normal',
        },
      },
    }),
  },

  {
    label: 'Przycisk',
    icon: <SmartButtonOutlined />,
    block: () => ({
      type: 'Button',
      data: {
        props: {
          text: 'Przycisk',
          url: 'https://www.usewaypoint.com',
        },
        style: { padding: { top: 16, bottom: 16, left: 24, right: 24 } },
      },
    }),
  },
  {
    label: 'Obrazek',
    icon: <ImageOutlined />,
    block: () => ({
      type: 'Image',
      data: {
        props: {
          url: 'https://assets.usewaypoint.com/sample-image.jpg',
          alt: 'Przykładowy produkt',
          contentAlignment: 'middle',
          linkHref: null,
        },
        style: { padding: { top: 16, bottom: 16, left: 24, right: 24 } },
      },
    }),
  },
  {
    label: 'Avatar',
    icon: <AccountCircleOutlined />,
    block: () => ({
      type: 'Avatar',
      data: {
        props: {
          imageUrl: 'https://ui-avatars.com/api/?size=128',
          shape: 'circle',
        },
        style: { padding: { top: 16, bottom: 16, left: 24, right: 24 } },
      },
    }),
  },
  {
    label: 'Divider',
    icon: <HorizontalRuleOutlined />,
    block: () => ({
      type: 'Divider',
      data: {
        style: { padding: { top: 16, right: 0, bottom: 16, left: 0 } },
        props: {
          lineColor: '#CCCCCC',
        },
      },
    }),
  },
  {
    label: 'Spacer',
    icon: <Crop32Outlined />,
    block: () => ({
      type: 'Spacer',
      data: {},
    }),
  },
  {
    label: 'Html',
    icon: <HtmlOutlined />,
    block: () => ({
      type: 'Html',
      data: {
        props: { contents: '<strong>Hello world</strong>' },
        style: {
          fontSize: 16,
          textAlign: null,
          padding: { top: 16, bottom: 16, left: 24, right: 24 },
        },
      },
    }),
  },
  {
    label: 'Link do oferty',
    icon: <Link />,
    block: () => ({
      type: 'OfferLink',
      data: {
        props: {
          text: 'Link do oferty',
          url: window?.email?.generator?.offerLink || 'https://google.com',
        },
        style: { padding: { top: 16, bottom: 16, left: 24, right: 24 } },
      },
    }),
  },
  {
    label: 'Link do panelu klienta',
    icon: <Link />,
    block: () => ({
      type: 'ClientPanelLink',
      data: {
        props: {
          text: 'Link do panelu klienta',
          url: window?.email?.generator?.clientPanelLink || 'https://google.com',
        },
        style: { padding: { top: 16, bottom: 16, left: 24, right: 24 } },
      },
    }),
  },
  // {
  //   label: 'Kolumny',
  //   icon: <ViewColumnOutlined />,
  //   block: () => ({
  //     type: 'ColumnsContainer',
  //     data: {
  //       props: {
  //         columnsGap: 16,
  //         columnsCount: 3,
  //         columns: [{ childrenIds: [] }, { childrenIds: [] }, { childrenIds: [] }],
  //       },
  //       style: { padding: { top: 16, bottom: 16, left: 24, right: 24 } },
  //     },
  //   }),
  // },
  // {
  //   label: 'Kontener',
  //   icon: <LibraryAddOutlined />,
  //   block: () => ({
  //     type: 'Container',
  //     data: {
  //       style: { padding: { top: 16, bottom: 16, left: 24, right: 24 } },
  //     },
  //   }),
  // },
  {
    label: 'Załącznik',
    icon: <Attachment />,
    block: () => ({
      type: 'AttachmentsList',
      data: {
        style: {
          color: '#000000',
          backgroundColor: '#ffffff',
          fontFamily: 'MODERN_SANS',
          textAlign: 'left',
          fontWeight: 'normal',
          fontSize: 16,
          padding: {
            top: 16,
            bottom: 16,
            left: 24,
            right: 24,
          },
        },
        props: {
          attachment: {
            name: 'Przykładowy załącznik',
            url: 'https://unsplash.it/300/300',
          },
        },
      },
    }),
  },

  // { label: 'ProgressBar', icon: <ProgressBarOutlined />, block: () => ({}) },
  // { label: 'LoopContainer', icon: <ViewListOutlined />, block: () => ({}) },
];
