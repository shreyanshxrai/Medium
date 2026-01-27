import { Hono } from "hono";
import {jwt} from 'hono/jwt'
import type { JwtVariables } from "hono/jwt"
import { PrismaClient} from "@prisma/client/edge";
import { Blog } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { authMiddleware } from "../auth/authMiddleware";
import { blogpostInput, blogputInput } from "@shreyanshxrai/medium-common";

type Variables = JwtVariables

const blogroute = new Hono<{
     Bindings : {
        PRISMA_ACCELERATE_URL: string;
        JWT_SECRET : string;
    }, Variables: Variables
}>();



blogroute.get('/blogbulk', authMiddleware ,async(c)=>{
    const prisma = new PrismaClient({
    accelerateUrl:c.env.PRISMA_ACCELERATE_URL
}).$extends(withAccelerate());

const posts = await prisma.blog.findMany({
    select : {
        title : true,
        content : true,
        id : true,
        date : true,
        author:{
            select : {
                name : true
            }
        }
    }
})
return c.json(posts)
});

blogroute.get('/:id', authMiddleware, async (c)=>{
    const idparam = c.req.param('id');
    const id = parseInt(idparam);
    const prisma = new PrismaClient({
    accelerateUrl:c.env.PRISMA_ACCELERATE_URL
}).$extends(withAccelerate());

const post = await prisma.blog.findUnique({
    where :{
        id : id
    },
    select : {
        title : true,
        content : true,
        id : true,
        date : true,
        author:{
            select : {
                name : true
            }
        }
    }
})
return c.json(post);
});


blogroute.post('/post', authMiddleware, async(c)=>{
   const user = c.get('user');
    const userid = user.id;
    const body =await c.req.json();
    const success = blogpostInput.safeParse(body);
    if (!success.success){
        c.status(403);
        return c.json({msg: "Invalid inputs."})
    }

    else{
const prisma = new PrismaClient({
    accelerateUrl:c.env.PRISMA_ACCELERATE_URL
}).$extends(withAccelerate());
 try {
const blog = await prisma.blog.create({
    data:{
        title : body.title,
        content : body.content,
        authorid : userid
    }

 });
 return c.json({
    id:blog.id
 })
 }
 catch(err){
    console.log(err);
    return c.json({msg : 'Error in Post'})
 }

   
}});

blogroute.put('/update', authMiddleware ,async (c)=>{
    const user = c.get('user');
    const userid = user.id;
    const body =await c.req.json();
    const success = blogputInput.safeParse(body)
    if(!success.success){
        c.status(403);
        return c.json({msg : "Inputs invalid"})
    }
    else{
const prisma = new PrismaClient({
    accelerateUrl:c.env.PRISMA_ACCELERATE_URL
}).$extends(withAccelerate());
try {
const updatedblog = await prisma.blog.update({
    where : {
        id : body.id,
        authorid : userid
    },
    data : {
        title : body.title,
        content : body.content
    }
});
return c.json({msg : 'Updated Post!'})}
catch(err){
    console.log(err);
    return c.json({msg : 'Not updated'})
}

    
}});

export default blogroute;
