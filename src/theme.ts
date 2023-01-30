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
    secondary: "#0C2D48",
    text: "#222",
    background: "#eee",
  },
  breakpoints: {
    mobileMax: 767,
  },
};

export default defaultTheme;
