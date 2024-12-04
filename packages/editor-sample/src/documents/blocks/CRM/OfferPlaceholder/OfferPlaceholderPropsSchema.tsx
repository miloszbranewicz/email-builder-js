import { z } from 'zod';



const OfferPlaceholderPropsSchema = z.object({
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
export default OfferPlaceholderPropsSchema;

export type OfferPlaceholderProps = z.infer<typeof OfferPlaceholderPropsSchema>;
