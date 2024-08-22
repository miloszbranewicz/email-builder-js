import React, { CSSProperties } from 'react';
import { z } from 'zod';

const FONT_FAMILY_SCHEMA = z
  .enum([
    'MODERN_SANS',
    'BOOK_SANS',
    'ORGANIC_SANS',
    'GEOMETRIC_SANS',
    'HEAVY_SANS',
    'ROUNDED_SANS',
    'MODERN_SERIF',
    'BOOK_SERIF',
    'MONOSPACE',
  ])
  .nullable()
  .optional();

function getFontFamily(fontFamily: z.infer<typeof FONT_FAMILY_SCHEMA>) {
  switch (fontFamily) {
    case 'MODERN_SANS':
      return '"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif';
    case 'BOOK_SANS':
      return 'Optima, Candara, "Noto Sans", source-sans-pro, sans-serif';
    case 'ORGANIC_SANS':
      return 'Seravek, "Gill Sans Nova", Ubuntu, Calibri, "DejaVu Sans", source-sans-pro, sans-serif';
    case 'GEOMETRIC_SANS':
      return 'Avenir, "Avenir Next LT Pro", Montserrat, Corbel, "URW Gothic", source-sans-pro, sans-serif';
    case 'HEAVY_SANS':
      return 'Bahnschrift, "DIN Alternate", "Franklin Gothic Medium", "Nimbus Sans Narrow", sans-serif-condensed, sans-serif';
    case 'ROUNDED_SANS':
      return 'ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa, Manjari, "Arial Rounded MT Bold", Calibri, source-sans-pro, sans-serif';
    case 'MODERN_SERIF':
      return 'Charter, "Bitstream Charter", "Sitka Text", Cambria, serif';
    case 'BOOK_SERIF':
      return '"Iowan Old Style", "Palatino Linotype", "URW Palladio L", P052, serif';
    case 'MONOSPACE':
      return '"Nimbus Mono PS", "Courier New", "Cutive Mono", monospace';
  }
  return undefined;
}

const COLOR_SCHEMA = z
  .string()
  .regex(/^#[0-9a-fA-F]{6}$/)
  .nullable()
  .optional();

const PADDING_SCHEMA = z
  .object({
    top: z.number(),
    bottom: z.number(),
    right: z.number(),
    left: z.number(),
  })
  .optional()
  .nullable();

const getPadding = (padding: z.infer<typeof PADDING_SCHEMA>) =>
  padding ? `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px` : undefined;

export const OfferLinkPropsSchema = z.object({
  style: z
    .object({
      backgroundColor: COLOR_SCHEMA,
      fontSize: z.number().min(0).optional().nullable(),
      fontFamily: FONT_FAMILY_SCHEMA,
      fontWeight: z.enum(['bold', 'normal']).optional().nullable(),
      textAlign: z.enum(['left', 'center', 'right']).optional().nullable(),
      padding: PADDING_SCHEMA,
    })
    .optional()
    .nullable(),
  props: z
    .object({
      offerLinkBackgroundColor: COLOR_SCHEMA,
      offerLinkStyle: z.enum(['rectangle', 'pill', 'rounded']).optional().nullable(),
      offerLinkTextColor: COLOR_SCHEMA,
      fullWidth: z.boolean().optional().nullable(),
      size: z.enum(['x-small', 'small', 'large', 'medium']).optional().nullable(),
      text: z.string().optional().nullable(),
      url: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
});

export type OfferLinkProps = z.infer<typeof OfferLinkPropsSchema>;

function getRoundedCorners(props: OfferLinkProps['props']) {
  const offerLinkStyle = props?.offerLinkStyle ?? OfferLinkPropsDefaults.offerLinkStyle;

  switch (offerLinkStyle) {
    case 'rectangle':
      return undefined;
    case 'pill':
      return 64;
    case 'rounded':
    default:
      return 4;
  }
}

function getOfferLinkSizePadding(props: OfferLinkProps['props']) {
  const size = props?.size ?? OfferLinkPropsDefaults.size;
  switch (size) {
    case 'x-small':
      return [4, 8] as const;
    case 'small':
      return [8, 12] as const;
    case 'large':
      return [16, 32] as const;
    case 'medium':
    default:
      return [12, 20] as const;
  }
}

export const OfferLinkPropsDefaults = {
  text: '',
  url: '',
  fullWidth: false,
  size: 'medium',
  offerLinkStyle: 'rounded',
  offerLinkTextColor: '#FFFFFF',
  offerLinkBackgroundColor: '#999999',
} as const;

export function OfferLink({ style, props }: OfferLinkProps) {
  const text = props?.text ?? OfferLinkPropsDefaults.text;
  const url = props?.url ?? OfferLinkPropsDefaults.url;
  const fullWidth = props?.fullWidth ?? OfferLinkPropsDefaults.fullWidth;
  const offerLinkTextColor = props?.offerLinkTextColor ?? OfferLinkPropsDefaults.offerLinkTextColor;
  const offerLinkBackgroundColor = props?.offerLinkBackgroundColor ?? OfferLinkPropsDefaults.offerLinkBackgroundColor;

  const padding = getOfferLinkSizePadding(props);
  const textRaise = (padding[1] * 2 * 3) / 4;
  const wrapperStyle: CSSProperties = {
    backgroundColor: style?.backgroundColor ?? undefined,
    textAlign: style?.textAlign ?? undefined,
    padding: getPadding(style?.padding),
  };
  const linkStyle: CSSProperties = {
    color: offerLinkTextColor,
    fontSize: style?.fontSize ?? 16,
    fontFamily: getFontFamily(style?.fontFamily),
    fontWeight: style?.fontWeight ?? 'bold',
    backgroundColor: offerLinkBackgroundColor,
    borderRadius: getRoundedCorners(props),
    display: fullWidth ? 'block' : 'inline-block',
    padding: `${padding[0]}px ${padding[1]}px`,
    textDecoration: 'none',
  };

  return (
    <div style={wrapperStyle}>
      <a href={url} style={linkStyle} target="_blank">
        <span
          dangerouslySetInnerHTML={{
            __html: `<!--[if mso]><i style="letter-spacing: ${padding[1]}px;mso-font-width:-100%;mso-text-raise:${textRaise}" hidden>&nbsp;</i><![endif]-->`,
          }}
        />
        <span>{text}</span>
        <span
          dangerouslySetInnerHTML={{
            __html: `<!--[if mso]><i style="letter-spacing: ${padding[1]}px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]-->`,
          }}
        />
      </a>
    </div>
  );
}
