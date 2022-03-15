import Image from 'next/image'
import { useForm, SubmitHandler } from "react-hook-form"
import { ErrorMessage } from '@hookform/error-message'
import { useRouter } from 'next/router'
import { formFieldTypes } from "../type"
import supabase from "../supabaseLib"
import fnt from '../styles/Fonts.module.scss'
    //TODO change resolved by to a dropdown selection menu with all the user of the app

const Forms = ({isNewBug, id, title, description, location, processToReplicate, priorityStatus,
    author, isResolved, resolvedBy, url, allUser, currUserMetadata}:formFieldTypes ) => {
    
    const axios = require('axios')
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<formFieldTypes>()

    // const [currUserMetadata, setCurrUserMetadata] = useState<any>()

    const handleNewBugFormSubmit = async(data:formFieldTypes)=>{
        if(currUserMetadata && currUserMetadata.numbOfRaisedBugAllowed! > 0){
            let imgUrl
            if(data.file){
                uploadImgFile(data.file[0])
                imgUrl = await getImgUrl(data.file[0])
            }
            let newBugReport = {
                title: data.title,
                description: data.description,
                location: data.location,
                processToReplicate: data.processToReplicate,
                priorityStatus: data.priorityStatus,
                author: author,
                isResolved: JSON.parse(`${data.isResolved}`),
                url: imgUrl
            }
            await axios.post('/api/bug/post',newBugReport).then(()=>{
                sessionStorage.setItem('user_most_recent_action', `You successfully created a new bug report: ${data.title}.`)
                updateCurrPrivilege()
            })
        }
    }
    const onSubmitNewBugReport: SubmitHandler<formFieldTypes> = data => {handleNewBugFormSubmit(data)};

    const handleModifyBugFormSubmit = async(data:formFieldTypes)=>{
        if(currUserMetadata && currUserMetadata.allowedToModifyBugReport){
            let modifiedBugReport = {
                id: id,
                title: data.title,
                description: data.description,
                location: data.location,
                processToReplicate: data.processToReplicate,
                priorityStatus: data.priorityStatus,
                author: author,
                resolvedBy: data.resolvedBy,
                isResolved: JSON.parse(`${data.isResolved}`)
            }
            await axios.put('/api/bug/put',modifiedBugReport).then(()=>{
                sessionStorage.setItem('user_most_recent_action', `You successfully modified the ${id} - ${data.title} bug report.`)
                updateCurrPrivilege()
            })
        }
    }
    const onSubmitModifyBugReport: SubmitHandler<formFieldTypes> = data => handleModifyBugFormSubmit(data);
   
    const updateCurrPrivilege = async()=>{
        let currUserMetadataUpdate={
            id: currUserMetadata!.id,
            email: currUserMetadata!.email,
            authBy: currUserMetadata!.authBy,
            numbOfRaisedBugAllowed: (currUserMetadata!.numbOfRaisedBugAllowed! - 1),
            allowedToModifyBugReport: currUserMetadata!.allowedToModifyBugReport,
            allowedToDeleteBugReport: currUserMetadata!.allowedToDeleteBugReport,
        }
        await axios.put('/api/user/put',currUserMetadataUpdate).then(()=>router.push('/dashboard'))
    }
    const uploadImgFile = async(file: File)=>{
        const maxImgFileSize = 5 //MB
        if(file.size <= (maxImgFileSize * 8000000)){
            try {
                const { data, error } = await supabase.storage
                .from('bug-report-screenshot')
                // .upload(`${file.name}`, decode('base64FileData'), {
                //     contentType: `${file.type}`
                // })
                // .from('avatars')
                .upload(`${file.name}`, file)
            } catch (error) {
                console.error(error)
            }          
        }else{
            alert(`This image is too large. Maximum size:${maxImgFileSize} MB`)
        }
    }
    
    const getImgUrl= async(file:File)=>{
        try {
            const { publicURL, error } = supabase.storage
            .from('bug-report-screenshot')
            .getPublicUrl(`${file.name}`)
            return publicURL
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <>
        {(!isNewBug && url) ? 
            <div>
                <Image src={url} alt={`${title} screenshot`} layout="responsive" width="200" height="200"/>
            </div>
        :null}
        <form className="dark:text-white" onSubmit={isNewBug? handleSubmit(onSubmitNewBugReport) : handleSubmit(onSubmitModifyBugReport)}>
            <div>
                <label className="flex flex-col ml-2 py-3">
                    <h2 className={`${fnt.title__font} text-xl`}>Author</h2>
                    <input className="rounded-md px-1 border-b-4 disabled:bg-black/10 dark:disabled:bg-white/10" type="text" placeholder={author} value={author} disabled {...register("author")}/>
                </label>
                <label className="flex flex-col ml-2 py-3">
                    <h2 className={`${fnt.title__font} text-xl`}>Title</h2>
                    <input className="h-9 rounded-md px-1 border-2 border-black/10 focus:ring-1 focus:outline-none focus:ring-sky-400 dark:bg-white/10" type="text" 
                        {...register("title", { required: "This is required" })} placeholder={title? title : ''}/>
                    <ErrorMessage errors={errors} name="title" />
                </label>
            </div>
            <div>
                <label className="flex flex-col ml-2 py-3">
                    <h2 className={`${fnt.title__font} text-xl`}>Location</h2>
                    <textarea className="h-28 rounded-md px-1 border-2 border-black/10 focus:ring-1 focus:outline-none focus:ring-sky-400 dark:bg-white/10" 
                        {...register("location", { required: "This is required" })} placeholder={location? location : ''}/>
                    <ErrorMessage errors={errors} name="location" />
                </label>
                <label className="flex flex-col ml-2 py-3">
                    <h2 className={`${fnt.title__font} text-xl`}>Description</h2>
                    <textarea className="h-28 rounded-md px-1 border-2 border-black/10 focus:ring-1 focus:outline-none focus:ring-sky-400 dark:bg-white/10" 
                        {...register("description", { required: "This is required" })} placeholder={description? description : ''}/>
                    <ErrorMessage errors={errors} name="description" />
                </label>
                 <label className="flex flex-col ml-2 py-3">
                     <h2 className={`${fnt.title__font} text-xl`}>How to replicate</h2>
                    <textarea className="h-28 rounded-md px-1 border-2 border-black/10 focus:ring-1 focus:outline-none focus:ring-sky-400 dark:bg-white/10" 
                        {...register("processToReplicate", { required: "This is required" })} placeholder={processToReplicate? processToReplicate : ''}/>
                    <ErrorMessage errors={errors} name="processToReplicate" />
                </label>
            </div>
            <div>
                <label className="flex flex-col ml-2 py-3">
                    <h2 className={`${fnt.title__font} text-xl`}>Priority Status</h2>
                    <select className="h-9 rounded-md px-1 border-2 border-black/10 focus:ring-1 focus:outline-none focus:ring-sky-400 dark:bg-white/10" id="priorityStatus" {...register("priorityStatus")} placeholder={priorityStatus? priorityStatus : ''}>
                        <option value="low">LOW</option>
                        <option value="medium">MEDIUM</option>
                        <option value="high">HIGH</option>
                    </select>
                </label>
                <label className="flex flex-col ml-2 py-3">
                    <h2 className={`${fnt.title__font} text-xl`}>Resolved</h2>
                    <select className="h-9 rounded-md px-1 border-2 border-black/10 focus:ring-1 focus:outline-none focus:ring-sky-400 dark:bg-white/10" id="isBugResolved" {...register("isResolved")} placeholder={isResolved? 'Bug is resolved' : 'Bug is not Resolved'}>
                        <option value="false">Bug is not Resolved</option>
                        <option value="true">Bug is resolved</option>
                    </select>
                </label>
                <label className="flex flex-col ml-2 py-3">
                    <h2 className={`${fnt.title__font} text-xl`}>Resolved By</h2>
                    {isNewBug ? 
                        <input  className="rounded-md px-1 border-b-4 disabled:bg-black/10" type="text" disabled {...register("resolvedBy")}/> 
                    : 
                        // <input className="bg-black/10 rounded-md px-1 border-b-4 border-black/10" type="text" {...register("resolvedBy")} placeholder={resolvedBy}/> //allUser
                        <select className="h-9 rounded-md px-1 border-2 border-black/10 focus:ring-1 focus:outline-none focus:ring-sky-400 dark:bg-white/10" id="resolvedBy" {...register("resolvedBy")} placeholder={resolvedBy}>
                            {allUser?.map((user, index)=>{
                                return(
                                    <>
                                        <option key={index} value={user.id}>{user.id}</option>
                                    </>
                                )
                            })}
                        </select>
                    }
                    
                </label>
            </div>
            {isNewBug ? 
                <div>
                    <label className="flex flex-col ml-2 py-3">
                        <h2 className={`${fnt.title__font} text-xl`}>Upload Image</h2>
                        <input type="file" accept=".jpg, .jpeg, .png, .webp" {...register("file")}/>
                    </label>
                </div>
            :null}
            <div className="flex justify-around items-center py-4">
                <button className={`${fnt.title__font} py-2 px-4 border-4 rounded-md border-emerald-300 bg-emerald-400 hover:bg-emerald-500`}>Submit</button>
                <button className={`${fnt.title__font} py-2 px-4 border-4 rounded-md border-red-300 bg-red-400 hover:bg-red-500`} onClick={()=>{
                    sessionStorage.setItem('user_most_recent_action', `You canceled the following action: ${isNewBug? 'New bug Report' : `Modify '${title}' Report`}`)
                    router.push('/dashboard')
                }}>Cancel</button>
            </div>
        </form>
    </>
  )
}

export default Forms