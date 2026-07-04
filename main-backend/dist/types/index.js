import { z } from "zod";
export const SignUpSchema = z.object({
    username: z.email(),
    password: z.string(),
    name: z.string
});
export const SignInSchema = z.object({
    username: z.email(),
    password: z.string(),
});
//# sourceMappingURL=index.js.map