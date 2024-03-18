import React, {useState} from 'react';
import AppHeader from '../app-header/app-header';
import PageBurger from '../page-burger/page-burger';

import style from './app.module.css';

import {DataIngredientsContext} from "../../services/appContext";

function App() {

  const [products, setProducts] = useState(null);

  return (
    <div className={style.app}>
      <DataIngredientsContext.Provider value={{products, setProducts}}>
        <AppHeader/>
        <main className={`${style.main} pt-10`}>
          <PageBurger/>
        </main>
      </DataIngredientsContext.Provider>
    </div>
  );
}

export default App;
