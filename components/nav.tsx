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

    const handleBurgerMenuClick=()=>{
        setIsOpen(!isOpen)
        mobileBurgerMenuAnimation(isOpen)
    }
    return(
        <>
            <nav className="flex items-center justify-between h-20 overflow-hidden">
                <h1 className={`${fnt.nav__h1__font} text-4xl dark:text-white `}>{page}</h1>
                <span className={`${componentStyle.mobile__burger__menu} `} onClick={()=>handleBurgerMenuClick()}></span>
                <ul ref={burgerMenuRef} className={`${componentStyle.mobile__burger__menu__content} bg-white dark:bg-black absolute w-full h-1 flex-col top-16 z-10 border-b-4 border-black dark:border-white`}>
                    <li className={`${fnt.title__font} hidden dark:text-white text-xl my-8 ml-28 relative`}><Link href="/dashboard"><a>Dashboard</a></Link></li>
                    <li className={`${fnt.title__font} hidden dark:text-white text-xl my-8 ml-28 relative`}><Link href="/history"><a>History</a></Link></li>
                    <li className={`${fnt.title__font} hidden dark:text-white text-xl my-8 ml-16 relative scale-75`}>{user?.user_name}  <Logout/></li>
                </ul>
            </nav>
        </>
    )
}
export default Nav