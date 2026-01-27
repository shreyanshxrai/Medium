import { Hono } from "hono";
import { User } from "@prisma/client";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinInput } from "@shreyanshxrai/medium-common";
import { signupInput } from "@shreyanshxrai/medium-common";
const userroute = new Hono<{
    Bindings : {
        PRISMA_ACCELERATE_URL: string;
        JWT_SECRET : string;
    }
}
>();

userroute.post('/signup', async(c)=>{
   const body = await c.req.json();
   const success = signupInput.safeParse(body);
   if(!success.success){
     c.status(403);
     return c.json({msg : "Invalid inputs. "})
   }
   else{
   const prisma = new PrismaClient({
    accelerateUrl: c.env.PRISMA_ACCELERATE_URL,
}).$extends(withAccelerate());
try{
const user =await prisma.user.create({
    data: {
        email :    body.username,
        name :     body.name ,
        password : body.password
    }
});

const payload = {
    id : user.id ,
    name : user.name
   
}
 const secret = c.env.JWT_SECRET
 const token = await sign(payload,secret);
 return c.json({msg : "User created successfully!",
    token : token
 })
 
//jwt
}
catch(err){
    return c.json({msg:"Error in signup"});
}
   }

});

userroute.post('/signin', async(c)=>{
    const body = await c.req.json();
    const success = signinInput.safeParse(body);
    if(!success.success){
        c.status(403)
        return c.json({msg : "Inputs invalid."})
    }

else{
    const prisma = new PrismaClient({
    accelerateUrl: c.env.PRISMA_ACCELERATE_URL,
}).$extends(withAccelerate());
try{
const user = await prisma.user.findUnique({
    where: {
        email: body.username,
        password : body.password
    }
});
if (user){
    const payload = {
       id : user.id,
       name : user.name
    };
    
   const secret = c.env.JWT_SECRET
    const token = await sign(payload,secret);
    return c.json({
        msg : "signed up!",
        token : token
    })
}
else{
   return c.json({msg: 'user doesnot exists'})
   }}
   catch(err){
    console.log(err);
    c.status(411);
    return c.text('invalid');
    
   }
}}
   
);
export default userroute;
