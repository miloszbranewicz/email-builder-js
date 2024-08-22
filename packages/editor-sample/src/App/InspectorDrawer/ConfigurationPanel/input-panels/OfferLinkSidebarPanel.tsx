import React, { useState } from 'react';

import { ToggleButton } from '@mui/material';

import {
  OfferLinkProps,
  OfferLinkPropsDefaults,
  OfferLinkPropsSchema,
} from '../../../../documents/blocks/CRM/OfferLink/OfferLink';

import BaseSidebarPanel from './helpers/BaseSidebarPanel';
import ColorInput from './helpers/inputs/ColorInput';
import RadioGroupInput from './helpers/inputs/RadioGroupInput';
import TextInput from './helpers/inputs/TextInput';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel';

type OfferLinkSidebarPanelProps = {
  data: OfferLinkProps;
  setData: (v: OfferLinkProps) => void;
};
export default function OfferLinkSidebarPanel({ data, setData }: OfferLinkSidebarPanelProps) {
  const [, setErrors] = useState<Zod.ZodError | null>(null);

  const updateData = (d: unknown) => {
    const res = OfferLinkPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  const text = data.props?.text ?? OfferLinkPropsDefaults.text;

  const fullWidth = data.props?.fullWidth ?? OfferLinkPropsDefaults.fullWidth;
  const size = data.props?.size ?? OfferLinkPropsDefaults.size;
  const offerLinkStyle = data.props?.offerLinkStyle ?? OfferLinkPropsDefaults.offerLinkStyle;
  const offerLinkTextColor = data.props?.offerLinkTextColor ?? OfferLinkPropsDefaults.offerLinkTextColor;
  const offerLinkBackgroundColor =
    data.props?.offerLinkBackgroundColor ?? OfferLinkPropsDefaults.offerLinkBackgroundColor;

  return (
    <BaseSidebarPanel title="Przycisk">
      <TextInput
        label="Tekst"
        defaultValue={text}
        onChange={(text) => updateData({ ...data, props: { ...data.props, text } })}
      />
      {/* <TextInput
        label="Url"
        defaultValue={url}
        onChange={(url) => updateData({ ...data, props: { ...data.props, url } })}
      /> */}
      <RadioGroupInput
        label="Szerokość"
        defaultValue={fullWidth ? 'FULL_WIDTH' : 'AUTO'}
        onChange={(v) => updateData({ ...data, props: { ...data.props, fullWidth: v === 'FULL_WIDTH' } })}
      >
        <ToggleButton value="FULL_WIDTH">Full</ToggleButton>
        <ToggleButton value="AUTO">Auto</ToggleButton>
      </RadioGroupInput>
      <RadioGroupInput
        label="Rozmiar"
        defaultValue={size}
        onChange={(size) => updateData({ ...data, props: { ...data.props, size } })}
      >
        <ToggleButton value="x-small">Xs</ToggleButton>
        <ToggleButton value="small">Sm</ToggleButton>
        <ToggleButton value="medium">Md</ToggleButton>
        <ToggleButton value="large">Lg</ToggleButton>
      </RadioGroupInput>
      <RadioGroupInput
        label="Style"
        defaultValue={offerLinkStyle}
        onChange={(offerLinkStyle) => updateData({ ...data, props: { ...data.props, offerLinkStyle } })}
      >
        <ToggleButton value="rectangle">Kwadrat</ToggleButton>
        <ToggleButton value="rounded">Zaokrąglony</ToggleButton>
        <ToggleButton value="pill">Pill</ToggleButton>
      </RadioGroupInput>
      <ColorInput
        label="Kolor tekstu"
        defaultValue={offerLinkTextColor}
        onChange={(offerLinkTextColor) => updateData({ ...data, props: { ...data.props, offerLinkTextColor } })}
      />
      <ColorInput
        label="Kolor tła linku"
        defaultValue={offerLinkBackgroundColor}
        onChange={(offerLinkBackgroundColor) => updateData({ ...data, props: { ...data.props, offerLinkBackgroundColor } })}
      />
      <MultiStylePropertyPanel
        names={['backgroundColor', 'fontFamily', 'fontSize', 'fontWeight', 'textAlign', 'padding']}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      />
    </BaseSidebarPanel>
  );
}
