export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    text: string;
    background: string;
  };
  breakpoints: {
    mobileMax: number;
  };
}

const defaultTheme: Theme = {
  colors: {
    primary: "#145DA0",
    secondary: "#ddd",
    text: "#222",
    background: "#eee",
  },
  breakpoints: {
    mobileMax: 900,
  },
};

export default defaultTheme;
