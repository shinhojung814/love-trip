import { useRecoilValue } from 'recoil'

import { userAtom } from '@store/atoms/user'

function useUser() {
  return useRecoilValue(userAtom)
}

export default useUser
