import { useRouter } from "next/router"
import { buttonType } from "../type"
import fnt from '../styles/Fonts.module.scss'

export const NewButton = ()=>{
    const router = useRouter()
    const handleViewAction =()=>router.push(`/new`)
    const AddSvg=()=>{ return <svg className="mr-1 text-sky-700 dark:text-sky-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2rem" height="2rem" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M16 4c6.6 0 12 5.4 12 12s-5.4 12-12 12S4 22.6 4 16S9.4 4 16 4m0-2C8.3 2 2 8.3 2 16s6.3 14 14 14s14-6.3 14-14S23.7 2 16 2z"/><path fill="currentColor" d="M24 15h-7V8h-2v7H8v2h7v7h2v-7h7z"/></svg> }
    return(
        <>
            <button className={`${fnt.title__font} dark:text-white p-2 mx-1 bg-sky-700/40 dark:bg-sky-200/40 rounded-md border-4 border-sky-700/40 dark:border-sky-200/40 flex justify-between items-center`} onClick={()=>handleViewAction()}><AddSvg/>{' '}Create a new bug report</button>
        </>
    )
}

const ViewButton = ({bugId}:buttonType)=>{
    const router = useRouter()
    const handleViewAction =()=>router.push(`/viewBug/${bugId}`)
    const ViewSVG=()=>{return <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2rem" height="2rem" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><circle cx="16" cy="16" r="4" fill="currentColor"/><path fill="currentColor" d="M30.94 15.66A16.69 16.69 0 0 0 16 5A16.69 16.69 0 0 0 1.06 15.66a1 1 0 0 0 0 .68A16.69 16.69 0 0 0 16 27a16.69 16.69 0 0 0 14.94-10.66a1 1 0 0 0 0-.68ZM16 22.5a6.5 6.5 0 1 1 6.5-6.5a6.51 6.51 0 0 1-6.5 6.5Z"/></svg>}
    return(
        <>
            <button className={`m-2 bg-black/5 dark:bg-white/20 dark:text-white  w-12 h-12 rounded-md flex justify-center items-center`} onClick={()=>handleViewAction()}><ViewSVG/></button>
        </>
    )
}
const ModifyButton = ({bugId, isPrivilege}:buttonType)=>{
    const router = useRouter()
    const handleModifyAction =()=>{
        isPrivilege ? router.push(`/modify/${bugId}`) : alert('You are not allowed to modify a bug report')
    }
    const ModifySVG = ()=>{return <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2rem" height="2rem" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path fill="currentColor" d="M362.7 19.32c25-24.998 65.6-24.998 90.6 0l39.4 39.43c25 24.99 25 65.55 0 90.55l-48.4 48.4l-130-129.98l48.4-48.4zm59 200.98L188.5 453.4c-10.4 10.4-23.3 18.1-37.4 22.2L30.77 511c-8.42 2.5-17.53.2-23.74-6.9c-6.21-5.3-8.532-14.4-6.054-22.9L36.37 360.9c4.16-14.1 11.79-27 22.2-37.4L291.7 90.34l130 129.96z"/></svg>}
    return(
        <>
            <button className={`m-2 bg-black/5 dark:bg-white/20 dark:text-white w-12 h-12 rounded-md flex justify-center items-center`} onClick={()=>handleModifyAction()}><ModifySVG/></button>
        </>
    )
}
const DeleteButton = ({bugId, isPrivilege}:buttonType)=>{
    const router = useRouter()
    const axios = require('axios')
    const handleDeleteAction =()=>{
        isPrivilege ? 
        axios.delete(`/api/bug/delete/${bugId}`).then(()=>{
            sessionStorage.setItem('user_most_recent_action', 'You successfully deleted a bug report, this action is not reversible.')
            router.push('/dashboard')
        }) 
        : alert('You are not allowed to delete a bug report')
    }
    const DeleteSVG=()=>{return <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2rem" height="2rem" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M10 1.25a2.75 2.75 0 0 1 2.739 2.5H17a.75.75 0 0 1 .102 1.493L17 5.25h-.583L15.15 16.23A2 2 0 0 1 13.163 18H6.837a2 2 0 0 1-1.987-1.77L3.582 5.25H3a.75.75 0 0 1-.743-.648L2.25 4.5a.75.75 0 0 1 .648-.743L3 3.75h4.261A2.75 2.75 0 0 1 10 1.25ZM8.5 7.5c-.245 0-.45.155-.492.359L8 7.938v6.125l.008.078c.042.204.247.359.492.359s.45-.155.492-.359L9 14.062V7.939l-.008-.08C8.95 7.656 8.745 7.5 8.5 7.5Zm3 0c-.245 0-.45.155-.492.359L11 7.938v6.125l.008.078c.042.204.247.359.492.359s.45-.155.492-.359l.008-.079V7.939l-.008-.08c-.042-.203-.247-.358-.492-.358ZM10 2.75c-.605 0-1.11.43-1.225 1h2.45c-.116-.57-.62-1-1.225-1Z"/></svg>}
    return(
        <>
            <button className={`m-2 bg-black/5 dark:bg-white/20 dark:text-white w-12 h-12 rounded-md flex justify-center items-center`} onClick={()=>handleDeleteAction()}><DeleteSVG/></button>
        </>
    )
}
export { ViewButton, ModifyButton, DeleteButton }