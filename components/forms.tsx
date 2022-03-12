import Image from 'next/image'
import { useForm, SubmitHandler } from "react-hook-form"
import { ErrorMessage } from '@hookform/error-message'
import { useRouter } from 'next/router'
import { formFieldTypes } from "../type"
import supabase from "../supabaseLib"
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
            await axios.post('/api/bug/post',newBugReport).then(updateCurrPrivilege())
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
            await axios.put('/api/bug/put',modifiedBugReport).then(updateCurrPrivilege())
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
        await axios.put('/api/user/put',currUserMetadataUpdate).then(()=> router.push('/dashboard'))
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
        <h1>{isNewBug ? "New Bug Report" : "Update Bug Report"}</h1>
        {(!isNewBug && url) ? 
            <div>
                <Image src={url} alt={`${title} screenshot`} layout="responsive" width="200" height="200"/>
            </div>
        :null}
        <form onSubmit={isNewBug? handleSubmit(onSubmitNewBugReport) : handleSubmit(onSubmitModifyBugReport)}>
            <div>
                <label>
                    Author
                    <input type="text" placeholder={author} value={author} disabled {...register("author")}/>
                </label>
                <label>
                    Title
                    <input type="text" {...register("title", { required: "This is required" })} placeholder={title? title : ''}/>
                    <ErrorMessage errors={errors} name="title" />
                </label>
            </div>
            <div>
                <label>
                    Location
                    <textarea {...register("location", { required: "This is required" })} placeholder={location? location : ''}/>
                    <ErrorMessage errors={errors} name="location" />
                </label>
                <label>
                    Description
                    <textarea {...register("description", { required: "This is required" })} placeholder={description? description : ''}/>
                    <ErrorMessage errors={errors} name="description" />
                </label>
                 <label>
                    How to replicate
                    <textarea {...register("processToReplicate", { required: "This is required" })} placeholder={processToReplicate? processToReplicate : ''}/>
                    <ErrorMessage errors={errors} name="processToReplicate" />
                </label>
            </div>
            <div>
                <label>
                    Priority Status
                    <select id="priorityStatus" {...register("priorityStatus")} placeholder={priorityStatus? priorityStatus : ''}>
                        <option value="low">LOW</option>
                        <option value="normal">NORMAL</option>
                        <option value="high">HIGH</option>
                    </select>
                </label>
                <label>
                    Resolved
                    <select id="isBugResolved" {...register("isResolved")} placeholder={isResolved? 'Bug is resolved' : 'Bug is not Resolved'}>
                        <option value="false">Bug is not Resolved</option>
                        <option value="true">Bug is resolved</option>
                    </select>
                </label>
                <label>
                    Resolved By
                    {isNewBug ? 
                        <input type="text" disabled {...register("resolvedBy")}/> 
                    : 
                        // <input type="text" {...register("resolvedBy")} placeholder={resolvedBy}/> //allUser
                        <select id="resolvedBy" {...register("resolvedBy")} placeholder={resolvedBy}>
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
                    <label>
                        Upload Image
                        <input type="file" accept=".jpg, .jpeg, .png, .webp" {...register("file")}/>
                    </label>
                </div>
            :null}
            <button>Submit</button>
        </form>
    </>
  )
}

export default Forms