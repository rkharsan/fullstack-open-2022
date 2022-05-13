import Weather from "./Weather";

const Details = ({ country }) => {
  const name = country.name.common;
  const capital = country.capital[0];
  const area = country.area;

  const languages = Object.keys(country.languages).map((lang) => ({
    id: lang,
    name: country.languages[lang],
  }));

  const imageUrl = country.flags.png;

  return (
    <div>
      <h2>{name}</h2>
      <p>capital: {capital}</p>
      <p>area: {area} sq km</p>

      <h3>languages</h3>
      <ul>
        {languages.map((lang) => (
          <li key={lang.id}>{lang.name}</li>
        ))}
      </ul>

      <img src={imageUrl} alt={`Flag of ${name}`} title={`Flag of ${name}`} />

      <Weather city={capital} />
    </div>
  );
};

export default Details;
