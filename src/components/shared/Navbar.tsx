import { useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { css } from '@emotion/react'

import Flex from '@shared/Flex'
import Button from '@shared/Button'
// import MyImage from '@components/my/MyImage'
import { colors } from '@styles/colorPalette'
// import useUser from '@hooks/auth/useUser'

function Navbar() {
  const location = useLocation()
  const showSignButton =
    ['/signin', '/signup'].includes(location.pathname) === false

  // const user = useUser()
  const user = null

  const renderButton = useCallback(() => {
    if (user != null) {
      return (
        <Link to="/my">
          {/* <MyImage size={40} /> */}
          <img src="" alt="" />
        </Link>
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
        <IconHome />
      </Link>
      {renderButton()}
    </Flex>
  )
}

const navbarContainerStyles = css`
  position: sticky;
  top: 0;
  padding: 10px 24px;
  border-bottom: solid 1px ${colors.gray};
  background-color: ${colors.white};
  z-index: 10;
`

function IconHome() {
  return (
    <svg
      version="1.1"
      viewBox="0 0 20 19"
      width={24}
      height={24}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title />
      <desc />
      <defs />
      <g
        fill="none"
        fill-rule="evenodd"
        id="Page-1"
        stroke="none"
        stroke-width="1"
      >
        <g
          fill="#000000"
          id="Core"
          transform="translate(-506.000000, -255.000000)"
        >
          <g id="home" transform="translate(506.000000, 255.500000)">
            <path
              d="M8,17 L8,11 L12,11 L12,17 L17,17 L17,9 L20,9 L10,0 L0,9 L3,9 L3,17 L8,17 Z"
              id="Shape"
            />
          </g>
        </g>
      </g>
    </svg>
  )
}

export default Navbar
