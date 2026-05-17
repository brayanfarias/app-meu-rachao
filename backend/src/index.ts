import express, { Request, Response } from 'express'

const app = express()
const port = process.env.PORT ? Number(process.env.PORT) : 3000

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' })
})

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello from MeuRachao backend')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})


