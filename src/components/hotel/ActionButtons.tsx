import { css } from '@emotion/react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'
import useShare from '@hooks/useShare'
import useLike from '@hooks/like/useLike'
import { Hotel } from '@models/hotels'

function ActionButtons({ hotel }: { hotel: Hotel }) {
  const { name, comment, mainImageUrl } = hotel

  const share = useShare()

  const { data: likes, mutate: like } = useLike()

  const isLiked = Boolean(likes?.find((like) => like.hotelId === hotel.id))

  return (
    <Flex css={containerStyles}>
      <Button
        label="좋아요"
        iconUrl={
          isLiked
            ? 'https://cdn4.iconfinder.com/data/icons/twitter-29/512/166_Heart_Love_Like_Twitter-512.png'
            : 'https://cdn3.iconfinder.com/data/icons/sympletts-free-sampler/128/heart-256.png'
        }
        onClick={() => {
          like({
            hotel: {
              id: hotel.id,
              name: hotel.name,
              mainImageUrl: hotel.mainImageUrl,
            },
          })
        }}
      />
      <Button
        label="공유하기"
        iconUrl="https://cdn1.iconfinder.com/data/icons/rounded-social-media/512/kakao-256.png"
        onClick={() => {
          share({
            title: name,
            description: comment,
            imageUrl: mainImageUrl,
            buttonLabel: 'Love Trip에서 보기',
          })
        }}
      />
      <CopyToClipboard
        text={window.location.href}
        onCopy={() => {
          alert('링크가 복사되었습니다.')
        }}
      >
        <Button
          label="링크 복사"
          iconUrl="https://cdn3.iconfinder.com/data/icons/feather-5/24/copy-512.png"
        />
      </CopyToClipboard>
    </Flex>
  )
}

function Button({
  label,
  iconUrl,
  onClick,
}: {
  label: string
  iconUrl: string
  onClick?: () => void
}) {
  return (
    <Flex direction="column" align="center" onClick={onClick}>
      <img src={iconUrl} alt="" width={30} height={30} />
      <Spacing direction="vertical" size={6} />
      <Text typography="t7">{label}</Text>
    </Flex>
  )
}

const containerStyles = css`
  padding: 24px;
  cursor: pointer;

  & * {
    flex: 1;
  }
`

export default ActionButtons
