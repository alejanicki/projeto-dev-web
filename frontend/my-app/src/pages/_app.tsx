import { AuthProvider } from '@/contexts/auth'
import 'tailwindcss/tailwind.css'


function MyApp({ Component, pageProps }: any) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp