import gsap from 'gsap'
import CSSRulePlugin from 'gsap/dist/CSSRulePlugin'
import { RefObject } from 'react'

export const pageAppear=()=>{
    gsap.from(document.querySelector('body'),{
        opacity: 0,
        duration: 0.5,
        ease: 'linear'
    })
}

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

    const tl = gsap.timeline()

    tl
    .from(body,{
        opacity: 0,
        duration: 0.75
    })
    .from(titleRef.current!.querySelectorAll('span span'),{
        y:35,
        clipPath: 'inset(100% 0% 0% 0%)',
        opacity: 0,
        duration: 3,
        stagger: 0.25,
        ease: 'power2.inOut'
    })
    .from([trackRef.current, findRef.current, eliminateRef.current],{
        clipPath: 'inset(100% 0% 0% 0%)',
        marginLeft: 0,
        opacity: 0,
        duration: 2,
        stagger: 0.5,
        ease: 'power2.inOut'
    },'-=3')
    .from(bug1Ref.current,{
        x: 25,
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: 'power4.in'
    },'-=1.5')
    .from(bug2Ref.current,{
        x: -20,
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power4.in'
    },'-=1.35')
    .from(bug3Ref.current,{
        x: 30,
        y: 30,
        opacity: 0,
        duration: 1.4,
        ease: 'power4.in'
    },'-=1.15')
    .from(btnRef.current,{
        opacity: 0,
        duration: 0.95,
        ease: 'power2.inOut'
    },'-=1.1')
    .from(personRef.current,{
        clipPath: 'inset(100% 100% 100% 0%)',
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut'
    },'-=1.8')
    .from(ctaRef.current,{
        clipPath: 'inset(100% 0% 100% 100%)',
        opacity: 0,
        duration: 1.5,
        ease: 'power2.inOut'
    },'-=2.2')
}
export const errorPageAppear=(oopsRef: RefObject<HTMLSpanElement>, wrongRef: RefObject<HTMLSpanElement>, emailRef: RefObject<HTMLSpanElement>, imgRef: RefObject<HTMLSpanElement>)=>{
    const tl = gsap.timeline()
    const body = document.querySelector('body')

    tl
    .from(body,{
        opacity: 0,
        duration: 0.75,
        ease: 'linear'
    })
    .from(oopsRef.current!.querySelectorAll('span'),{
        y: 35,
        clipPath: 'inset(100% 0 0% 0)',
        opacity: 0,
        stagger: 0.35,
        duration: 3,
        ease: 'power2.inOut'
    })
    .from(wrongRef.current!.querySelectorAll('span'),{
        y: 35,
        clipPath: 'inset(100% 0 0% 0)',
        opacity: 0,
        stagger: 0.35,
        duration: 2.75,
        ease: 'power4.inOut'
    },'-=3')
    .from([imgRef.current, emailRef.current],{
        opacity: 0,
        stagger: 0.75,
        duration: 1.5,
        ease: 'power3.inOut'
    },'-=3')
}
export const burgerMenuAnimation=(isOpen:boolean)=>{
    gsap.registerPlugin(CSSRulePlugin)
    let burgerMenuBeforeElem = CSSRulePlugin.getRule(".Component_mobile__burger__menu__50AcV:before")
    let burgerMenuAfterElem = CSSRulePlugin.getRule(".Component_mobile__burger__menu__50AcV:after")
    let burgerMenuContent = document.querySelector("nav ul")
    let burgerMenuContentLi = document.querySelectorAll("nav ul li")
    const tl = gsap.timeline()
    {isOpen ? 
        tl
        .to(burgerMenuAfterElem,{
            bottom: '50%',
            // rotate: '-45deg',
            transform: 'rotate(-45deg)',
            duration: 1.4,
            ease: 'power2.inOut'
        })
        .to(burgerMenuBeforeElem,{
            top: '50%',
            // rotate: '45deg',
            transform: 'rotate(45deg)',
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
            top: '30%',
            transform: 'rotate(0deg)',
            // rotate: '0deg',
            width: '100%',
            duration: 1,
            ease: 'power2.inOut'
        },'-=2')
        .to(burgerMenuAfterElem,{
            bottom: '30%',
            // bottom: 0,
            transform: 'rotate(0deg)',
            // rotate: '0deg',
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