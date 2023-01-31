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
        .filter(
          (country) => !countries.map(({ id }) => id).includes(country.id)
        )
        .sort((a, b) => a.name.localeCompare(b.name));
    }

    return [];
  }, [countriesQuery, countries]);

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
    const compareTwoCountries = (
      firstCountry: Country,
      secondCountry: Country
    ) => {
      const sortValue =
        firstCountry.medals[sortByOption.field] -
          secondCountry.medals[sortByOption.field] ||
        firstCountry.medals["gold"] - secondCountry.medals["gold"] ||
        firstCountry.medals["silver"] - secondCountry.medals["silver"] ||
        firstCountry.medals["bronze"] - secondCountry.medals["bronze"];

      return sortByOption.direction === "asc" ? sortValue : -sortValue;
    };

    setCountries((countries) => [...countries].sort(compareTwoCountries));
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
    areCountriesLoadedSuccessfully: countriesQuery.isSuccess,
  };
};
