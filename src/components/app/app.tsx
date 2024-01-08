import AppHeader from '../app-header/app-header';
import PageBurger from '../page-burger/page-burger';

import style from './app.module.css';

function App() {

  return (
    <div className={style.app}>
      <AppHeader />
      <main className={`${style.main} pt-10`}>
        <PageBurger />
      </main>
    </div>
  );
}

export default App;
