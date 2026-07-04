import { z } from "zod";
export declare const SignUpSchema: z.ZodObject<{
    username: z.ZodEmail;
    password: z.ZodString;
    name: typeof z.string;
}, z.core.$strip>;
export declare const SignInSchema: z.ZodObject<{
    username: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=index.d.ts.map