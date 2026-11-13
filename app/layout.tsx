import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

const SITE_URL = 'https://tictactoe-neonxo.site';

export const viewport: Viewport = {
  themeColor: '#0a0f24',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Tic Tac Toe Online – Play Free 2 Player & AI Game | Neon XO',
    template: '%s | Neon XO',
  },
  description:
    'Play Tic Tac Toe online for free! Challenge friends in 2-player mode or test your skills against an intelligent AI bot with easy, medium, and hard difficulty levels. Features glowing neon visuals, meme sounds, and offline PWA support.',
  keywords: [
    'Tic Tac Toe',
    'Tic Tac Toe Online',
    'Play Tic Tac Toe',
    'Free Tic Tac Toe Game',
    '2 Player Tic Tac Toe',
    'Tic Tac Toe vs Computer',
    'Tic Tac Toe AI',
    'Tic Tac Toe Unblocked',
    'Online X and O Game',
    'Neon XO',
    'Tic Tac Toe PWA',
  ],
  authors: [{ name: 'Gulam Mohyudin Memon', url: SITE_URL }],
  creator: 'Gulam Mohyudin Memon',
  publisher: 'Neon XO',
  applicationName: 'Neon XO',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icons/Icon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icons/Icon-72.png', sizes: '72x72', type: 'image/png' },
      { url: '/icons/Icon-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icons/Icon-144.png', sizes: '144x144', type: 'image/png' },
      { url: '/icons/Icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/Icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/Icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/Icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Neon XO',
    title: 'Tic Tac Toe Online – Play Free 2 Player & AI Game | Neon XO',
    description:
      'Challenge friends or play against an unbeatable Minimax AI bot in Neon XO. Glowing neon effects, funny meme audio, and full offline PWA support.',
    images: [
      {
        url: '/icons/Icon-512.png',
        width: 512,
        height: 512,
        alt: 'Neon XO Tic Tac Toe Game Logo',
      },
      {
        url: '/screenshots/desktop.png',
        width: 1920,
        height: 1080,
        alt: 'Neon XO Gameplay Interface',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neon XO – Fun 2 Player & AI Tic Tac Toe Game',
    description:
      'Modern Tic Tac Toe with neon aesthetics, meme sounds, smart AI difficulty, and Android PWA install support.',
    images: ['/icons/Icon-512.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Neon XO',
      description: 'Free online Tic Tac Toe game with 2-player and AI bot modes.',
      publisher: {
        '@type': 'Person',
        name: 'Gulam Mohyudin Memon',
      },
    },
    {
      '@type': 'VideoGame',
      '@id': `${SITE_URL}/#game`,
      name: 'Neon XO – Modern Tic Tac Toe',
      description:
        'A modern 2-player and AI Tic Tac Toe game with neon visuals, funny meme sounds, Minimax difficulty levels, and PWA installation.',
      genre: ['Puzzle', 'Board Game', 'Casual Game'],
      gamePlatform: ['Web Browser', 'Android', 'iOS', 'Desktop'],
      applicationCategory: 'Game',
      operatingSystem: 'Any modern browser, Windows, macOS, Android, iOS',
      playMode: ['SinglePlayer', 'MultiPlayer'],
      url: SITE_URL,
      image: `${SITE_URL}/icons/Icon-512.png`,
      author: {
        '@type': 'Person',
        name: 'Gulam Mohyudin Memon',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Tag Manager */}
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NT63KB2W');`,
          }}
        />
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9660474885241058"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </head>
      <body className={`${poppins.variable} antialiased min-h-screen flex flex-col justify-between`}>
        {/* GTM NoScript Fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NT63KB2W"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {children}

        {/* Service Worker Registration */}
        <Script
          id="register-sw"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function(err) {
                    console.log('SW registration error:', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
