import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: "{src,cypress/e2e}/**/*.cy.{js,jsx,ts,tsx}",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
