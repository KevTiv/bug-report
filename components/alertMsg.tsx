import { useEffect, useRef, useState } from 'react'
import fnt from '../styles/Fonts.module.scss'
import components from '../styles/Component.module.scss'
import { dismissNotification } from '../animation'

const CrossSVG = () => {return <svg className="dark:text-red-800" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.25rem" height="1.25rem" preserveAspectRatio="xMidYMid meet" viewBox="0 0 64 64"><path fill="currentColor" d="M62 10.571L53.429 2L32 23.429L10.571 2L2 10.571L23.429 32L2 53.429L10.571 62L32 40.571L53.429 62L62 53.429L40.571 32z"/></svg>}


export const UpdateMsg = () => {
    const [update, setUpdate] = useState<string>('')
    let notificationRef = useRef<HTMLSpanElement>(null)

    useEffect(() =>{
        let mostRecentUpdate = sessionStorage.getItem('user_most_recent_action')
        setUpdate(mostRecentUpdate? mostRecentUpdate : '')
        return()=>sessionStorage.removeItem('user_most_recent_action')
    },[])
  return (
    <>
        {update!=='' ?   
            <span ref={notificationRef} className={`w-full flex justify-between items-center p-4 mb-4 text-lg text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800`}>
                <span className={`${fnt.title__font} ml-2`}>{update}</span>
                <span className={`cursor-pointer mr-2`} onClick={()=>{
                    dismissNotification(notificationRef) 
                }}><CrossSVG/></span>
            </span>
        :null}
    </>
  )
}

export const ErrorMsg = ({error}:any) => {
    let notificationRef = useRef<HTMLSpanElement>(null)
    
  return (
    <>
        <span ref={notificationRef} className={`w-1/2 flex justify-between items-center p-4 my-4 translate-y-6 text-lg text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800`}>
            <span className={`${fnt.title__font} ml-2`}>
                Something went wrong... Please contact <a className="underline text-2xl">tivertc.kevin@outlook.com</a>
            </span>
            <span className={`cursor-pointer mr-2`} onClick={()=>{
                dismissNotification(notificationRef) 
            }}><CrossSVG/></span>
        </span>
    </>
  )
}