import { PrismaClient } from "@prisma/client"
import { NotFoundError } from "@prisma/client/runtime"
import { Request, Response } from 'express'

module.exports.getAll = async (req: Request, res: Response) => {
    const prisma = new PrismaClient()
    const cats = await prisma.category.findMany({
        include: {
            positions: true
        }
    })
    prisma.$disconnect
    res.json(cats)
}

module.exports.create = async (req: Request, res: Response) => {
    const prisma = new PrismaClient()
    const cat = await prisma.category.findUnique({
        where:{
            title:req.body.title
        }
    })
    if (cat != null) {
        res.send('Категория уже существует')
    } else {
        const newCat = await prisma.category.create({
            data: {
                title: req.body.title,
            }
        })
        res.json(newCat)
    }
    prisma.$disconnect
}

module.exports.findOneByID = async (req: Request, res: Response) => {
    const prisma = new PrismaClient()
    const result = await prisma.category.findUniqueOrThrow({
        where: {
            id: +req.params.id
        }
    })
    res.json(result)
    prisma.$disconnect
}
module.exports.update = async (req: Request, res: Response) => {
    const prisma = new PrismaClient()
    const result = await prisma.category.update({
        where: {
            id: +req.params.id
        },
        data: {
            title: req.body.title
        }
    })
    res.json(result)
    prisma.$disconnect

}

module.exports.delete = async (req:Request,res: Response) => {
    const prisma = new PrismaClient()
    const allPos = await prisma.position.findMany({
        where:{categoryId:+req.params.id}
    })
    allPos.forEach(async (el) => {
        await prisma.position.delete({
            where:{
                id: el.id
            }
        })
    })
    await prisma.category.delete({
        where:{
            id:+req.params.id
        }
    })
    res.send(`Категория с ID ${req.params.id} удалена`)

}