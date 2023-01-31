import { Country, Medals, SortOptions } from "../interfaces";
import { FC } from "react";
import {
  Table,
  TableCell,
  TableCellMedal,
  TableCellRemove,
  TableHeader,
  TableHeaderMedal,
  TableHeaderRemove,
  TableRow,
  TableWrapper,
} from "./styled";

interface Props {
  medalsKeys: (keyof Medals)[];
  setSortByOption: React.Dispatch<
    React.SetStateAction<{ field: keyof Medals; direction: "asc" | "desc" }>
  >;
  sortByOption: SortOptions;
  countries: Country[];
  removeCountry: (countryId: string) => void;
}

enum MedalDescription {
  "gold" = "🥇",
  "silver" = "🥈",
  "bronze" = "🥉",
  "total" = "⅀",
}

const CountriesTable: FC<Props> = ({
  medalsKeys,
  setSortByOption,
  sortByOption,
  countries,
  removeCountry,
}) => (
  <TableWrapper>
    <Table>
      <thead>
        <tr>
          <TableHeader scope="col">Country name</TableHeader>
          {medalsKeys.map((fieldName) => (
            <TableHeaderMedal
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
              <small>
                {sortByOption.field === fieldName &&
                  (sortByOption.direction === "desc" ? "⬇ " : "⬆ ")}
              </small>
              {MedalDescription[fieldName]}
            </TableHeaderMedal>
          ))}
          <TableHeaderRemove></TableHeaderRemove>
        </tr>
      </thead>
      <tbody>
        {countries.map((country) => (
          <TableRow key={country.name}>
            <TableCell>
              {country.flag} {country.name}
            </TableCell>
            <TableCellMedal>{country.medals.gold}</TableCellMedal>
            <TableCellMedal>{country.medals.silver}</TableCellMedal>
            <TableCellMedal>{country.medals.bronze}</TableCellMedal>
            <TableCellMedal>{country.medals.total}</TableCellMedal>
            <TableCellRemove onClick={() => removeCountry(country.id)}>
              ❌
            </TableCellRemove>
          </TableRow>
        ))}
      </tbody>
    </Table>
  </TableWrapper>
);

export default CountriesTable;
