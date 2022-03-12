import { useRouter } from 'next/router'

import {useState } from 'react'
import supabase from '../supabaseLib'

const Login = () => {
  const handleGitHubLogin = async () => {
    let { user, error } = await supabase.auth.signIn({
        provider: 'github'
    });
};
  return (
    <>
        <div>
            <button onClick={()=>handleGitHubLogin()}>Sign In with GitHub</button>
        </div>
    </>
  )
}

const Logout = () => {
  
  const router = useRouter();

  const handleSignOut = async()=>{

    await supabase.auth.signOut()

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const body = JSON.stringify({ event, session })
        const headers = new Headers({ 'Content-Type': 'application/json' })
        fetch('/api/auth', {
          method: 'post',
          body,
          headers,
          credentials: 'same-origin',
        }).finally(() => {
          router.push('/')
        })
      }
    )
    return () => {
      authListener!.unsubscribe()
    }
    
}
  return (
    <>
        <div>
            <button onClick={()=> handleSignOut() }>Logout</button>
        </div>
    </>
  )
}
export { Login, Logout }