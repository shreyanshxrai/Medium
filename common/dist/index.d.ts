import z from "zod";
export declare const signupInput: z.ZodObject<{
    username: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    password: z.ZodString;
}, z.core.$strip>;
export type signupInput = z.infer<typeof signupInput>;
export declare const signinInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type signinInput = z.infer<typeof signinInput>;
export declare const blogpostInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, z.core.$strip>;
export type blogpostInput = z.infer<typeof blogpostInput>;
export declare const blogputInput: z.ZodObject<{
    id: z.ZodNumber;
    title: z.ZodString;
    content: z.ZodString;
}, z.core.$strip>;
export type blogputInput = z.infer<typeof blogputInput>;
//# sourceMappingURL=index.d.ts.map