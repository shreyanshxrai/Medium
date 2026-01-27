import { Hono } from "hono";
import userroute from "./user";
import blogroute from "./blog";

const server  = new Hono();
server.route('/v1/user', userroute);
server.route('/v1/blog',blogroute);

export default server ;

