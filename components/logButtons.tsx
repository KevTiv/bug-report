import { useRouter } from 'next/router'
import supabase from '../supabaseLib'

const Login = () => {
  const handleGitHubLogin = async () => { 
    try {
      let { user, error } = await supabase.auth.signIn({
        provider: 'github'
      });
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <button onClick={()=>handleGitHubLogin()}>Sign In with GitHub</button>
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
        }).finally(() => router.push('/'))
      }
    )
    return () => {authListener!.unsubscribe()}
  }
  return (
    <>
      <button onClick={()=> handleSignOut() }>Logout</button>
    </>
  )
}
export { Login, Logout }