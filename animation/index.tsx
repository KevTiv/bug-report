import gsap from 'gsap'
import CSSRulePlugin from 'gsap/dist/CSSRulePlugin'
import { RefObject } from 'react'


export const landingPageAppear=(
    titleRef: RefObject<HTMLHeadingElement>, 
    trackRef: RefObject<HTMLSpanElement>, 
    findRef: RefObject<HTMLSpanElement>, 
    eliminateRef: RefObject<HTMLSpanElement>, 
    bug1Ref: RefObject<HTMLSpanElement>, 
    bug2Ref: RefObject<HTMLSpanElement>, 
    bug3Ref: RefObject<HTMLSpanElement>, 
    btnRef: RefObject<HTMLDivElement>, 
    personRef: RefObject<HTMLSpanElement>, 
    ctaRef: RefObject<HTMLHeadingElement>, 
) => {
    const body = document.querySelector('body')
    const titleSpans = titleRef.current!.querySelectorAll('span')

    const tl = gsap.timeline()

    tl
    .from(body,{
        opacity: 0,
        duration: 0.1
    })
    .from(titleSpans,{
        clipPath: 'inset(100% 0 0 0)',
        opacity: 0,
        duration: 2,
        ease: 'power2.inOut'
    })
    .from([trackRef.current, findRef.current, eliminateRef.current],{
        clipPath: 'inset(100% 0 0 0)',
        marginLeft: 0,
        opacity: 0,
        duration: 2,
        stagger: 0.5,
        ease: 'power2.inOut'
    },'-=1.25')
    .from(bug1Ref.current,{
        x: 25,
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: 'power4.in'
    },'-=0.5')
    .from(bug2Ref.current,{
        x: -20,
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power4.in'
    },'-=0.35')
    .from(bug3Ref.current,{
        x: 30,
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power4.in'
    },'-=0.15')
    .from(btnRef.current,{
        opacity: 0,
        duration: 0.95,
        ease: 'power2.inOut'
    },'-=0.1')
    .from(personRef.current,{
        clipPath: 'inset(100% 100% 100% 0)',
        duration: 1,
        ease: 'power2.inOut'
    },'-=0.8')
    .from(ctaRef.current,{
        clipPath: 'inset(100% 0 100% 100%)',
        duration: 1,
        ease: 'power2.inOut'
    },'-=1.8')
}
export const mobileBurgerMenuAnimation=(isOpen:boolean)=>{
    gsap.registerPlugin(CSSRulePlugin)
    let burgerMenuBeforeElem = CSSRulePlugin.getRule(".Component_mobile__burger__menu__50AcV::before")
    let burgerMenuAfterElem = CSSRulePlugin.getRule(".Component_mobile__burger__menu__50AcV::after")
    let burgerMenuContent = document.querySelector("nav ul")
    let burgerMenuContentLi = document.querySelectorAll("nav ul li")
    const tl = gsap.timeline()
    {isOpen ? 
        tl
        .to(burgerMenuAfterElem,{
            top: 0,
            duration: 0.6,
            ease: 'linear'
        })
        .to(burgerMenuAfterElem,{
            rotate: '-45deg',
            // width: '150%',
            duration: 1,
            ease: 'power2.inOut'
        },'-=0.4')
        .to(burgerMenuBeforeElem,{
            rotate: '45deg',
            // width: '150%',
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
            top: '80%',
            // bottom: 0,
            rotate: '0deg',
            width: '100%',
            duration: 1,
            ease: 'power2.inOut'
        },'-=2')
    }
}
export const dismissNotification =(notificationRef:RefObject<HTMLSpanElement> )=>{
    gsap.to(notificationRef?.current,{
        x: 900,
        opacity: 0,
        display: 'none',
        duration: 1,
        ease: 'power2.inOut'
    })
}