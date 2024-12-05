import React, { useEffect, useState } from 'react';

import {
  VerticalAlignBottomOutlined,
  VerticalAlignCenterOutlined,
  VerticalAlignTopOutlined,
  FileOpen,
} from '@mui/icons-material';
import { Button, Link, Stack, ToggleButton, Tooltip } from '@mui/material';
import { ImageProps, ImagePropsSchema } from '@usewaypoint/block-image';

import BaseSidebarPanel from './helpers/BaseSidebarPanel';
import RadioGroupInput from './helpers/inputs/RadioGroupInput';
import TextDimensionInput from './helpers/inputs/TextDimensionInput';
import TextInput from './helpers/inputs/TextInput';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel';

type ImageSidebarPanelProps = {
  data: ImageProps;
  setData: (v: ImageProps) => void;
};
export default function ImageSidebarPanel({ data, setData }: ImageSidebarPanelProps) {
  const [, setErrors] = useState<Zod.ZodError | null>(null);
  const [renderTrigger, setRenderTrigger] = useState(0);

  useEffect(() => {
    const requestClipboardPermission = async () => {
      try {
        const permissionStatus = await navigator.permissions.query({ name: 'clipboard-read' as PermissionName });
        
        if (permissionStatus.state === 'prompt') {
          await navigator.clipboard.read();
        }
        return permissionStatus.state === 'granted';
      } catch (error) {
        console.debug('Clipboard API not supported:', error);
        return false;
      }
    };

    const handleClipboardAccess = async () => {
      try {
        const hasPermission = await requestClipboardPermission();

        if (hasPermission) {
          const clipboardItems = await navigator.clipboard.read();
          const isLastItemUrl = clipboardItems.length > 0 && clipboardItems[clipboardItems.length - 1].types.includes('text/plain');
          
          if (isLastItemUrl) {
            const textBlob = await clipboardItems[clipboardItems.length - 1].getType('text/plain');
            const text = await new Response(textBlob).text();
            const itemTrimmed = text.trim();
            const isImage = itemTrimmed.endsWith('.png') || itemTrimmed.endsWith('.jpg') || itemTrimmed.endsWith('.jpeg');
            const isUrl = itemTrimmed.startsWith('http') || itemTrimmed.startsWith('https');
            if (isImage && isUrl) {
              updateData({ ...data, props: { ...data.props, url: itemTrimmed } });
              setRenderTrigger(prev => prev + 1);
            }
          }
        }
      } catch (error) {
        console.debug('Clipboard access failed:', error);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        handleClipboardAccess();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [data]);

  const updateData = (d: unknown) => {
    const res = ImagePropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };



  return (
    <BaseSidebarPanel title="Blok obrazka">
      <Tooltip title="Przejdź do plików">
        <Button href={window?.email?.generator?.filesURL ?? ''} target="_blank" component={Link} variant="contained">
          Dodaj obrazek
        </Button>
      </Tooltip>
      <TextInput
        label="Url obrazka"
        defaultValue={data.props?.url ?? ''}
        key={renderTrigger}
        onChange={(v) => {
          const url = v.trim().length === 0 ? null : v.trim();
          updateData({ ...data, props: { ...data.props, url } });
        }}
      />

      <TextInput
        label="Tekst alternatywny"
        defaultValue={data.props?.alt ?? ''}
        onChange={(alt) => updateData({ ...data, props: { ...data.props, alt } })}
      />
      <TextInput
        label="Url przekierowania"
        defaultValue={data.props?.linkHref ?? ''}
        onChange={(v) => {
          const linkHref = v.trim().length === 0 ? null : v.trim();
          updateData({ ...data, props: { ...data.props, linkHref } });
        }}
      />
      <Stack direction="row" spacing={2}>
        <TextDimensionInput
          label="Szerokość"
          defaultValue={data.props?.width}
          onChange={(width) => updateData({ ...data, props: { ...data.props, width } })}
        />
        <TextDimensionInput
          label="Wysokość"
          defaultValue={data.props?.height}
          onChange={(height) => updateData({ ...data, props: { ...data.props, height } })}
        />
      </Stack>

      <RadioGroupInput
        label="Wyśrodkowanie"
        defaultValue={data.props?.contentAlignment ?? 'middle'}
        onChange={(contentAlignment) => updateData({ ...data, props: { ...data.props, contentAlignment } })}
      >
        <ToggleButton value="top">
          <VerticalAlignTopOutlined fontSize="small" />
        </ToggleButton>
        <ToggleButton value="middle">
          <VerticalAlignCenterOutlined fontSize="small" />
        </ToggleButton>
        <ToggleButton value="bottom">
          <VerticalAlignBottomOutlined fontSize="small" />
        </ToggleButton>
      </RadioGroupInput>

      <MultiStylePropertyPanel
        names={['backgroundColor', 'textAlign', 'padding']}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      />
    </BaseSidebarPanel>
  );
}
