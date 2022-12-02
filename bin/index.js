#! /usr/bin/env node

const { exec } = require("child_process");
const chalk = require("chalk");
const { argv } = require("process");
const prompt = require('prompt-sync')();

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

    let repoName = `astonish-${template}`;

    if (typescript) {
        repoName += "-typescript";
    }

    repoName += "-template";


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

    let repoLink = `https://github.com/fayez-nazzal/${repoName}.git`;

    log(chalk.blue(`Template repo: ${repoLink}\r\n`));

    const argsWithoutFlags = process.argv.slice(1).filter((arg) => arg.match(/(\-\-)|[\/\\]/) === null);
    
    const projectName = argsWithoutFlags[argsWithoutFlags.length - 1] ?? prompt('Enter project name: ');
    
    repoLink += ` ${projectName}`;

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
