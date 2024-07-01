import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { onAuthStateChanged } from 'firebase/auth'

import { auth } from '@remote/firebase'
import { userAtom } from '@store/atoms/user'

function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialized, setInitialized] = useState(false)
  const setUser = useSetRecoilState(userAtom)

  onAuthStateChanged(auth, (user) => {
    if (user == null) {
      setUser(null)
    } else {
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
        photoURL: user.photoURL ?? '',
      })
    }

    setInitialized(true)
  })

  if (initialized === false) {
    return null
  }

  return <>{children}</>
}

export default AuthGuard
