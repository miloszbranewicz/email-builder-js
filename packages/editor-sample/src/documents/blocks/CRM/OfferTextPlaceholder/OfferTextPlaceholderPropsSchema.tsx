import { z } from 'zod'

const OfferTextPlaceholderPropsSchema = z.object({
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
export default OfferTextPlaceholderPropsSchema;

export type OfferTextPlaceholderProps = z.infer<typeof OfferTextPlaceholderPropsSchema>;
