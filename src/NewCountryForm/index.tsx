import { FC, FormEvent, useState } from "react";
import { CountryFromList, CountryOptionData } from "../interfaces";
import { Button, Input, Label, LabelText, Select, StyledForm } from "./styled";

interface Props {
  addCountry: (country: CountryOptionData) => void;
  countriesOptions: CountryFromList[];
}

const NewCountryForm: FC<Props> = ({ addCountry, countriesOptions }) => {
  const [countryName, setCountryName] = useState("USA");
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
    setCountryName("USA");
    setGoldMedals("0");
    setSilverMedals("0");
    setBronzeMedals("0");
  };

  return (
    <StyledForm onSubmit={onSubmit}>
      <Label>
        <LabelText>Country name:</LabelText>
        <Select
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
        </Select>
      </Label>
      <Label>
        <LabelText>🥇 Gold</LabelText>
        <Input
          min={0}
          value={goldMedals}
          type="number"
          onChange={({ target }) => {
            setGoldMedals(target.value);
          }}
        />
      </Label>
      <Label>
        <LabelText>🥈 Silver</LabelText>
        <Input
          min={0}
          value={silverMedals}
          type="number"
          onChange={({ target }) => {
            setSilverMedals(target.value);
          }}
        />
      </Label>
      <Label>
        <LabelText>🥉 Bronze</LabelText>
        <Input
          min={0}
          value={bronzeMedals}
          type="number"
          onChange={({ target }) => {
            setBronzeMedals(target.value);
          }}
        />
      </Label>
      <Button>Add country</Button>
    </StyledForm>
  );
};

export default NewCountryForm;
