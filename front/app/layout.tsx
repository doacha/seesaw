import Providers from '@/utils/provider'
import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'

//fontawesome 설정/////////////////////////////////////////
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import Header from './components/Header'
import Navbar from './components/Navbar'
import { currentTabStore } from '@/stores/currentTab'
config.autoAddCss = false
//////////////////////////////////////////////////////////
//아이콘을 사용하는 페이지에서 FontAwesomeIcon태그 import //
//필요한 아이콘명도 import////////////////////////////////
//<FontAwesomeIcon icon={faMoneyBill1} /> 이런식으로 사용/
////////////////////////////////////////////////////////

const environmentR = localFont({
  src: '../public/font/환경R.ttf',
  variable: '--font-environmentR',
})

const SCDream_Light = localFont({
  src: '../public/font/SCDream3.otf',
  variable: '--font-SCDream-Light',
})

const SCDream_Regular = localFont({
  src: '../public/font/SCDream4.otf',
  variable: '--font-SCDream-Regular',
})

const SCDream_Medium = localFont({
  src: '../public/font/SCDream5.otf',
  variable: '--font-SCDream-Medium',
})

const SCDream_ExBold = localFont({
  src: '../public/font/SCDream7.otf',
  variable: '--font-SCDream-ExBold',
})

const roboto_Middle = localFont({
  src: '../public/font/Roboto-Medium.ttf',
  variable: '--font-roboto-Middle',
})

export const metadata: Metadata = {
  title: '시소 - 시작하자 소비절약',
  description: '시작하자 소비절약 - 시소',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html
      lang="en"
      className={`${environmentR.variable} ${SCDream_Light.variable}
    ${SCDream_Regular.variable} ${SCDream_Medium.variable} ${SCDream_ExBold.variable} ${roboto_Middle.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
        <Navbar/>
      </body>
    </html>
  )
}
