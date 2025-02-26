import '@/styles/index.scss';
import '&/fonts/index.scss'
import ReduxProvider from '@/store/ReduxProvider';
import { Suspense } from 'react';
import { Footer, Header } from '@/templates';

export const metadata = {
  title: 'K-teachers',
}


export default ({ children, ...props}) => {

  return (
    <html lang="ru" translate="no">
      <head>
      <meta charSet="UTF-8" />
      {/* <link rel="icon" type="image/svg+xml" href="/icons/book.svg" /> */}
      <meta name="robots" content="index, follow"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"/>
      <meta name="copyright" content="учителягерои.рф © Все права защищены" />
      <meta property="vk:image" content="https://учителягерои.рф/images/meta.jpg" />
      <meta property="og:image" content="https://учителягерои.рф/images/meta.jpg" />
      <meta property="og:image:width" content="1590" />
      <meta property="og:image:height" content="400" />
      <meta property="og:site_name" content="Учителя Фронтовики Казани" />
      <meta property="og:type" content="website"/>
      <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png"/>
      <link rel="manifest" href="/favicons/site.webmanifest"/>
      <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#d6452d"/>
      <link rel="shortcut icon" href="/favicons/favicon.ico"/>
      <meta name="msapplication-TileColor" content="#faf7ed"/>
      <meta name="msapplication-config" content="/favicons/browserconfig.xml"/>
      <meta name="theme-color" content="#faf7ed"/>
      <meta name="google" content="notranslate"/>
      </head>
      <body >
        <ReduxProvider>
          <Suspense>
            <Header/>
            <main className='main'>
              {children}
            </main>
            <Footer/>
          </Suspense>
        </ReduxProvider>
      </body>
    </html>
  )
}
