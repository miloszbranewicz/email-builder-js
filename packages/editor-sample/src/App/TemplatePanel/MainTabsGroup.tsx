import React from 'react';

import { DataObjectOutlined, EditOutlined } from '@mui/icons-material';
import { Tab, Tabs, Tooltip } from '@mui/material';

import { setSelectedMainTab, useSelectedMainTab } from '../../documents/editor/EditorContext';

export default function MainTabsGroup() {
  const selectedMainTab = useSelectedMainTab();
  const handleChange = (_: unknown, v: unknown) => {
    switch (v) {
      case 'json':
      case 'preview':
      case 'editor':
      case 'html':
        setSelectedMainTab(v);
        return;
      default:
        setSelectedMainTab('editor');
    }
  };

  return (
    <Tabs value={selectedMainTab} onChange={handleChange}>
      <Tab
        value="editor"
        label={
          <Tooltip title="Edytuj">
            <EditOutlined fontSize="small" />
          </Tooltip>
        }
      />
      {/* <Tab
        value="preview"
        label={
          <Tooltip title="Podgląd">
            <PreviewOutlined fontSize="small" />
          </Tooltip>
        }
      /> */}
      {/* <Tab
        value="html"
        label={
          <Tooltip title="Wyjściowy HTML">
            <CodeOutlined fontSize="small" />
          </Tooltip>
        }
      /> */}
      <Tab
        value="json"
        label={
          <Tooltip title="Wyjściowy JSON">
            <DataObjectOutlined fontSize="small" />
          </Tooltip>
        }
      />
    </Tabs>
  );
}
