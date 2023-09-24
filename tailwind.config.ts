import type { Config } from "tailwindcss";

const config: Config = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-dashboard":
          "linear-gradient(122deg, #EDEDED -6.51%, #BFD5D8 109.37%, #2C818B 158.29%)",
      },
      fontFamily: {
        sans: "Poppins",
      },
      colors: {
        primary: {
          "100": "#287F89;",
          hover: "#1F5F66",
        },
        danger: {
          "50": "#D61743",
          "100": "#98344A",
          hover: "#712536",
        },
        ds: {
          cyan10: "#4ED0C8",
          cyan20: "#00B0A5",
          pink10: "#FFE2F2",
          pink20: "#FFB1D9",
          donker: "#233563",
          gray: "#EDEDED",
          orange: "#EF9610",
          white: {
            "100": "#F4F4F4",
          },
          tosca: {
            "100": "#287F89",
            "200": "#1D5B63",
          },
          blue: {
            "50": "#77B8F5",
            "100": "#2D92F0",
          },
        },
        mobile: {
          "0": "#0xFFE17055",
          "1": "#0xff8373a0",
          "2": "#0xff46aab9",
          "3": "#0xff60a588",
          "4": "#0xffd58734",
          "5": "#0xffa5647c",
          "6": "#0xff4d9b9d",
          "7": "#0xff5686aa",
        }
      },
      boxShadow: {
        allSides: "0px 0px 10px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
};
export default config;
