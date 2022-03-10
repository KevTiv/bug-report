import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../prisma'
// check if user is in the prisma db

export default async function handle(req:NextApiRequest, res:NextApiResponse){
    const result = await prisma.user.findMany()
    res.json(result)
}