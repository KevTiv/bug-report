import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../prisma'
// check if user is in the prisma db

export default async function handle(req:NextApiRequest, res:NextApiResponse){
    const { query: {user}} = req
    const result = await prisma.user.findUnique({
        where:{
            id: user as string
        }
    })
    res.json(result)
}