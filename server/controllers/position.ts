import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { unlink } from 'fs'

module.exports.create = async (req: Request, res: Response) => {
    const prisma = new PrismaClient()
    console.log(req.body)
    const category = await prisma.category.findUniqueOrThrow({
        where: {
            id: +req.body.categoryId
        }
    })
    if (category) {
        const upl = req.files.photo
        upl.name = Date.now() + ".jpeg"
        const path = "./public/pics/" + upl.name
        upl.mv(path)
        const post = await prisma.position.create({
            data: {
                title: req.body.title,
                price: +req.body.price,
                composition: req.body.composition,
                photoPath: upl.name,
                categoryId: +req.body.categoryId
            }
        })
        res.json(post)
    } else {
        res.send("Категории не существует")
    }
    prisma.$disconnect
}

module.exports.update = async (req: Request, res: Response) => {
    const prisma = new PrismaClient()
    const pos = await prisma.position.findUniqueOrThrow({
        where: {
            id: +req.params.id
        }
    })
    if (req.files.photo == null) {
        prisma.position.update({
            where: {
                id: +req.params.id
            },
            data: {
                title: req.body.title,
                price: req.body.price,
                composition: req.body.composition,
                categoryId: req.body.categoryId,
                photoPath: pos.photoPath
            }
        })
    } else {
        const upl = req.files.photo
        upl.name = Date.now() + ".jpeg"
        const path = "./public/pics/" + upl.name
        upl.mv(path)
        await unlink('./public/pics/'+pos.photoPath, (e) => {console.log(e)})
        prisma.position.update({
            where: {
                id: +req.params.id
            },
            data: {
                title: req.body.title,
                price: req.body.price,
                composition: req.body.composition,
                categoryId: req.body.categoryId,
                photoPath: upl.name
            }
        })

        
    }
    res.sendStatus(200)
    prisma.$disconnect
}
module.exports.delete = async (req: Request, res: Response) => {
    const prisma = new PrismaClient()
    const pos = await prisma.position.findUniqueOrThrow({
        where: {
            id: +req.params.id
        }
    })
    await prisma.position.delete({
        where: {
            id: +req.params.id
        }
    })
    await unlink('./public/pics/'+pos.photoPath, (e) => {console.log(e)})
    res.send(`Pos with id ${req.params.id} deleted`)
    prisma.$disconnect
}

module.exports.getById = async (req: Request, res: Response) => {
    const prisma = new PrismaClient()
    const pos = await prisma.position.findUniqueOrThrow({
        where: {
            id: +req.params.id
        }
    })
    res.send(pos)
}