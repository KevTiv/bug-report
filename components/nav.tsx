import { navType } from "../type"
import { Logout } from "./logButtons"
import componentStyle from '../styles/Component.module.scss'
import fnt from '../styles/Fonts.module.scss'
import { useEffect, useRef, useState } from "react"
import { mobileBurgerMenuAnimation } from "../animation"
import Link from "next/link"

const Nav=({page, user}:navType)=>{
    const [isOpen, setIsOpen] = useState<boolean>(false)
    let burgerMenuRef = useRef(null)

    const UserSVG=()=>{return <svg className="dark:text-white" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2rem" height="2rem" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10.13 10.13 0 0 0 2 12a10 10 0 0 0 4 7.92V20h.1a9.7 9.7 0 0 0 11.8 0h.1v-.08A10 10 0 0 0 22 12A10.13 10.13 0 0 0 12 2zM8.07 18.93A3 3 0 0 1 11 16.57h2a3 3 0 0 1 2.93 2.36a7.75 7.75 0 0 1-7.86 0zm9.54-1.29A5 5 0 0 0 13 14.57h-2a5 5 0 0 0-4.61 3.07A8 8 0 0 1 4 12a8.1 8.1 0 0 1 8-8a8.1 8.1 0 0 1 8 8a8 8 0 0 1-2.39 5.64z"/><path fill="currentColor" d="M12 6a3.91 3.91 0 0 0-4 4a3.91 3.91 0 0 0 4 4a3.91 3.91 0 0 0 4-4a3.91 3.91 0 0 0-4-4zm0 6a1.91 1.91 0 0 1-2-2a1.91 1.91 0 0 1 2-2a1.91 1.91 0 0 1 2 2a1.91 1.91 0 0 1-2 2z"/></svg>}
    const handleBurgerMenuClick=()=>{
        setIsOpen(!isOpen)
        mobileBurgerMenuAnimation(isOpen)
    }
    useEffect(()=>{mobileBurgerMenuAnimation(false)},[])
    return(
        <>
            <nav className="flex items-center justify-between h-32 w-full overflow-hidden">
                <h1 className={`${fnt.nav__h1__font} text-4xl md:text-6xl dark:text-white `}>{page}</h1>
                <span className={`${componentStyle.mobile__burger__menu} -translate-x-3`} onClick={()=>handleBurgerMenuClick()}></span>
                <ul ref={burgerMenuRef} className={`${componentStyle.mobile__burger__menu__content} bg-[#fffcf2] dark:bg-[#252422] absolute w-full h-1 flex-col top-32 left-0 z-10 border-b-2 rounded-lg border-black dark:border-white`}>
                    <li className={`${fnt.title__font} hidden dark:text-white text-xl md:text-3xl my-8 ml-28 relative`}><Link href="https://bug-tracker-nine.vercel.app/dashboard"><a>Dashboard</a></Link></li>
                    <li className={`${fnt.title__font} hidden dark:text-white text-xl md:text-3xl my-8 ml-28 relative`}><Link href="https://bug-tracker-nine.vercel.app/history"><a>History</a></Link></li>
                    <li className={`${fnt.title__font} hidden dark:text-white text-xl md:text-3xl my-8 w-full justify-center relative scale-75`}><span className="mx-2 px-2 flex items-center"><UserSVG/> {user?.user_name}</span> <Logout/></li>
                </ul>
            </nav>
        </>
    )
}
export default Nav