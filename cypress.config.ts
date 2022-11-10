import { defineConfig } from "cypress";

require('dotenv').config()

export default defineConfig({
  // Viewport settings overridden for component tests
  component: {
    devServer: {
      bundler: "webpack",
      framework: "create-react-app",
    },
    experimentalSingleTabRunMode: false,
  },
  e2e: {
    baseUrl: 'http://localhost:3000/',
    experimentalSessionAndOrigin: true,
  },
  viewportWidth: 1320,
  viewportHeight: 820,
  projectId: "bt9t7m",
  // The rest of the Cypress config options go here...
});
