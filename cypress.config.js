const { defineConfig } = require("cypress");

const fs = require('fs');
module.exports = defineConfig({
  projectId: 'sbm5dd',
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        update_data(data) {
          fs.writeFileSync('cypress/fixtures/dummy_valid_account.json', JSON.stringify(data, null, 2));
          return null;
        }
      });
    },
    baseUrl: "https://magento.softwaretestingboard.com/",
  },
  video: true,
  watchForFileChanges: false,
  defaultCommandTimeout: 6000,
  viewportHeight: 1080,
  viewportWidth: 1920,
});
