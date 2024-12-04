import { z } from 'zod';



const OfferAttachmentsPlaceholderPropsSchema = z.object({
  style: z.object({
    padding: z.object({
      top: z.number(),
      bottom: z.number(),
      left: z.number(),
      right: z.number(),
    }),
  }),
  props: z
    .object({
      text: z.string(),
    })
    .optional()
    .nullable(),
});
export default OfferAttachmentsPlaceholderPropsSchema;

export type OfferAttachmentsPlaceholderProps = z.infer<typeof OfferAttachmentsPlaceholderPropsSchema>;
