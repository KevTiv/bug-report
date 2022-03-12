import gsap from 'gsap'
import CSSRulePlugin from 'gsap/dist/CSSRulePlugin'

export const mobileBurgerMenuAnimation=(isOpen:boolean)=>{
    gsap.registerPlugin(CSSRulePlugin)
    let burgerMenuBeforeElem = CSSRulePlugin.getRule(".Component_mobile__burger__menu__50AcV::before")
    let burgerMenuAfterElem = CSSRulePlugin.getRule(".Component_mobile__burger__menu__50AcV::after")
    let burgerMenuContent = document.querySelector("nav ul")
    const tl = gsap.timeline()
    {isOpen ? 
        tl
        .to(burgerMenuBeforeElem,{
            rotate: '-45deg',
            duration: 1,
            ease: 'power2.inOut'
        })
        .to(burgerMenuAfterElem,{
            width: '90%',
            aspectRatio: 14,
            rotate: '50deg',
            duration: 1,
            ease: 'power2.inOut'
        },'-=1')
        .to(burgerMenuContent,{
            display: 'flex',
            clipPath: 'inset(0 0 0% 0)',
            duration: 2,
            ease: 'power2.inOut'
        },'-=1')
        :
        tl
        .to(burgerMenuContent,{
            clipPath: 'inset(0 0 100% 0)',
            display: 'none',
            duration: 2,
            ease: 'power2.inOut'
        })
        .to(burgerMenuBeforeElem,{
            rotate: '0deg',
            duration: 1,
            ease: 'power2.inOut'
        },'-=2')
        .to(burgerMenuAfterElem,{
            width: '80%',
            aspectRatio: 11,
            rotate: '0deg',
            duration: 1,
            ease: 'power2.inOut'
        },'-=2')
    }
}