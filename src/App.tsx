import { lazy }from 'react';

const ArticleTeasers = lazy(() => import("./components/ArticleTeasers"));


function App() {
  return (
    <ArticleTeasers/>
  );
}

export default App;
