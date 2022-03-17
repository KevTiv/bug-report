import { AxiosResponse } from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { NewButton } from '../../components/actionButtons'
import {LatestResolvedBugCard, LatestUnresolvedBugCard} from '../../components/bugCard'
import { Logout } from '../../components/logButtons'
import Nav from '../../components/nav'
import {UpdateMsg} from '../../components/alertMsg'
import prisma from '../../prisma'
import styles from '../../styles/Home.module.scss'

import supabase from '../../supabaseLib'
import { bugType } from '../../type'

const Dashboard: NextPage = ({ user, latestResolvedBug, latestUnresolvedBug }:any) => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Bug Tracker - Dashboard</title>
        <meta name="description" content="Bug Tracker - Dashboard" />
        <link rel="icon" href="/bug.ico" />
      </Head>

       <main className={styles.main}>
        <Nav page="Dashboard" user={user.user_metadata}/>
        <UpdateMsg/>
        <NewButton />
        <div className="w-full md:flex md:justify-around">
          <LatestResolvedBugCard latestResolvedBug={JSON.parse(latestResolvedBug)}/>
          <LatestUnresolvedBugCard latestUnresolvedBug={JSON.parse(latestUnresolvedBug)}/>
        </div>
        {/* <h1>Dashboard</h1>
        <h2>Welcome {user.email}</h2> */}
        {/* <Logout/> */}
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

export default Dashboard

export async function getServerSideProps({ req }:any) {
  const { user } = await supabase.auth.api.getUserByCookie(req)
  if (!user) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: '/', permanent: false } }
  }

  //Check if current user info are present in DB, if not store current user info
  const isUserRegisteredInDB = await prisma.user.findUnique({
    where:{ id: user.id}
  })
  if(!isUserRegisteredInDB){
    await prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        authBy: user.app_metadata.provider
      }
    })
  }
  const latestResolvedBug = JSON.stringify(await prisma.current_bug.findMany({
    where:{
      isResolved: true
    },
    orderBy:{
      createdAt: 'desc',
    },
    take: 3
  }))
  const latestUnresolvedBug = JSON.stringify(await prisma.current_bug.findMany({
    where:{
      isResolved: false
    },
    orderBy:{
      createdAt: 'desc',
    },
    take: 3
  }))
  
  // If there is a {user, latestResolvedBug}, return it.
  return { props: { user, latestResolvedBug, latestUnresolvedBug } }
}

