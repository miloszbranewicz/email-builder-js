import { z } from 'zod';



const UserFooterPlaceholderPropsSchema = z.object({
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
export default UserFooterPlaceholderPropsSchema;

export type UserFooterPlaceholderProps = z.infer<typeof UserFooterPlaceholderPropsSchema>;
