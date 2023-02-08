import express, { Request, Response } from 'express'
import cors from 'cors'
// import { db } from './database/BaseDatabase'
import { TVideoDB, TVideoDBPost } from './types'
import { Video } from './models/Videos'
import { VideoDatabase } from './database/VideoDatabase'
import { VideoController } from './controller/VideoController'
import { videoRouter } from './router/videoRouter'



const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

app.get("/ping", async (req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "Pong!" })
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// const videoController = new VideoController()


app.use("/videos", videoRouter)








