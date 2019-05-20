import React from "react";

import Header from "./containers/Header";
import CatalogList from "./containers/CatalogueList";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <CatalogList />
      <Footer />
    </div>
  );
}

export default App;
