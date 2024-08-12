import '@/styles/index.scss';
import '&/fonts/index.scss';


export const metadata = {
  title: 'K-teachers',
}


export default ({ children, ...props}) => {
  return (
    <html lang="ru" translate="no">
      <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow"/>
      </head>
      <body >
        <main className='main'>
          {children}
        </main>
      </body>
    </html>
  )
}
