import Head from 'next/head';
import { useState } from 'react';
import { MantineProvider, TypographyStylesProvider, ColorSchemeProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

export default function App(props) {
  
  const { Component, pageProps } = props;

  const [colorScheme, setColorScheme] = useState('light');
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{colorScheme}}
      >
        <NotificationsProvider>
        <TypographyStylesProvider>
        <Component {...pageProps} />
        </TypographyStylesProvider>
        </NotificationsProvider>
      </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}