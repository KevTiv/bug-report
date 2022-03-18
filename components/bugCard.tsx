import { bugCardType, bugType } from '../type'
import fnt from '../styles/Fonts.module.scss'
import { ViewButton } from './actionButtons'
import { ResolvedSVG, UnresolvedSVG } from '../utils/svg'

export const LatestResolvedBugCard = ({latestResolvedBug}:bugCardType) => {
  return (
    <>
        {/* <div className="w-full p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"> */}
        <div className="flex flex-col justify-between w-full md:w-[45%] border-2 my-1.5 border-emerald-700/10 dark:border-emerald-200/10 rounded-md bg-emerald-700/30 dark:bg-emerald-200/20 dark:text-white  py-2">
            <h2 className={`${fnt.title__font} text-2xl my-2 ml-2`}>Latest Resolved Bug</h2>
            <div className="flex w-full justify-center">
                <ResolvedSVG/>
            </div>
            <ol>
                {latestResolvedBug? latestResolvedBug.map((bug:bugType, index:number)=>{
                return(
                    <div key={`${bug.id} - ${index}`} className={`w-full flex justify-between ${index % 2 === 0 ? 'bg-black/5 dark:bg-white/10' : null} px-2`}>
                        <li className={`${fnt.text__font} my-2 text-lg`}>Title: {bug.title} <br/>Description: {bug.description} </li><ViewButton bugId={bug.id}/>
                    </div>
                )
                }) : null}
            </ol>
        </div>
    </>
  )
}
export const LatestUnresolvedBugCard = ({latestUnresolvedBug}:bugCardType) => {
  return (
    <>
        <div className="flex flex-col justify-between w-full md:w-[45%] border-2 my-1.5 border-red-600/10 dark:border-red-200/10 rounded-md bg-red-600/30 dark:bg-red-200/20 dark:text-white py-2">
            <h2 className={`${fnt.title__font} text-2xl my-2 ml-2`}>Latest Unresolved Bug</h2>
            <div className="flex w-full justify-center">
                <UnresolvedSVG/>
            </div>
            <ol>
                {latestUnresolvedBug? latestUnresolvedBug.map((bug:bugType, index:number)=>{
                return(
                    <div key={`${bug.id} - ${index}`} className={`w-full flex justify-between ${index % 2 === 0 ? 'bg-black/5 dark:bg-white/10' : null} px-2`}>
                        <li key={bug.id} className={`${fnt.text__font} my-2 text-lg`}>Title: {bug.title} <br/>Description: {bug.description}</li><ViewButton bugId={bug.id}/>
                    </div>
                )
                }) : null}
            </ol>
        </div>
    </>
  )
}

