import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import useSWR from 'swr'
import { Auth, Card, Typography, Space, Button, Icon } from '@supabase/ui'

import {Login, Logout} from '../components/logButtons'
import { useEffect, useState } from 'react'
import supabase from '../supabaseLib'
import Loading from '../components/loading'
import Dashboard from './dashboard'

const Home: NextPage = () => {

  //TODO styling for tablet and bigger screen left to adjust
  //TODO landing page
  //TODO adding some decorative images
  //TODO error msg when DB is offline

  const router = useRouter();
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
          })

        }
      )
      return () => {
        authListener!.unsubscribe()
      }
    }, []);


  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/bug.ico" />
      </Head>

      <main className={styles.main}>
        {/* {!user ? <Login/> : null} */}
        <Login/>
        
        {/* <button onClick={()=>handleGitHubLogin()}>Sign In with GitHub</button> */}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
