import { FC, FormEvent, useState } from "react";
import { CountryFromList, CountryOptionData } from "../interfaces";

interface Props {
  addCountry: (country: CountryOptionData) => void;
  countriesOptions: CountryFromList[];
}

const NewCountryForm: FC<Props> = ({ addCountry, countriesOptions }) => {
  const [countryName, setCountryName] = useState("POL");
  const [goldMedals, setGoldMedals] = useState("0");
  const [silverMedals, setSilverMedals] = useState("0");
  const [bronzeMedals, setBronzeMedals] = useState("0");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    addCountry({
      id: countryName,
      medals: {
        gold: +goldMedals,
        silver: +silverMedals,
        bronze: +bronzeMedals,
        total: +goldMedals + +silverMedals + +bronzeMedals,
      },
    });
    setCountryName("POL");
    setGoldMedals("0");
    setSilverMedals("0");
    setBronzeMedals("0");
  };

  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <label>
          <span>Country name:</span>
          <select
            onChange={(event) => {
              setCountryName(event.target.value);
            }}
            value={countryName}
          >
            {countriesOptions.map((country) => (
              <option key={`${country.id}-${country.name}`} value={country.id}>
                {country.flag} {country.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Gold medals:</span>
          <input
            min={0}
            value={goldMedals}
            type="number"
            onChange={({ target }) => {
              setGoldMedals(target.value);
            }}
          />
        </label>
        <label>
          <span>Gold medals:</span>
          <input
            min={0}
            value={silverMedals}
            type="number"
            onChange={({ target }) => {
              setSilverMedals(target.value);
            }}
          />
        </label>
        <label>
          <span>Gold medals:</span>
          <input
            min={0}
            value={bronzeMedals}
            type="number"
            onChange={({ target }) => {
              setBronzeMedals(target.value);
            }}
          />
        </label>
      </fieldset>
      <button>Add country</button>
    </form>
  );
};

export default NewCountryForm;
