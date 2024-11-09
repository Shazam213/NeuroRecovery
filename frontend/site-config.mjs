/**
 * To get intellisense hints for this configuration file, create an NPM project
 * in the same folder as this file and install the @m2c2kit/schematics package:
 *   npm init -y
 *   npm install -D @m2c2kit/schematics
 *
 * To use the latest version of both packages, run the following commands in
 * the same folder as this file:
 *   npm install -g @m2c2kit/cli@latest
 *   npm install @m2c2kit/schematics@latest
 */

/**
 * @typedef {import("@m2c2kit/schematics").StaticSiteConfig} StaticSiteConfig
 * @type {StaticSiteConfig}
 */
export default {
  configVersion: "0.1.21",
  outDir: "./dist",
  assessments: [
    {
      name: "@m2c2kit/assessment-symbol-search",
      versions: ">=0.8.19",
      // by setting the parameters property, the game's parameters can be
      // changed from the defaults built into the game. for game parameters,
      // see https://m2c2-project.github.io/m2c2kit/docs/schemas/what-is-schema/
      // note that if game parameters are passed in through URL parameters,
      // they will override these.
      parameters: {
        number_of_trials: 4,
        show_quit_button: false,
      },
    },
    {
      name: "@m2c2kit/assessment-grid-memory",
      versions: ">=0.8.19",
      parameters: {
        number_of_trials: 2,
        show_quit_button: false,
      },
    }    
  ],
  configure: (context, session, assessment) => {
    console.log(`configuring assessment ${assessment.options.name} version ${assessment.options.version}`)
    session.onActivityData((ev) => {
      console.log("  newData: " + JSON.stringify(ev.newData));
      // place code here to post data to a server, e.g.,
      // fetch("https://www.example.com", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(ev.newData),
      // });
    });
    // place code here to redirect when session ends, e.g.,
    // session.onEnd(() => {
    //   window.location.href = "https://www.example.com";
    // });
  }  
};
