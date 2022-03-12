import { useRouter } from "next/router"
import { buttonType } from "../type"

const ViewButton = ({bugId}:buttonType)=>{
    const router = useRouter()
    const handleViewAction =()=>router.push(`/viewBug/${bugId}`)
    return(
        <>
            <button onClick={()=>handleViewAction()}>View more</button>
        </>
    )
}
const ModifyButton = ({bugId, isPrivilege}:buttonType)=>{
    const router = useRouter()
    const handleModifyAction =()=>{
        isPrivilege ? router.push(`/modify/${bugId}`) : alert('You are not allowed to modify a bug report')
    }
    return(
        <>
            <button onClick={()=>handleModifyAction()}>Modify</button>
        </>
    )
}
const DeleteButton = ({bugId, isPrivilege}:buttonType)=>{
    const router = useRouter()
    const axios = require('axios')
    const handleDeleteAction =()=>{
        isPrivilege ? axios.delete(`/api/bug/delete/${bugId}`).then(()=>router.push('/dashboard')) : alert('You are not allowed to delete a bug report')
    }
    return(
        <>
            <button onClick={()=>handleDeleteAction()}>Delete</button>
        </>
    )
}
export { ViewButton, ModifyButton, DeleteButton }