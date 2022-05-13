import { useEffect, useState } from "react";

import Details from "./Details";

const SelectorItem = ({ country, onClick }) => {
  return (
    <li key={country.name.common}>
      {country.name.common} <button onClick={onClick}>View</button>
    </li>
  );
};

const Selector = ({ countries, onSelect }) => {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("");

  // Countries that match the current filter
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  // Runs whenever selection changes
  useEffect(() => {
    // If we selected something, propagate change upwards
    if (selected !== null) {
      onSelect(selected);
    }

    // Clear our state
    setSelected(null);
  }, [selected, onSelect]);

  // Run whenever filter changes
  useEffect(() => {
    if (filteredCountries.length === 1)
      setSelected(filteredCountries[0].name.common);
  }, [filter, filteredCountries]);

  let countryList;

  if (filteredCountries.length > 10) {
    countryList = <div>Try searching for countries above.</div>;
  } else if (filteredCountries.length === 0) {
    countryList = <div>No such country found!</div>;
  } else {
    countryList = (
      <ul>
        {filteredCountries.map((country) => (
          <SelectorItem
            key={country.name.common}
            country={country}
            onClick={() => setSelected(country.name.common)}
          />
        ))}
      </ul>
    );
  }

  return (
    <div>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      {countryList}
    </div>
  );
};

const Viewer = ({ countries }) => {
  const [selected, setSelected] = useState("");

  const selectedCountry = countries.find(
    (country) => country.name.common === selected
  );

  const changeSelection = (selection) => setSelected(selection);

  return (
    <div>
      <h1>Country Viewer</h1>

      <Selector countries={countries} onSelect={changeSelection} />

      {selectedCountry && <Details country={selectedCountry} />}
    </div>
  );
};

export default Viewer;
