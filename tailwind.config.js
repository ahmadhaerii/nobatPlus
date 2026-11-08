/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "background-color": "#EDF2F9",
        "background-hover-color": "#d9dee5",
        "primary-text-color": "#1D1D1D",
        "secondary-text-color": "#5E6E82",
        "table-warning-color": "#91959b",
        "icon-color": "#5E6E82",
        "side-menu-active-color": "#2C7BE5",
        "table-header-background-color": "#EDF2F9",
        "table-header-text-color": "#1D1D1D",
        "success-button-color": "#00ae65",
        "warning-button-color": "#f5803e",
        "danger-button-color": "#e63757",
        "primary-button-color": "#2c7be5",
        "default-button-color": "#4d5969",
        "sort-arrow-color": "#B6C2D2",
        "background-card-color": "#f9fafd",
        "dark-blue-color" :"#1f2f40",
        "orange-color" : "#fa4318",
        "gray-dialog-backgound":'#B8BBC0FF'
      },
    },
  },
  plugins: [],
};
