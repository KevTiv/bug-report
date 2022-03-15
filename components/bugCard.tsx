import { bugType } from '../type'
import fnt from '../styles/Fonts.module.scss'
import { ViewButton } from './actionButtons'

export const LatestResolvedBugCard = ({latestResolvedBug}:bugType[]) => {
  return (
    <>
        <div className="w-full border-4 border-emerald-700/30 dark:border-emerald-200/30 rounded-md bg-emerald-700/10 dark:bg-emerald-200/10 dark:text-white  py-2">
            <h2 className={`${fnt.title__font} text-2xl my-2 ml-2`}>Latest Resolved Bug</h2>
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
export const LatestUnresolvedBugCard = ({latestUnresolvedBug}:bugType[]) => {
  return (
    <>
        <div className="w-full border-4 border-red-600/30 dark:border-red-200/30 rounded-md bg-red-600/10 dark:bg-red-200/10 dark:text-white py-2">
            <h2 className={`${fnt.title__font} text-2xl my-2 ml-2`}>Latest Unresolved Bug</h2>
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
