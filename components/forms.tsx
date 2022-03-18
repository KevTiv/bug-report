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
    
    const getImgUrl= async(file: File)=>{
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
        <form className="dark:text-white w-full mt-4" onSubmit={isNewBug? handleSubmit(onSubmitNewBugReport) : handleSubmit(onSubmitModifyBugReport)}>
            <div>
                 <div className="relative z-0 mb-6 w-full group">
                     <label htmlFor="author" className={`${fnt.title__font} block mb-2 text-sm md:text-lg font-medium text-gray-900 dark:text-gray-300`}>
                        Author
                    </label>
                    <input type="text" className="block py-2.5 px-0 w-full text-sm md:text-lg text-gray-900 bg-black/5 dark:bg-white/5 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-not-allowed"
                     value={author} disabled {...register("author")} />
                    
                </div>
                <div className="relative z-0 mb-6 w-full group">
                    <label htmlFor="Title" className={`${fnt.title__font} block mb-2 text-sm md:text-lg font-medium text-gray-900 dark:text-gray-300`}>
                        Title
                    </label>
                    <input type="text" className="block py-2.5 px-0 w-full text-sm md:text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                    {...register("title", { required: "This is required" })} placeholder={title} />
                   
                    <ErrorMessage errors={errors} name="title" />
                </div>
            </div>
            <div>
                <div className="relative z-0 mb-6 w-full group">
                    <label htmlFor="location" className={`${fnt.title__font} block mb-2 text-sm md:text-lg font-medium text-gray-900 dark:text-gray-300`}>
                        Location of the bug
                    </label>
                    <textarea className="block py-2.5 px-0 w-full text-sm md:text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                     {...register("location", { required: "This is required" })} placeholder={location} />
                    
                    <ErrorMessage errors={errors} name="location" />
                </div>
                <div className="relative z-0 mb-6 w-full group">
                    <label htmlFor="description" className={`${fnt.title__font} block mb-2 text-sm md:text-lg font-medium text-gray-900 dark:text-gray-300`}>
                        Description
                    </label>
                    <textarea className="block py-2.5 px-0 w-full text-sm md:text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                     {...register("description", { required: "This is required" })} placeholder={description} />
                    
                    <ErrorMessage errors={errors} name="description" />
                </div>
                <div className="relative z-0 mb-6 w-full group">
                    <label htmlFor="processToReplicate" className={`${fnt.title__font} block mb-2 text-sm md:text-lg font-medium text-gray-900 dark:text-gray-300`}>
                        How to replicate
                    </label>
                    <textarea className="block py-2.5 px-0 w-full text-sm md:text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                     {...register("processToReplicate", { required: "This is required" })} placeholder={processToReplicate} />
                    
                    <ErrorMessage errors={errors} name="processToReplicate" />
                </div>
            </div>
            <div>
                <div className="relative z-0 mb-6 w-full group">
                    <label htmlFor="priorityStatus" className={`${fnt.title__font} block mb-2 text-sm md:text-lg font-medium text-gray-900 dark:text-gray-300`}>
                        Priority Status
                    </label>
                    <select className="block py-2.5 px-0 w-full text-sm md:text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer " 
                    id="priorityStatus" {...register("priorityStatus")} placeholder={priorityStatus}>
                        <option placeholder="low">LOW</option>
                        <option placeholder="medium">MEDIUM</option>
                        <option placeholder="high">HIGH</option>
                    </select>
                    
                </div>
                <div className="relative z-0 mb-6 w-full group">
                    <label htmlFor="priorityStatus" className={`${fnt.title__font} block mb-2 text-sm md:text-lg font-medium text-gray-900 dark:text-gray-300`}>
                        Is the bug resolved?
                    </label>
                    <select className="block py-2.5 px-0 w-full text-sm md:text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                     id="isBugResolved" {...register("isResolved")} placeholder={isResolved? 'Bug is resolved' : 'Bug is not Resolved'}>
                        <option placeholder="false">Bug is not Resolved</option>
                        <option placeholder="true">Bug is resolved</option>
                    </select>
                    
                </div>
                <div className="relative z-0 mb-6 w-full group">
                    <label htmlFor="resolvedBy" className={`${fnt.title__font} block mb-2 text-sm md:text-lg font-medium text-gray-900 dark:text-gray-300`}>
                        Resolved by
                    </label>
                    {isNewBug ? 
                        <input  className="block py-2.5 px-0 w-full text-sm md:text-lg text-gray-900 bg-black/10 dark:bg-white/10 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-not-allowed" 
                            type="text" disabled {...register("resolvedBy")}/> 
                    : 
                        // <input className="bg-black/10 rounded-md px-1 border-b-4 border-black/10" type="text" {...register("resolvedBy")} placeholder={resolvedBy}/> //allUser
                        
                        <select className="block py-2.5 px-0 w-full text-sm md:text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                            id="resolvedBy" {...register("resolvedBy")} placeholder={resolvedBy}>
                            {allUser?.map((user, index)=>{
                                return(
                                    <>
                                        <option key={index} placeholder={user.id}>{user.id}</option>
                                    </>
                                )
                            })}
                        </select>
                    }
                </div>
            </div>
            {isNewBug ? 
                <div>
                    <label className={`${fnt.title__font} block mb-2 text-sm md:text-lg text-gray-500 dark:text-gray-400" htmlFor="bug_screenshot`}>Upload file</label>
                    <input className="block py-2.5 px-0 w-full text-sm md:text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        aria-describedby="bug_screenshot" type="file" accept=".jpg, .jpeg, .png, .webp" {...register("file")}/>
                    <div className="mt-1 text-sm md:text-lg text-gray-500 dark:text-gray-300" id="bug_screenshot">A bug screenshot may be useful for your team to understand the bug issue</div>
                </div>
            :null}
            <div className="flex justify-center items-center py-4">
                <button type="submit" className={`${fnt.title__font} text-white text-lg mx-4 bg-blue-700/60 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-200/40 dark:hover:bg-blue-400 dark:focus:ring-blue-800`}>Save</button>
                <button type="reset" className={`${fnt.title__font} text-white text-lg mx-4 bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-red-600/40 dark:hover:bg-red-700 dark:focus:ring-red-800`} onClick={()=>{
                    sessionStorage.setItem('user_most_recent_action', `You canceled the following action: ${isNewBug? 'New bug Report' : `Modify '${title}' Report`}`)
                    router.push('/dashboard')
                }}>Cancel</button>
            </div>
        </form>
    </>
  )
}

export default Forms