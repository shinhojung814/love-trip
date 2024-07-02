import { useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { css } from '@emotion/react'

import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Button from '@shared/Button'
import Spacing from '@shared/Spacing'
import { colors } from '@styles/colorPalette'
import useUser from '@hooks/auth/useUser'

function Navbar() {
  const location = useLocation()
  const showSignButton =
    ['/signin', '/signup'].includes(location.pathname) === false

  const user = useUser()

  const renderButton = useCallback(() => {
    if (user != null) {
      return (
        <Flex align="center">
          <Link to="/my">
            {/* <MyImage size={40} /> */}
            <img
              src={
                user.photoURL ??
                'https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user-256.png'
              }
              alt="profile"
              width={40}
              height={40}
              style={{ borderRadius: '100%' }}
            />
          </Link>
          <Spacing direction="horizontal" size={12} />
          <Link to="/settings">
            <img
              src="https://cdn1.iconfinder.com/data/icons/ionicons-outline-vol-2/512/settings-outline-256.png"
              alt="settings"
              width={40}
              height={40}
              style={{ borderRadius: '100%' }}
            />
          </Link>
        </Flex>
      )
    }

    if (showSignButton) {
      return (
        <Link to="/signin">
          <Button>로그인 / 회원가입</Button>
        </Link>
      )
    }

    return null
  }, [user, showSignButton])

  return (
    <Flex justify="space-between" align="center" css={navbarContainerStyles}>
      <Link to="/">
        <Text bold={true}>LOVE TRIP</Text>
      </Link>
      {renderButton()}
    </Flex>
  )
}

const navbarContainerStyles = css`
  position: sticky;
  top: 0;
  padding: 10px 24px;
  border-bottom: solid 1px ${colors.gray100};
  background-color: ${colors.white};
  z-index: 10;
`

export default Navbar
