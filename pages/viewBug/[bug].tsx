import prisma from '../../prisma'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import styles from '../../styles/Home.module.scss'
import supabase from '../../supabaseLib'
import { bugType } from '../../type'

const viewBug:NextPage = ({bugInfo}:any) => {
    const [bug, setBug] = useState<bugType>()
    useEffect(() => {
      setBug(JSON.parse(bugInfo))
        
    },[])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/bug.ico" />
      </Head>

      <main className={styles.main}>
        <h1>{bug?.title} Report</h1>
        <div>
            {bug?.url ? 
              <div>
                  <Image src={bug.url} alt={`${bug.title} screenshot`} layout="responsive" width="200" height="200"/>
              </div>
          :null}
          <div>
              <div>
                  <h2>Description</h2>
                  <p>{bug?.description}</p>
              </div>
              <div>
                  <h2>Location</h2>
                  <p>{bug?.location}</p>
              </div>
              <div>
                  <h2>How to replicate</h2>
                  <p>{bug?.processToReplicate}</p>
              </div>
          </div>
          <div>
              <div>
                  <h2>Author</h2>
                  <p>{bug?.author}</p>
              </div>
              <div>
                  <h2>Resolved</h2>
                  <p>{bug?.isResolved ? 'Yes' : 'No'}</p>
              </div>
              <div>
                  <h2>Priority</h2>
                  <p>{bug?.priorityStatus}</p>
              </div>
              <div>
                  <h2>Resolved by</h2>
                  <p>{bug?.resolvedBy ? bug?.resolvedBy  : 'No one resolved this bug yet'}</p>
              </div>
              <div>
                  <h2>Reported on</h2>
                  <p>{bug?.createdAt}</p>
              </div>
              <div>
                  <h2>Last modification</h2>
                  <p>{bug?.updatedAt}</p>
              </div>
          </div>
        </div>
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

export default viewBug

export async function getServerSideProps({ req, query }:any) {
    
  const { user } = await supabase.auth.api.getUserByCookie(req)
  
  if (!user) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: '/', permanent: false } }
  }

  //info about bug
  const bugInfo = JSON.stringify(await prisma.current_bug?.findUnique({
      where:{
          id: parseInt(query.bug)
      }
  })) 
  

  return{
    props:{ bugInfo }
  }
}