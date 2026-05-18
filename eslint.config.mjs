import next from "eslint-config-next";
import coreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: [".next/**", "node_modules/**", "out/**", "build/**"],
  },
  ...next,
  ...coreWebVitals,
];

export default config;
