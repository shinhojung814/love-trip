import { css } from '@emotion/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

function Carousel({ images }: { images: string[] }) {
  return (
    <div>
      <Swiper css={containerStyles} spaceBetween={8}>
        {images.map((image, idx) => (
          <SwiperSlide key={idx}>
            <img src={image} alt={`${idx + 1}번째 이미지`} css={imageStyles} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

const containerStyles = css`
  height: 300px;
  padding: 0 24px;
`

const imageStyles = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`

export default Carousel
