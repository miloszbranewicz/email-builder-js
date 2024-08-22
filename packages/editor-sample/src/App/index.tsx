import React, { useEffect } from 'react';

import { Stack, useTheme } from '@mui/material';

import { resetDocument, useInspectorDrawerOpen, useSamplesDrawerOpen } from '../documents/editor/EditorContext';

import { Toaster } from 'react-hot-toast';
import InspectorDrawer, { INSPECTOR_DRAWER_WIDTH } from './InspectorDrawer';
import TemplatePanel from './TemplatePanel';

function useDrawerTransition(cssProperty: 'margin-left' | 'margin-right', open: boolean) {
  const { transitions } = useTheme();
  return transitions.create(cssProperty, {
    easing: !open ? transitions.easing.sharp : transitions.easing.easeOut,
    duration: !open ? transitions.duration.leavingScreen : transitions.duration.enteringScreen,
  });
}

export default function App() {
  const inspectorDrawerOpen = useInspectorDrawerOpen();
  const samplesDrawerOpen = useSamplesDrawerOpen();

  const marginLeftTransition = useDrawerTransition('margin-left', samplesDrawerOpen);
  const marginRightTransition = useDrawerTransition('margin-right', inspectorDrawerOpen);
  const defaultTemplate = {
    root: {
      data: {
        textColor: '#262626',
        fontFamily: 'MODERN_SANS',
        canvasColor: '#FFFFFF',
        childrenIds: [],
        backdropColor: '#F5F5F5',
      },
      type: 'EmailLayout',
    },
  };
  useEffect(() => {
    // Load template
    resetDocument(window?.email?.generator?.templateJSON || defaultTemplate);
  }, []);

  return (
    <>
      <InspectorDrawer />

      <Stack
        sx={{
          marginRight: inspectorDrawerOpen ? `${INSPECTOR_DRAWER_WIDTH}px` : 0,
          transition: [marginLeftTransition, marginRightTransition].join(', '),
        }}
      >
        <TemplatePanel />
      </Stack>
      <Toaster />
    </>
  );
}
