import React, { useState, useEffect, useContext } from 'react';
import pet, { ANIMALS } from "@frontendmasters/pet";
import Results from './Results';
import useDropdown from './useDropdown';
import ThemeContext from './ThemeContext';
import { setTheUsername } from 'whatwg-url';

const SearchParams = () => {
    //const location = "Seattle, WA";
    // hooks NEVER go inside if stmts or for loops because react tracks state in order of hooks
    // this next line is a "hook".  all hooks must start with "use".  hooks will always return an array.  1st item is the variable & current state.  2nd item is a function & update
    const [location, setLocation] = useState("Seattle, WA");
    const [breeds, setBreeds] = useState([]);
    //const [animal, setAnimal] = useState("Select"); updating to use custom hook on next line:
    const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS); //then delete animal label below
    //const [breed, setBreed] = useState(""); updating to use custom hook on next line:
    const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds); //then delete breed label below
    const [pets, setPets] = useState([]);
    const [theme, setTheme] = useContext(ThemeContext);

    async function requestPets() {
        const { animals } = await pet.animals({
            location, 
            breed,
            type: animal
        });

        setPets(animals || []);

    };

    //schedules useEffect - doesn't run on first render
    useEffect(() => {
        setBreeds([]);
        setBreed("");

        pet.breeds(animal).then(({ apiBreedsList }) => {
            //take list of objects & transform to list of strings
          //const breedStrings = breeds.map((breedObject) => breedObject.name)
            const breedStrings = apiBreedsList.map(({ name }) => name);
            setBreeds(breedStrings);
        }, console.error);
        //have to set list of dependencies - if the dependencies don't change, the fn doesn't run again
        //if only want to run/load once, empty array
        //if want to run every time, remove dependency array
    }, [animal, setBreed, setBreeds]);

    //this gets rendered BEFORE running the useEffect func
    return (
        <div className = "search-params">
            <form onSubmit={(e) => {
                e.preventDefault();
                requestPets();
            }} >
            {/* <h1>{ location }</h1> */}
            {/* <form> */}
              <label htmlFor="location">
              Location
                <input 
                    id="location" 
                    value={location} 
                    placeholder="Your location"
                    onChange={event => setLocation(event.target.value)} />
              </label>

            {/* This will get replaced by dropdown component */}
              {/* <label htmlFor="animal">Animal
                <select
                    id="animal"
                    value={ animal }
                    placeholder="Animal"
                    onChange={event => setAnimal(event.target.value)}
                    onBlur={event => setAnimal(event.target.value)}>
                        <option>Select</option>
                        {ANIMALS.map(animal => <option key={animal} value={animal}>{animal}</option>)}
                </select>
              </label> */}

            {/* This will get replaced by dropdown component */}
              {/* <label htmlFor="breed">Breed
                <select 
                    id="breed" 
                    value={ breed } 
                    onChange={event => setBreed(event.target.value)}
                    onBlur={event => setBreed(event.target.value)}
                    disabled={!breeds.length} //same as {breeds.length === 0}
                >
                    <option>Choose</option>
                    {breeds.map(breedString => <option key={breedString} value={breedString}>{ breed }</option>)}
                </select>
              </label> */}

              <AnimalDropdown />
              <BreedDropdown />
              <label htmlFor="theme">
                Theme
                <select
                value={theme}
                onChange={e => setTheme(e.target.value)}
                onBlur={e => setTheme(e.target.value)}
                >
                  <option value="peru">Peru</option>
                  <option value="darkblue">Dark Blue</option>
                  <option value="mediumorchid">Medium Orchid</option>
                  <option value="chartreuse">Chartreuse</option>
                </select>
              </label>

              <button style={{ backgroundColor: theme }}>Submit</button>
            </form>
            <Results pets={pets} />
        </div>
    );
};

export default SearchParams;