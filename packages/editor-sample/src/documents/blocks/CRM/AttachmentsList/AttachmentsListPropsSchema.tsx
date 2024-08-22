import { z } from 'zod';

import { zFontFamily, zTextAlign } from '../../helpers/zod';

const AttachmentObjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
});

const StyleSchema = z.object({
  color: z.string().nullable(),
  backgroundColor: z.string().nullable(),
  fontFamily: zFontFamily(),
  fontSize: z.number().nullable(),
  fontWeight: z.string().nullable(),
  textAlign: zTextAlign(),
  padding: z
    .object({
      top: z.number(),
      bottom: z.number(),
      left: z.number(),
      right: z.number(),
    })
    .optional()
    .nullable(),
});

const AttachmentsListPropsSchema = z.object({
  style: StyleSchema,
  props: z
    .object({
      attachment: z.object({
        name: z.string(),
        url: z.string(),
      }).nullable(),
    })
    .optional()
    .nullable(),
});
export default AttachmentsListPropsSchema;

export type AttachmentsListProps = z.infer<typeof AttachmentsListPropsSchema>;
