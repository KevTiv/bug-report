import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../prisma'
// check if user is in the prisma db

export default async function handle(req:NextApiRequest, res:NextApiResponse){
    const result = await prisma.user.create({
        data:req.body
    })
    res.json(result)
}