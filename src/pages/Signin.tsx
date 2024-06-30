import Flex from '@shared/Flex'
import Button from '@shared/Button'
import Spacing from '@shared/Spacing'

import useGoogleSignin from '@hooks/useGoogleSignin'

function SigninPage() {
  const { signin } = useGoogleSignin()

  return (
    <Flex direction="column" align="center" style={{ padding: 24 }}>
      <Spacing direction="vertical" size={100} />
      <img
        src="https://cdn2.iconfinder.com/data/icons/line-drawn-social-media/30/send-512.png"
        alt="send"
        width={120}
        height={120}
      />
      <Spacing direction="vertical" size={60} />
      <Button size="medium" onClick={signin}>
        <Flex justify="center" align="center">
          <img
            src="https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_google-512.png"
            alt="google"
            width={20}
            height={20}
          />
          <Spacing direction="horizontal" size={4} />
          Google 로그인
        </Flex>
      </Button>
    </Flex>
  )
}

export default SigninPage
