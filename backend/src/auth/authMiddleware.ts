import { createMiddleware } from 'hono/factory'
import { verify } from 'hono/jwt'
import { JWTPayload } from 'hono/utils/jwt/types';

type AppJwtPayload =  JWTPayload &{
  id: number
}
export const authMiddleware = createMiddleware<{
    Bindings : {
        JWT_SECRET : string;
    },
  Variables: {
    user: AppJwtPayload
   
    
  }
}>(async (c, next) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')){
    c.status(403)
    return c.json({ msg :'Auth invalid'})
  };
 try{
  const token = authHeader.split(" ")[1];
  const decodedpayload = await verify(token , c.env.JWT_SECRET)
  c.set('user', decodedpayload as AppJwtPayload)
 }
 catch(err){
    c.status(403);
    return c.json({
      message : "You are not Logged in. "
    })
 }
 
  await next()
})

