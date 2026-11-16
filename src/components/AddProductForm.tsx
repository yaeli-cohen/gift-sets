import { useState, type FormEvent } from 'react'
import type { GiftItem } from '../types'

type AddProductFormProps = {
  onAdd: (item: GiftItem) => void
}

export default function AddProductForm({ onAdd }: AddProductFormProps) {
  // ערכי הטופס נשארים מקומיים; המארז מתעדכן רק לאחר שליחת הטופס.
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedName = name.trim()
    const numericPrice = Number(price)

    if (!trimmedName || price === '' || !Number.isFinite(numericPrice) || numericPrice < 0) {
      return
    }

    onAdd({
      id: crypto.randomUUID(),
      name: trimmedName,
      price: numericPrice,
    })
    setName('')
    setPrice('')
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <span className="form-heading-icon" aria-hidden="true">＋</span>
        <div>
          <h3>מוסיפים משהו טוב</h3>
          <p>הוסיפו פריט חדש למארז</p>
        </div>
      </div>
      <div className="form-fields">
        <label>
          <span>שם הפריט</span>
          <input
            type="text"
            placeholder="למשל: שוקולד בוטיק"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>
        <label>
          <span>מחיר (₪)</span>
          <input
            type="number"
            placeholder="0"
            min="0"
            step="0.01"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            required
          />
        </label>
        <button className="add-button" type="submit" aria-label="הוספת פריט">
          הוספה <span aria-hidden="true">＋</span>
        </button>
      </div>
    </form>
  )
}
