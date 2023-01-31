import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from './database/knex'
import { TVideoDB, TVideoDBPost } from './types'
import { Video } from './models/Videos'


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


app.get("/videos", async (req: Request, res: Response) => {
    try {
        const q = req.query.q

        let videosDB //underfined

        if (q) {
            const result: TVideoDB[] = await db("videos").where("title", "LIKE", `%${q}%`)
            videosDB = result
        } else {
            const result: TVideoDB[] = await db("videos")
            videosDB = result //dado cru
        }

         //vamos pegar as informações vindas do videosBD e INSTANCIA-LA em um objeto da classe Video
                    
        const vide: Video[] = videosDB.map((videoDB)=> new Video(
            videoDB.id,
            videoDB.title,
            videoDB.duration,
            videoDB.created_at
        ))

        //videos[0].name = "patricia" // não permite pq name é privado na classe User

        res.status(200).send(vide) //dado instanciado
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






app.post("/videos", async (req: Request, res: Response) => {
    try {
        const { id, title, duration, created_at} = req.body //dado cru

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser string")
        }

        if (typeof title !== "string") {
            res.status(400)
            throw new Error("'title' deve ser string")
        }

        if (typeof duration !== "number") {
            res.status(400)
            throw new Error("'duration' deve ser number")
        }

        if (typeof created_at !== "string") {
            res.status(400)
            throw new Error("'created_at' deve ser string")
        }

        const [ videoDBExists ]: TVideoDB[] | undefined[] = await db("videos").where({ id })

        if (videoDBExists) {
            res.status(400)
            throw new Error("'id' já existe")
        }

        const newVideo = new Video(
            id, 
            title, 
            duration,
            new Date().toISOString()
        )

        //2 - Objeto simples para MODELAR as informações para o banco de dados
        const newVideoDB = {
            id: newVideo.getId(),
            title: newVideo.getTitulo(),
            duration: newVideo.getDuracao(),
            created_at: newVideo.getCreated_at() 
        }

        await db("videos").insert(newVideoDB)
                                                               
        res.status(201).send(newVideo) 
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