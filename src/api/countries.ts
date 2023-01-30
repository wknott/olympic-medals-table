import axios from "axios";

interface CountryName {
  common: string;
}

interface CountryFromApi {
  name: CountryName;
  flag: string;
  cioc: string;
  cca3: string;
}

export async function getCountries() {
  try {
    const { data } = await axios.get<CountryFromApi[]>(
      "https://restcountries.com/v3.1/all",
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      return "An unexpected error occurred";
    }
  }
}
