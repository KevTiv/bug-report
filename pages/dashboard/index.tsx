import type { NextPage } from 'next'
import Head from 'next/head'
import { NewButton } from '../../components/actionButtons'
import {LatestResolvedBugCard, LatestUnresolvedBugCard} from '../../components/bugCard'
import Nav from '../../components/nav'
import {UpdateMsg} from '../../components/alertMsg'
import prisma from '../../prisma'
import styles from '../../styles/Home.module.scss'

import supabase from '../../supabaseLib'
import { User } from '@supabase/supabase-js'
import Footer from '../../components/footer'
import { pageAppear } from '../../animation'
import { useEffect } from 'react'


type Props={
  user: User,
  latestResolvedBug: string,
  latestUnresolvedBug: string
}
const Dashboard: NextPage<Props> = ({ user, latestResolvedBug, latestUnresolvedBug }) => {
  useEffect(() => {
    pageAppear()
  },[])
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
      </main>

      <Footer />
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
  let isUserRegisteredInDB 
  try {
    isUserRegisteredInDB = await prisma.user.findUnique({
    where:{ id: user.id}
  })
  } catch (error) {
    return { props: {}, redirect: { destination: '/error', permanent: false } }
  }
  
  if(!isUserRegisteredInDB){
    try {
      await prisma.user.create({
        data: {
          id: user.id,
          email: user.email,
          authBy: user.app_metadata.provider
        }
      })
    } catch (error) {
      return { props: {}, redirect: { destination: '/error', permanent: false } }
    }
    
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

