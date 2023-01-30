import NewCountryForm from "./NewCountryForm";
import CountriesTable from "./CountriesTable";
import { useCountries } from "./useCountries";

function App() {
  const {
    addCountry,
    removeCountry,
    listOfCountries,
    countries,
    setSortByOption,
    sortByOption,
    medalsKeys,
  } = useCountries();

  return (
    <main className="App">
      <NewCountryForm
        addCountry={addCountry}
        countriesOptions={listOfCountries}
      />
      <CountriesTable
        countries={countries}
        removeCountry={removeCountry}
        setSortByOption={setSortByOption}
        sortByOption={sortByOption}
        medalsKeys={medalsKeys}
      />
    </main>
  );
}

export default App;
