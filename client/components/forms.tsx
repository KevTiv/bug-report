import { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from 'next/router'
import { formFieldTypes } from "../type"

const Forms = ({isNewBug, id, title, description, location, processToReplicate, priorityStatus,
    author, isResolved, resolvedBy, url }:formFieldTypes ) => {
    
    const axios = require('axios')
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<formFieldTypes>();
    const onSubmitModifyBugReport: SubmitHandler<formFieldTypes> = data => console.log(data);

    const [currUserMetadata, setCurrUserMetadata] = useState<any>();
    
    const handleNewBugFormSubmit = async(data:formFieldTypes)=>{
        if(currUserMetadata.numbOfRaisedBugAllowed > 0){
            let newBugReport = {
                title: data.title,
                description: data.description,
                location: data.location,
                processToReplicate: data.processToReplicate,
                priorityStatus: data.priorityStatus,
                author: author,
                isResolved: JSON.parse(`${data.isResolved}`)
            }
            await axios.post('/api/bug/post',newBugReport).then(async()=>{
                let currUserMetadataUpdate={
                    id: currUserMetadata.id,
                    email: currUserMetadata.email,
                    authBy: currUserMetadata.authBy,
                    numbOfRaisedBugAllowed: (currUserMetadata.numbOfRaisedBugAllowed - 1),
                    allowedToModifyBugReport: currUserMetadata.allowedToModifyBugReport,
                    allowedToDeleteBugReport: currUserMetadata.allowedToDeleteBugReport,
                }
                await axios.put('/api/user/put',currUserMetadataUpdate).then(()=> router.reload())
            })
        }
    }
    const onSubmitNewBugReport: SubmitHandler<formFieldTypes> = data => {handleNewBugFormSubmit(data)};

    useEffect(() => {
        const getUserMetadata =async ()=> {
            await axios.get(`/api/user/${author}`).then((res:AxiosResponse)=>{
                setCurrUserMetadata(res.data)
            })
        }
        getUserMetadata()
    },[])

  return (
    <>
        <h1>{isNewBug ? "New Bug Report" : "Update Bug Report"}</h1>

        <form onSubmit={isNewBug? handleSubmit(onSubmitNewBugReport) : handleSubmit(onSubmitModifyBugReport)}>
            <div>
                <label>
                    Author
                    <input type="text" placeholder={author} value={author} disabled {...register("author")}/>
                </label>
                <label>
                    Title
                    <input type="text" {...register("title")}/>
                </label>
            </div>
            <div>
                <label>
                    Location
                    <textarea {...register("location")}/>
                </label>
                <label>
                    Description
                    <textarea {...register("description")}/>
                </label>
                 <label>
                    How to replicate
                    <textarea {...register("processToReplicate")}/>
                </label>
            </div>
            <div>
                <label>
                    Priority Status
                    <select id="priorityStatus" {...register("priorityStatus")}>
                        <option value="low">LOW</option>
                        <option value="normal">NORMAL</option>
                        <option value="high">HIGH</option>
                    </select>
                </label>
                <label>
                    Resolved
                    <select id="isBugResolved" {...register("isResolved")}>
                        <option value="false">Bug is not Resolved</option>
                        <option value="true">Bug is resolved</option>
                    </select>
                </label>
                <label>
                    Resolved By
                    {isNewBug ? 
                        <input type="text" disabled value="" {...register("resolvedBy")}/> 
                    : 
                        <input type="text" value={author} {...register("resolvedBy")}/>
                    }
                    
                </label>
            </div>
            <div>
                <label>
                    Upload Image
                    <input type="file"  />
                </label>
            </div>
            <button>Submit</button>
        </form>
    </>
  )
}

export default Forms