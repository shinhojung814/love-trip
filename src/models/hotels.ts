export interface Hotel {
  id: string
  name: string
  starRating: number
  price: number
  location: { directions: string; pointGeolocation: { x: number; y: number } }
  mainImageUrl: string
  contents: string
  comment: string
  images: string[]
  events?: {
    name: string
    promoEndTime?: string
    tagThemeStyle: {
      backgroundColor: string
      fontColor: string
    }
  }
}
