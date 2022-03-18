import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Auth } from '@supabase/ui'
import supabase  from '../supabaseLib'


function MyApp({ Component, pageProps }: AppProps) {
  return( 
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Component {...pageProps} /> 
    </Auth.UserContextProvider>
  )
}

export default MyApp
