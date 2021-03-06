"use strict";
import chalk from "chalk";
import * as _ from "lodash";
import * as Path from "path";

export interface SharkOptions {
  parser: {
    language: string;
  };
  compiler: {
    file: {
      name: string;
      format: string;
    };
  };
  log: {
    level: string;
    silent: boolean;
  };
  project: {
    name: string;
    url: {
      home: string;
      repo: string;
    };
  };
  cshark?: {
    source: string;
    output: string;
    cwd: string;
    watch: boolean;
    include?: string[];
    exclude?: string[];
  };
}

export function options(option = {}): SharkOptions {
  return _.assign(
    {
      parser: {
        language: "javascript",
      },
      compiler: {
        file: {
          name: "docs",
          format: "html",
        },
      },
      log: {
        level: "info, warn",
        silent: false,
      },
      project: {
        name: "#",
        url: {
          home: "#",
          repo: "#",
        },
      },
      cshark: {
        source: "src/",
        output: "doc/",
        cwd: process.cwd(),
        watch: false,
        include: [],
        exclude: [],
      },
    },
    option
  );
}

export function assign(opt: any) {
  return {
    cshark: {
      source: opt.source || opt.s,
      output: opt.output || opt.o,
      cwd: opt.cwd,
      watch: opt.watch || opt.w,
    },
    compiler: {
      file: {
        name: opt.formatName,
        format: opt.format,
      },
    },
    parser: {
      language: opt.parserLang,
      version: opt.parserVersion,
    },
    include: [],
    exclude: [],
  };
}

export function cli() {
  return {
    version: {
      alias: "v",
      type: "boolean",
      describe: chalk.gray("Print the global version."),
    },
    mrcshark: {
      type: "string",
      default: Path.join(process.cwd(), ".cshark"),
      describe: chalk.gray(
        `Set the path to .cshark.
        This will set the cwd to the rc's directory as well.`
      ),
    },
    cwd: {
      type: "string",
      default: Path.normalize(process.cwd()),
      describe: chalk.gray("Set the cwd."),
    },
    source: {
      alias: "s",
      type: "string",
      describe: chalk.gray(
        "Set the source directory(-ies). Note: Glob notation is allowed."
      ),
    },
    output: {
      alias: "o",
      type: "string",
      default: Path.join(process.cwd(), "docs/"),
      describe: chalk.gray("Set the output directory."),
    },
    format: {
      alias: "f",
      type: "string",
      default: options().compiler.file.format,
      describe: chalk.gray("Set the output format. Formats: html, json, md."),
    },
    "format-name": {
      type: "string",
      default: options().compiler.file.name,
      describe: chalk.gray(
        "Set the output name. Note: Only in json and md format."
      ),
    },
    "parser-lang": {
      type: "string",
      default: options().parser.language,
      describe: chalk.gray(
        "Set the language of the sources. Note: This is automatically detected."
      ),
    },
    "project-name": {
      type: "string",
      default: options().project.name,
      describe: chalk.gray("Set the project name."),
    },
    "project-homepage": {
      type: "string",
      default: options().project.url.home,
      describe: chalk.gray("Set the project homepage url."),
    },
    "project-repo": {
      type: "string",
      default: options().project.url.repo,
      describe: chalk.gray("Set the project url."),
    },
    log: {
      alias: "l",
      type: "string",
      describe: chalk.gray(
        `Set the log level. Levels: ${[
          chalk.green("debug"),
          chalk.blue("info"),
          chalk.yellow("warn"),
          chalk.red("error"),
          chalk.gray("silent"),
        ].join(", ")}`
      ),
      required: false,
      default: options().log.level,
    },
    watch: {
      alias: "w",
      type: "boolean",
      default: false,
      describe: chalk.gray("Allow changes and additions to be watched."),
    },
  };
}

export function merge(opt: any, normalize?: boolean) {
  return _.merge(options(), normalize ? assign(opt) : opt);
}

export default {
  options,
  assign,
  merge,
  cli,
};
