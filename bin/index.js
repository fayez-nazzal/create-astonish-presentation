#! /usr/bin/env node

const { exec } = require("child_process");
const chalk = require("chalk");

const log = console.log;

// check if `git` is installed
exec("git --version", (err) => {
    if (err) {
        log(chalk.red("Please install git"));
        process.exit(1);
    }

    // find the --template flag
    const template = process.argv.includes("--template")
        ? process.argv[process.argv.indexOf("--template") + 1]
        : "starter";

    // find the --yarn flag
    const yarn = process.argv.includes("--yarn");

    // find the --typescript flag
    const typescript = process.argv.includes("--typescript");

    // get the first arg
    const projectName = process.argv[2];

    if (
        !projectName ||
        !projectName.trim() ||
        projectName.match(/[^a-zA-Z0-9-_]/)
    ) {
        log(chalk.red("Please provide a project name\r\n"));
        process.exit(1);
    }

    let repoName = `astonish-${template}`;

    if (typescript) {
        repoName += "-typescript";
    }

    repoName += "-template";

    const repoLink = `https://github.com/fayez-nazzal/${repoName}.git ${projectName}`;

    log("\r\n");

    log(
        chalk.green("⯁ ") +
            chalk.blue.bold("A") +
            chalk.red.bold("s") +
            chalk.yellow.bold("t") +
            chalk.blue.bold("o") +
            chalk.green.bold("n") +
            chalk.red.bold("i") +
            chalk.yellow.bold("s") +
            chalk.blue.bold("h") +
            chalk.green.bold("!") +
            chalk.blue.bold("\r\n")
    );

    log(chalk.blue(`Template repo: ${repoLink}\r\n`));

    // clone the template repo
    log(chalk.blue("Cloning the template repo...\r\n"));

    exec(`git clone ${repoLink}`, () => {
        // install dependencies
        log(
            chalk.blue(`Running `) +
                chalk.yellow(`${yarn ? "yarn" : "npm"} install`) +
                chalk.blue(`...\r\n`)
        );

        log(chalk.cyan("Please be patient...\r\n"));

        const installProcess = exec(
            yarn ? "yarn install" : "npm install",
            { cwd: projectName },
            (err) => {
                if (err) {
                    log(
                        chalk.red(
                            `Please install ${yarn ? "yarn" : "npm"} \r\n`
                        )
                    );
                    process.exit(1);
                }

                log(chalk.green("Done!\r\n"));
                log(
                    chalk.green(`Your project is ready at `) +
                        chalk.yellow(`"${projectName}"\r\n`)
                );
            }
        );
    });
});
