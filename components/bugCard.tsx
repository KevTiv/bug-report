import { bugType } from '../type'
import fnt from '../styles/Fonts.module.scss'
import { ViewButton } from './actionButtons'

export const LatestResolvedBugCard = ({latestResolvedBug}:bugType[]) => {
  return (
    <>
        <div className="w-full border-4 border-black/60 dark:border-white/60 rounded-md bg-emerald-200 dark:bg-emerald-600 dark:text-white  p-2 my-2">
            <h2 className={`${fnt.title__font} text-2xl my-2 ml-2`}>Latest Resolved Bug</h2>
            <ol>
                {latestResolvedBug? latestResolvedBug.map((bug:bugType, index:number)=>{
                return(
                    <div key={`${bug.id} - ${index}`} className="flex justify-between">
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
        <div className="w-full border-4 border-black/60 dark:border-white/60 rounded-md bg-red-200 dark:bg-red-600/75 dark:text-white  p-2 my-2">
            <h2 className={`${fnt.title__font} text-2xl my-2 ml-2`}>Latest Resolved Bug</h2>
            <ol>
                {latestUnresolvedBug? latestUnresolvedBug.map((bug:bugType, index:number)=>{
                return(
                    <div key={`${bug.id} - ${index}`} className="flex justify-between">
                        <li key={bug.id} className={`${fnt.text__font} my-2 text-lg`}>Title: {bug.title} <br/>Description: {bug.description}</li><ViewButton bugId={bug.id}/>
                    </div>
                )
                }) : null}
            </ol>
        </div>
    </>
  )
}
