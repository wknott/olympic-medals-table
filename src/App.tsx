import React, { useEffect, useMemo, useState } from "react";
import NewCountryForm from "./NewCountryForm";
import { useQuery } from "react-query";
import { getCountries } from "./api/countries";
import exampleCountries from "./exampleData.json";

export interface CountryFromList {
  name: string;
  flag: string;
  id: string;
}

export interface Medals {
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

export interface Country extends CountryFromList {
  medals: Medals;
}

export interface CountryOptionData {
  id: string;
  medals: Medals;
}

function App() {
  const [countries, setCountries] = useState<Country[]>(exampleCountries);
  const [sortByOption, setSortByOption] = useState<{
    field: keyof Medals;
    direction: "asc" | "desc";
  }>({
    field: "total",
    direction: "desc",
  });
  const countriesQuery = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
  });

  const listOfCountries = useMemo<CountryFromList[]>(() => {
    if (countriesQuery.data && typeof countriesQuery.data !== "string") {
      return countriesQuery.data
        .map((country) => ({
          name: country.name.common,
          flag: country.flag,
          id: country.cioc || country.cca3,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
    }

    return [];
  }, [countriesQuery]);

  const addCountry = (country: CountryOptionData) => {
    const countryData = listOfCountries.find(({ id }) => id === country.id);

    if (!countryData || countries.some(({ id }) => country.id === id)) {
      return;
    }

    setCountries((countries) => [
      ...countries,
      {
        ...countryData,
        medals: country.medals,
      },
    ]);
  };

  useEffect(() => {
    const sortCountries = () => {
      setCountries((countries) =>
        [...countries].sort((a, b) => {
          if (sortByOption.direction === "asc")
            return a.medals[sortByOption.field] - b.medals[sortByOption.field];

          return b.medals[sortByOption.field] - a.medals[sortByOption.field];
        })
      );
    };
    sortCountries();
  }, [sortByOption]);

  const medalsKeys: (keyof Medals)[] = ["gold", "silver", "bronze", "total"];

  return (
    <main className="App">
      <NewCountryForm
        addCountry={addCountry}
        countriesOptions={listOfCountries}
      />
      <table>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Country name</th>
            {medalsKeys.map((fieldName) => (
              <th
                key={fieldName}
                scope="col"
                onClick={() => {
                  setSortByOption({
                    field: fieldName,
                    direction:
                      sortByOption.field === fieldName
                        ? sortByOption.direction === "asc"
                          ? "desc"
                          : "asc"
                        : "desc",
                  });
                }}
              >
                {sortByOption.field === fieldName &&
                  (sortByOption.direction === "desc" ? "⬇ " : "⬆ ")}
                {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <tr key={country.name}>
              <td>{country.flag}</td>
              <td>{country.name}</td>
              <td>{country.medals.gold}</td>
              <td>{country.medals.silver}</td>
              <td>{country.medals.bronze}</td>
              <td>{country.medals.total}</td>
              <td
                onClick={() =>
                  setCountries((countries) =>
                    countries.filter(({ id }) => id !== country.id)
                  )
                }
              >
                ❌
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default App;
