import React, { useState, useEffect, useContext } from 'react';
import pet, { ANIMALS } from "@frontendmasters/pet";
import Results from './Results';
import useDropdown from './useDropdown';
import ThemeContext from './ThemeContext';

const SearchParams = () => {
    // hooks NEVER go inside if stmts or for loops because react tracks state in order of hooks
    // this next line is a "hook".  all hooks must start with "use".  hooks will always return an array.  1st item is the variable & current state.  2nd item is a function & update
    const [location, setLocation] = useState("Seattle, WA");
    const [breeds, setBreeds] = useState([]);
    const [animal, AnimalDropdown] = useDropdown("Animal", "cat", ANIMALS);
    const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
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

        pet.breeds(animal).then(({ breeds }) => {
            const breedStrings = breeds.map(({ name }) => name);
            setBreeds(breedStrings);
        }, console.error);
    }, [animal, setBreed, setBreeds]);

    //this gets rendered BEFORE running the useEffect func
    return (
        <div className = "search-params">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                requestPets();
              }} 
            >
              <label htmlFor="location">
              Location
                <input 
                    id="location" 
                    value={location} 
                    placeholder="Your location"
                    onChange={event => setLocation(event.target.value)} />
              </label>

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