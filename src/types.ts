export type GiftItem = {
  id: string
  name: string
  price: number
}

export type GiftPackage = {
  id: string
  recipient: string
  // empty: מוכן להרכבה; assembling: ניתן להוסיף ולהסיר פריטים.
  status: 'empty' | 'assembling'
  items: GiftItem[]
}
