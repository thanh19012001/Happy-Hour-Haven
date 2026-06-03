import { changeLanguage } from 'i18next'
import { useTranslation } from 'react-i18next'

function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const lngs = {
    en: { nativeName: 'English' },
    vi: { nativeName: 'Tiếng Việt' },
    ja: { nativeName: '日本語' }
  }

  return (
    <div>
      <select onChange={(e)=>changeLanguage(e.target.value)} value={i18n.language}>
        <option value="en">English</option>
        <option value="vi">Tiếng Việt</option>
        <option value="ja">日本語</option>
      </select>
    </div>
  )
}

export default LanguageSwitcher
