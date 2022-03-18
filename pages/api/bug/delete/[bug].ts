import type { NextApiRequest, NextApiResponse } from 'next'
import {prisma} from '../../../../prisma'
import supabase from '../../../../supabaseLib'


// POST /api/post
// Required fields in body: title, authorEmail
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const bugImgUrl = await prisma.current_bug.findUnique({
    where:{ id: parseInt(req.query.bug as string)},
    select:{url:true}
  })
  if(bugImgUrl){
    let imgURL = bugImgUrl.url
    let bugImgName = imgURL?.substring(88)
    if(bugImgName){

      try {
        const { data, error } = await supabase.storage
        .from('bug-report-screenshot')
        .remove([bugImgName])
      } catch (error) {
        console.error(error)
      }
    }
  }
  const result = await prisma.current_bug.delete({
    where:{ id: parseInt(req.query.bug as string)},
  })
  res.json(result)
  
}