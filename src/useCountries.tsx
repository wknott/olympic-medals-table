import { useEffect, useMemo, useState } from "react";
import exampleCountries from "./exampleData.json";
import { useQuery } from "react-query";
import { getCountries } from "./api/countries";
import {
  Country,
  CountryFromList,
  CountryOptionData,
  Medals,
  SortOptions,
} from "./interfaces";

export const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>(exampleCountries);
  const [sortByOption, setSortByOption] = useState<SortOptions>({
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

  const removeCountry = (countryId: string) => {
    setCountries((countries) => countries.filter(({ id }) => id !== countryId));
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

  return {
    addCountry,
    removeCountry,
    listOfCountries,
    countries,
    setSortByOption,
    sortByOption,
    medalsKeys,
  };
};
