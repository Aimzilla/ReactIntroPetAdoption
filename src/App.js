import React, {useState} from 'react';
import { render } from 'react-dom';
import { Router, Link } from '@reach/router'; 
// import Pet from './Pet';
import SearchParams from './SearchParams';
import Details from './Details';
import ThemeContext from './ThemeContext';

const App = () => {
  // return React.createElement("div", { id: "something-important" }, [
  //   React.createElement("h1", {}, "Adopt Me!"),
  //   React.createElement(Pet, {
  //     name: "Gil",
  //     animal: "Dog",
  //     breed: "Dood",
  //   }),
  //   React.createElement(Pet, {
  //     name: "Squeakers",
  //     animal: "Cat",
  //     breed: "Queen",
  //   }),
  //   React.createElement(Pet, { name: "Luna", animal: "Dog", breed: "Mutt" }),
  // ]);
// ;

//   return (
//     <div>
//       <h1 id="something-important">Adopt Me!</h1>
//       <Pet name="Gil" animal="Dog" breed="Dood" />
//       <Pet name="Squeakers" animal="Cat" breed="Queen" />
//       <Pet name="Doink" animal="Bird" breed="Tweety" />
//     </div>
//   );
// };

  const themeHook = useState('darkblue');
  return (
    <React.StrictMode>
      <ThemeContext.Provider value={themeHook}>
      <div>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <Router>
          <SearchParams path="/" />
          <Details path="/details/:id" />
        </Router>
      </div>
    </ThemeContext.Provider>
    </React.StrictMode>
  )
};

render(<App />, document.getElementById("root"));
