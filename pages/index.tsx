import type { NextPage } from 'next'
import Head from 'next/head'

import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import components from '../styles/Component.module.scss'
import useSWR from 'swr'
import { Auth } from '@supabase/ui'
import fnt from '../styles/Fonts.module.scss'
import {Login} from '../components/logButtons'
import { useEffect, useRef, useState } from 'react'
import supabase from '../supabaseLib'
import {ErrorMsg} from '../components/alertMsg'
import { landingPageAppear } from '../animation'
import { BugSVG, PersonSVG } from '../utils/svg'
import Footer from '../components/footer'

type Props={
  isErrorProp: boolean
}
const Home: NextPage<Props> = ({isErrorProp}) => {
  const [isError, setIsError] = useState<boolean>(false)
  const [isErrorFromProp, setIsErrorFromProp] = useState<boolean>(false)

  let titleRef = useRef<HTMLHeadingElement>(null)
  let trackRef = useRef<HTMLSpanElement>(null)
  let findRef = useRef<HTMLSpanElement>(null)
  let eliminateRef = useRef<HTMLSpanElement>(null)
  let bug1Ref = useRef<HTMLSpanElement>(null)
  let bug2Ref = useRef<HTMLSpanElement>(null)
  let bug3Ref = useRef<HTMLSpanElement>(null)
  let btnRef = useRef<HTMLDivElement>(null)
  let personRef = useRef<HTMLSpanElement>(null)
  let ctaRef = useRef<HTMLHeadingElement>(null)

  const router = useRouter()
  const fetcher = (url:string, token:string) =>
    fetch(url, {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json', token }),
      credentials: 'same-origin',
    }).then((res) => res.json());
    const { user, session } = Auth.useUser();

    const { data, error } = useSWR(
      session ? ['/api/getUser', session.access_token] : null,
      fetcher
    );
    const [authView, setAuthView] = useState<string>('sign_in')

    
    useEffect(() => {
      console.log('isErrorProp',isErrorProp)

      landingPageAppear(titleRef, trackRef, findRef, eliminateRef, bug1Ref, bug2Ref, bug3Ref, btnRef, personRef, ctaRef)

      // setIsErrorFromProp(props.isErrorProp)
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (event === 'PASSWORD_RECOVERY') setAuthView('update_password')
          if (event === 'USER_UPDATED')
            setTimeout(() => setAuthView('sign_in'), 1000)
          // Send session to /api/auth route to set the auth cookie.
          // NOTE: this is only needed if you're doing SSR (getServerSideProps)!
          fetch('/api/auth', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            credentials: 'same-origin',
            body: JSON.stringify({ event, session }),
          }).then((res) => {
            res.json()
            sessionStorage.setItem('user_most_recent_action', `Welcome to your bug report tool!`)
            router.push('/dashboard')
          }).catch(()=>{
            setIsError(true)
          })

        }
      )
      return () => {
        authListener!.unsubscribe()
        setIsError(false)
      }
    }, []);


  return (
    <div className={styles.container}>
      <Head>
        <title>Bug Tracker</title>
        <meta name="description" content="Easily Track programming bugs in your code base." />
        <link rel="icon" href="/bug.ico" />
      </Head>

      <main className={styles.main}>
        <div className="w-full mt-28 dark:text-white">
          <div className={`flex flex-col justify-start items-center w-full`}>
            <h1 ref={titleRef} className={`${fnt.title__font} text-7xl lg:text-9xl scale-125 lg:scale-150`}>
              <span className="mx-2">
                <span>B</span>
                <span>u</span>
                <span>g</span>
              </span>
              <span className="mx-2">
                <span>T</span>
                <span>r</span>
                <span>a</span>
                <span>c</span>
                <span>k</span>
                <span>e</span>
                <span>r</span>
              </span>
            </h1>
            {isError||isErrorFromProp ? <ErrorMsg /> : null}
            <div className="mt-16">
              <h2 className="flex flex-col justify-around items-start mx-16">
                <span className="relative w-fit">
                  <span ref={trackRef} className={`${fnt.title__font} text-5xl lg:text-7xl scale-150 ml-4`}>Track</span>
                  <span ref={bug1Ref} className="absolute w-12 top-[-25%] right-[-15%] rotate-[215deg]">
                    <BugSVG />
                  </span>
                </span>
                <span className="relative w-fit">
                  <span ref={findRef} className={`${fnt.title__font} text-5xl lg:text-7xl mx-24`}>Find</span>
                  <span ref={bug2Ref} className="absolute w-10 top-[65%] left-[30%] rotate-45">
                    <BugSVG />
                  </span>
                </span>
                <span className="relative w-fit">
                  <span ref={eliminateRef} className={`${fnt.title__font} text-5xl lg:text-7xl mx-32`}>Eliminate</span>
                  <span ref={bug3Ref} className="absolute w-8 top-[70%] right-[30%] rotate-[-60deg]">
                    <BugSVG />
                  </span> 
                </span>
                <span className={`${fnt.title__font} text-xl mx-16`}></span>
              </h2>
            </div>
            <div className="relative flex justify-center items-center mt-8">
              <span ref={personRef} className="scale-75 md:scale-100">
                <PersonSVG/>
              </span>
              <h2 ref={ctaRef} className="absolute w-1/3 top-[60%] right-[25%] md:right-[15%] lg:right-0 text-xl ">Enhance your team response and prevention capabilities with our bug tracking solution</h2>
              <div ref={btnRef} className="absolute top-[-2.5%] scale-125 ">
                <Login/>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
export default Home
  


