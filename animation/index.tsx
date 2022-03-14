import gsap from 'gsap'
import CSSRulePlugin from 'gsap/dist/CSSRulePlugin'

export const mobileBurgerMenuAnimation=(isOpen:boolean)=>{
    gsap.registerPlugin(CSSRulePlugin)
    let burgerMenuBeforeElem = CSSRulePlugin.getRule(".Component_mobile__burger__menu__50AcV::before")
    let burgerMenuAfterElem = CSSRulePlugin.getRule(".Component_mobile__burger__menu__50AcV::after")
    let burgerMenuContent = document.querySelector("nav ul")
    let burgerMenuContentLi = document.querySelectorAll("nav ul li")
    const tl = gsap.timeline()
    {isOpen ? 
        tl
        .to(burgerMenuBeforeElem,{
            rotate: '60deg',
            width: '110%',
            duration: 1,
            ease: 'power2.inOut'
        })
        .to(burgerMenuAfterElem,{
            rotate: '-60deg',
            width: '110%',
            duration: 1,
            ease: 'power2.inOut'
        },'-=1')
        .to(burgerMenuContent,{
            height: '22rem',
            duration: 2,
            ease: 'power2.inOut'
        },'-=1')
        .to(burgerMenuContentLi,{
            display: 'flex',
            opacity: 1,
            duration: 0.4,
            stagger: 0.2,
            ease: 'power2.inOut'
        },'-=1')
        :
        tl
        .to([burgerMenuContentLi],{
            opacity: 0,
            duration: 0.4,
            stagger: { 
                from: 'end',
                amount: 0.4
            },
            ease: 'power2.inOut'
        })
        .to(burgerMenuContent,{
            height: '0.25rem',
            duration: 1,
            ease: 'power2.out'
        },'-=0.6')
        .to([burgerMenuContentLi],{
            display: 'none',
        })
        .to(burgerMenuBeforeElem,{
            rotate: '0deg',
            width: '100%',
            duration: 1,
            ease: 'power2.inOut'
        },'-=2')
        .to(burgerMenuAfterElem,{
            rotate: '0deg',
            width: '100%',
            duration: 1,
            ease: 'power2.inOut'
        },'-=2')
    }
}