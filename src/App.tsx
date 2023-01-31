import NewCountryForm from "./NewCountryForm";
import CountriesTable from "./CountriesTable";
import { useCountries } from "./useCountries";
import Container from "./common/Container";
import Section from "./common/Section";

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
    <Container>
      <header>
        <h1>Olympic medals table</h1>
      </header>
      <Section title={"Add new country"}>
        <NewCountryForm
          addCountry={addCountry}
          countriesOptions={listOfCountries}
        />
      </Section>
      <Section title="Medals table">
        <CountriesTable
          countries={countries}
          removeCountry={removeCountry}
          setSortByOption={setSortByOption}
          sortByOption={sortByOption}
          medalsKeys={medalsKeys}
        />
      </Section>
    </Container>
  );
}

export default App;
