import z from "zod";

export const signupInput = z.object({
    username : z.string().email(),
    name : z.string().optional(),
    password : z.string()
});

export type signupInput = z.infer< typeof signupInput>;


export const signinInput = z.object({
    username : z.string().email(),
    password : z.string()
}) ;

export type signinInput = z.infer< typeof signinInput>;

export const blogpostInput = z.object({
    title : z.string(),
    content : z.string()
});

export type blogpostInput = z.infer < typeof blogpostInput>;

export const blogputInput = z.object({
    id : z.number(),
    title : z.string(),
    content : z.string()
});

export type blogputInput = z.infer < typeof blogputInput>;