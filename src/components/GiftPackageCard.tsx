import AddProductForm from './AddProductForm'
import type { GiftItem, GiftPackage } from '../types'

type GiftPackageCardProps = {
  giftPackage: GiftPackage
  onStart: (packageId: string) => void
  onAddItem: (packageId: string, item: GiftItem) => void
  onRemoveItem: (packageId: string, itemId: string) => void
  onClose: (packageId: string) => void
}

const currency = new Intl.NumberFormat('he-IL', {
  style: 'currency',
  currency: 'ILS',
  maximumFractionDigits: 2,
})

export default function GiftPackageCard({
  giftPackage,
  onStart,
  onAddItem,
  onRemoveItem,
  onClose,
}: GiftPackageCardProps) {
  const isAssembling = giftPackage.status === 'assembling'
  // הסכום מחושב מהפריטים בכל רינדור, ולכן אין צורך לשמור אותו ב-State נפרד.
  const total = giftPackage.items.reduce((sum, item) => sum + item.price, 0)

  return (
    <article className={`package-card${isAssembling ? ' is-assembling' : ''}`}>
      <div className="package-topline">
        <div className="package-icon" aria-hidden="true">🎁</div>
        <span className={`status-pill ${isAssembling ? 'status-active' : 'status-empty'}`}>
          <span className="status-dot" />
          {isAssembling ? 'בהרכבה' : 'ממתין להרכבה'}
        </span>
      </div>
      <h2>{giftPackage.recipient}</h2>

      {/* התוכן משתנה לפי הסטטוס: כפתור התחלה למארז ריק, ותכולה וטופס למארז בהרכבה. */}
      {isAssembling ? (
        <div className="package-content">
          <div className="items-heading">
            <h3>תכולת המארז</h3>
            <span>{giftPackage.items.length} פריטים</span>
          </div>

          {giftPackage.items.length > 0 ? (
            <ul className="item-list">
              {giftPackage.items.map((item) => (
                <li className="item-row" key={item.id}>
                  <span className="item-bullet" aria-hidden="true">✦</span>
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">{currency.format(item.price)}</span>
                  <button
                    className="remove-button"
                    type="button"
                    aria-label={`הסרת ${item.name}`}
                    onClick={() => onRemoveItem(giftPackage.id, item.id)}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
            
          ) : (
            <p className="empty-items">עוד לא הוספתם פריטים. זה הזמן לבחור משהו משמח.</p>
          )}

          <div className="total-row">
            <span>סך הכול</span>
            <strong>{currency.format(total)}</strong>
          </div>

          <AddProductForm onAdd={(item) => onAddItem(giftPackage.id, item)} />

          <button
            className="close-package-button"
            type="button"
            onClick={() => onClose(giftPackage.id)}
          >
            <span aria-hidden="true">✓</span>
            סגירה ושליחת המארז
          </button>
        </div>
      ) : (
        <div className="empty-package-content">
          <p>מארז חדש ומוכן להתמלא בכל טוב.</p>
          <button
            className="start-button"
            type="button"
            onClick={() => onStart(giftPackage.id)}
          >
            <span aria-hidden="true">＋</span>
            התחלת הרכבת המארז
          </button>
        </div>
      )}
    </article>
  )
}
