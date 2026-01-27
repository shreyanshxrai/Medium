import { Hono } from 'hono'
import server from './routes/server'
import { cors } from "hono/cors"

const app = new Hono()

app.use(
  "*",
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-frontend-domain.vercel.app"
    ],
    credentials: true,
  })
)

app.route('/api',server);

export default app ;

