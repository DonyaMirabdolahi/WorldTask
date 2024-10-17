import { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StyleSheetManager } from 'styled-components';
import Loading from './Loading';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const App = lazy(async () => {
  await delay(2500);
  return import('./App');
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<Loading />}>
    <BrowserRouter>
      <StyleSheetManager>
        <App />
      </StyleSheetManager>
    </BrowserRouter>
  </Suspense>
);
