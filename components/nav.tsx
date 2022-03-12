import { navType } from "../type"
import { Logout } from "./logButtons"
import componentStyle from '../styles/Component.module.scss'
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
            <nav className="flex items-center justify-between h-24">
                <h1 className="font-black text-2xl">{page}</h1>
                <span className={componentStyle.mobile__burger__menu} onClick={()=>handleBurgerMenuClick()}></span>
                <ul ref={burgerMenuRef} className={`${componentStyle.mobile__burger__menu__content} bg-white absolute w-4/5 flex-col top-24 z-10`}>
                    <li className="text-xl font-semibold my-8 ml-28"><Link href="/dashboard"><a>Dashboard</a></Link></li>
                    <li className="text-xl font-semibold my-8 ml-28"><Link href="/history"><a>History</a></Link></li>
                    <li className="text-xl font-semibold my-8 ml-28"><Logout/></li>
                    <li className="text-xl font-semibold my-8 ml-28">{user?.user_name}</li>
                </ul>
            </nav>
        </>
    )
}
export default Nav