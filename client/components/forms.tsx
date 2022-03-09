import { useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import prisma from "../prisma"
import supabase from "../supabaseLib"

type formFieldTypes = {
    isNewBug? : boolean, 
    id? : number,
    title? : string,
    description? : string,
    location? : string,
    processToReplicate? : string,
    priorityStatus? : string,
    author? : string,
    isResolved? : boolean,
    resolvedBy? : string,
    url? : string,

    currUserMetadata? :{ 
        id? : string,
        email? : string,
        authBy? : string,
        numbOfRaisedBugAllowed? : number,
        allowedToModifyBugReport? : boolean,
        allowedToDeleteBugReport? : boolean,
    }
}

const Forms = ({isNewBug, id, title, description, location, processToReplicate, priorityStatus,
    author, isResolved, resolvedBy, url, currUserMetadata }:formFieldTypes ) => {
    
    //TODO change fetch with Axios...
    
    const { register, handleSubmit, watch, formState: { errors } } = useForm<formFieldTypes>();
    const onSubmitModifyBugReport: SubmitHandler<formFieldTypes> = data => console.log(data);
    
    const handleNewBugFormSubmit = (data:formFieldTypes)=>{
        if(currUserMetadata!.numbOfRaisedBugAllowed! > 0){
            console.log('new bug report begin', data);
            let newBugReport = {
                author: author,
                title: data.title,
                description: data.description,
                processToReplicate: data.processToReplicate,
                priorityStatus: data.priorityStatus,
                isResolved: data.isResolved,
            }
            fetch('/api/bug/post',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'same-origin',
                body: JSON.stringify(newBugReport)
            }).then(()=>{
                let currUserMetadataUpdate={
                    id: currUserMetadata!.id,
                    numbOfRaisedBugAllowed: (currUserMetadata!.numbOfRaisedBugAllowed! - 1)
                }
                fetch('/api/user/post',{
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'same-origin',
                    body: JSON.stringify(currUserMetadataUpdate)
                })

            })
        }
        
    }
    const onSubmitNewBugReport: SubmitHandler<formFieldTypes> = data => {handleNewBugFormSubmit(data)};

  return (
    <>
        <h1>{isNewBug ? "New Bug Report" : "Update Bug Report"}</h1>

        <form onSubmit={isNewBug? handleSubmit(onSubmitNewBugReport) : handleSubmit(onSubmitModifyBugReport)}>
            <div>
                <label>
                    Author
                    <input type="text" placeholder={author} disabled/>
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

export async function getServerSideProps({ req }:any) {
  const { user } = await supabase.auth.api.getUserByCookie(req)
  
  if (!user) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: '/', permanent: false } }
  }
  
  const currUserMetadata = fetch(`/api/user/${user.id}`);
  
  // If there is a user, return it.
  return { props: { currUserMetadata } }
}