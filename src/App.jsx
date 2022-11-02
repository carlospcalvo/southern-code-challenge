import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <Header />
      <QueryClientProvider client={queryClient}>
        <Main />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <Footer />
    </>
  );
}

export default App;
