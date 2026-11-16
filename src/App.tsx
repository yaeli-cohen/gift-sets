import { useState } from 'react'
import GiftPackageCard from './components/GiftPackageCard'
import type { GiftItem, GiftPackage } from './types'

const initialPackages: GiftPackage[] = [
  {
    id: 'family-cohen',
    recipient: 'מארז למשפחת כהן',
    status: 'assembling',
    items: [
      { id: 'wine', name: 'יין אדום מהגליל', price: 68 },
      { id: 'honey', name: 'דבש פרחי בר', price: 32 },
    ],
  },
  {
    id: 'teachers-team',
    recipient: 'מארז לצוות המורות',
    status: 'empty',
    items: [],
  },
  {
    id: 'birthday-noa',
    recipient: 'יום הולדת לנועה',
    status: 'empty',
    items: [],
  },
  {
    id: 'new-home',
    recipient: 'מזל טוב לבית החדש',
    status: 'empty',
    items: [],
  },
]

export default function App() {
  // ה-State נשמר כאן כדי לרכז את נתוני כל המארזים ולאפשר עדכון שלהם מתוך הכרטיסים.
  const [packages, setPackages] = useState(initialPackages)
  const assemblingCount = packages.filter((giftPackage) => giftPackage.status === 'assembling').length

  // כל העדכונים יוצרים מערך ואובייקט חדשים במקום לשנות את ה-State הקיים.
  function startPackage(packageId: string) {
    setPackages((currentPackages) =>
      currentPackages.map((giftPackage) =>
        giftPackage.id === packageId
          ? { ...giftPackage, status: 'assembling' }
          : giftPackage,
      ),
    )
  }

  // פונקציות העדכון מועברות לכרטיסים כ-Props, וכך אירוע ברכיב ילד מעדכן את ה-State כאן.
  function addItem(packageId: string, item: GiftItem) {
    setPackages((currentPackages) =>
      currentPackages.map((giftPackage) =>
        giftPackage.id === packageId
          ? { ...giftPackage, items: [...giftPackage.items, item] }
          : giftPackage,
      ),
    )
  }

  // map מעדכן רק את המארז המבוקש, ו-filter מסיר ממנו רק את הפריט שנבחר.
  function removeItem(packageId: string, itemId: string) {
    setPackages((currentPackages) =>
      currentPackages.map((giftPackage) =>
        giftPackage.id === packageId
          ? { ...giftPackage, items: giftPackage.items.filter((item) => item.id !== itemId) }
          : giftPackage,
      ),
    )
  }

  // שליחת המארז מאפסת גם את הסטטוס וגם את רשימת הפריטים.
  function closePackage(packageId: string) {
    setPackages((currentPackages) =>
      currentPackages.map((giftPackage) =>
        giftPackage.id === packageId
          ? { ...giftPackage, status: 'empty', items: [] }
          : giftPackage,
      ),
    )
  }

  return (
    <main className="app-shell">
      <header className="site-header">
        <a className="brand" href="#" aria-label="מארזי שי - ראשי">
          <span className="brand-mark" aria-hidden="true">✳</span>
          <span>מתנה <strong>באהבה</strong></span>
        </a>
        <span className="header-note">כל מארז מתחיל במחשבה טובה</span>
        <div className="avatar" aria-label="משתמשת">מ</div>
      </header>

      <section className="welcome-section">
        <div className="welcome-copy">
          <span className="eyebrow"><span /> מרכיבים רגעים יפים</span>
          <h1>מארזים שעושים <em>שמחה.</em></h1>
          <p>כל הדברים הקטנים, במקום אחד. בחרו מארז והתחילו להרכיב משהו מיוחד.</p>
        </div>
        <div className="welcome-illustration" aria-hidden="true">
          <span className="sparkle sparkle-one">✦</span>
          <span className="sparkle sparkle-two">✧</span>
          <span className="illustration-box">🎁</span>
          <span className="illustration-leaf">✳</span>
        </div>
      </section>

      <section className="dashboard-section" aria-labelledby="packages-heading">
        <div className="section-heading">
          <div>
            <span className="section-kicker">הפינה שלכם</span>
            <h2 id="packages-heading">המארזים שלי</h2>
          </div>
          <div className="package-count">
            <span className="count-number">{packages.length}</span>
            <span>מארזים ברשימה</span>
          </div>
        </div>

        <div className="summary-bar">
          <span className="summary-icon" aria-hidden="true">✦</span>
          <p>
            {assemblingCount === 0
              ? 'כל המארזים מחכים לרגע שבו תתחילו להרכיב אותם.'
              : `${assemblingCount} ${assemblingCount === 1 ? 'מארז בתהליך הרכבה' : 'מארזים בתהליך הרכבה'} — איזה כיף!`}
          </p>
          <span className="summary-sparkle" aria-hidden="true">✧</span>
        </div>

        <div className="packages-grid">
          {packages.map((giftPackage) => (
            <GiftPackageCard
              key={giftPackage.id}
              giftPackage={giftPackage}
              onStart={startPackage}
              onAddItem={addItem}
              onRemoveItem={removeItem}
              onClose={closePackage}
            />
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <span>נארז באהבה, בשביל רגעים שזוכרים</span>
        <span className="footer-heart" aria-hidden="true">♥</span>
      </footer>
    </main>
  )
}
