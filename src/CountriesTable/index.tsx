import { Country, Medals, SortOptions } from "../interfaces";
import { FC } from "react";

interface Props {
  medalsKeys: (keyof Medals)[];
  setSortByOption: React.Dispatch<
    React.SetStateAction<{ field: keyof Medals; direction: "asc" | "desc" }>
  >;
  sortByOption: SortOptions;
  countries: Country[];
  removeCountry: (countryId: string) => void;
}

const CountriesTable: FC<Props> = ({
  medalsKeys,
  setSortByOption,
  sortByOption,
  countries,
  removeCountry,
}) => (
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
          <td onClick={() => removeCountry(country.id)}>❌</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default CountriesTable;
