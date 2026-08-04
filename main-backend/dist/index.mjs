var __getOwnPropNames = Object.getOwnPropertyNames;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/router/user.ts
import { Router } from "express";
var userRouter;
var init_user = __esm({
  "src/router/user.ts"() {
    "use strict";
    userRouter = Router();
  }
});

// node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/dotenv/lib/main.js"(exports, module) {
    "use strict";
    var fs = __require("fs");
    var path2 = __require("path");
    var os = __require("os");
    var crypto2 = __require("crypto");
    var TIPS = [
      "\u25C8 encrypted .env [www.dotenvx.com]",
      "\u25C8 secrets for agents [www.dotenvx.com]",
      "\u2301 auth for agents [www.vestauth.com]",
      "\u2318 custom filepath { path: '/custom/path/.env' }",
      "\u2318 enable debugging { debug: true }",
      "\u2318 override existing { override: true }",
      "\u2318 suppress logs { quiet: true }",
      "\u2318 multiple files { path: ['.env.local', '.env'] }"
    ];
    function _getRandomTip() {
      return TIPS[Math.floor(Math.random() * TIPS.length)];
    }
    function parseBoolean(value) {
      if (typeof value === "string") {
        return !["false", "0", "no", "off", ""].includes(value.toLowerCase());
      }
      return Boolean(value);
    }
    function supportsAnsi() {
      return process.stdout.isTTY;
    }
    function dim(text) {
      return supportsAnsi() ? `\x1B[2m${text}\x1B[0m` : text;
    }
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    function _parseVault(options) {
      options = options || {};
      const vaultPath = _vaultPath(options);
      options.path = vaultPath;
      const result = DotenvModule.configDotenv(options);
      if (!result.parsed) {
        const err = new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`);
        err.code = "MISSING_DATA";
        throw err;
      }
      const keys = _dotenvKey(options).split(",");
      const length = keys.length;
      let decrypted;
      for (let i = 0; i < length; i++) {
        try {
          const key = keys[i].trim();
          const attrs = _instructions(result, key);
          decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);
          break;
        } catch (error) {
          if (i + 1 >= length) {
            throw error;
          }
        }
      }
      return DotenvModule.parse(decrypted);
    }
    function _warn(message) {
      console.error(`\u26A0 ${message}`);
    }
    function _debug(message) {
      console.log(`\u2506 ${message}`);
    }
    function _log(message) {
      console.log(`\u25C7 ${message}`);
    }
    function _dotenvKey(options) {
      if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
        return options.DOTENV_KEY;
      }
      if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
        return process.env.DOTENV_KEY;
      }
      return "";
    }
    function _instructions(result, dotenvKey) {
      let uri;
      try {
        uri = new URL(dotenvKey);
      } catch (error) {
        if (error.code === "ERR_INVALID_URL") {
          const err = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        }
        throw error;
      }
      const key = uri.password;
      if (!key) {
        const err = new Error("INVALID_DOTENV_KEY: Missing key part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environment = uri.searchParams.get("environment");
      if (!environment) {
        const err = new Error("INVALID_DOTENV_KEY: Missing environment part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`;
      const ciphertext = result.parsed[environmentKey];
      if (!ciphertext) {
        const err = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`);
        err.code = "NOT_FOUND_DOTENV_ENVIRONMENT";
        throw err;
      }
      return { ciphertext, key };
    }
    function _vaultPath(options) {
      let possibleVaultPath = null;
      if (options && options.path && options.path.length > 0) {
        if (Array.isArray(options.path)) {
          for (const filepath of options.path) {
            if (fs.existsSync(filepath)) {
              possibleVaultPath = filepath.endsWith(".vault") ? filepath : `${filepath}.vault`;
            }
          }
        } else {
          possibleVaultPath = options.path.endsWith(".vault") ? options.path : `${options.path}.vault`;
        }
      } else {
        possibleVaultPath = path2.resolve(process.cwd(), ".env.vault");
      }
      if (fs.existsSync(possibleVaultPath)) {
        return possibleVaultPath;
      }
      return null;
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path2.join(os.homedir(), envPath.slice(1)) : envPath;
    }
    function _configVault(options) {
      const debug = parseBoolean(process.env.DOTENV_CONFIG_DEBUG || options && options.debug);
      const quiet = parseBoolean(process.env.DOTENV_CONFIG_QUIET || options && options.quiet);
      if (debug || !quiet) {
        _log("loading env from encrypted .env.vault");
      }
      const parsed = DotenvModule._parseVault(options);
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsed, options);
      return { parsed };
    }
    function configDotenv(options) {
      const dotenvPath = path2.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      let debug = parseBoolean(processEnv.DOTENV_CONFIG_DEBUG || options && options.debug);
      let quiet = parseBoolean(processEnv.DOTENV_CONFIG_QUIET || options && options.quiet);
      if (options && options.encoding) {
        encoding = options.encoding;
      } else {
        if (debug) {
          _debug("no encoding is specified (UTF-8 is used by default)");
        }
      }
      let optionPaths = [dotenvPath];
      if (options && options.path) {
        if (!Array.isArray(options.path)) {
          optionPaths = [_resolveHome(options.path)];
        } else {
          optionPaths = [];
          for (const filepath of options.path) {
            optionPaths.push(_resolveHome(filepath));
          }
        }
      }
      let lastError;
      const parsedAll = {};
      for (const path3 of optionPaths) {
        try {
          const parsed = DotenvModule.parse(fs.readFileSync(path3, { encoding }));
          DotenvModule.populate(parsedAll, parsed, options);
        } catch (e) {
          if (debug) {
            _debug(`failed to load ${path3} ${e.message}`);
          }
          lastError = e;
        }
      }
      const populated = DotenvModule.populate(processEnv, parsedAll, options);
      debug = parseBoolean(processEnv.DOTENV_CONFIG_DEBUG || debug);
      quiet = parseBoolean(processEnv.DOTENV_CONFIG_QUIET || quiet);
      if (debug || !quiet) {
        const keysCount = Object.keys(populated).length;
        const shortPaths = [];
        for (const filePath of optionPaths) {
          try {
            const relative = path2.relative(process.cwd(), filePath);
            shortPaths.push(relative);
          } catch (e) {
            if (debug) {
              _debug(`failed to load ${filePath} ${e.message}`);
            }
            lastError = e;
          }
        }
        _log(`injected env (${keysCount}) from ${shortPaths.join(",")} ${dim(`// tip: ${_getRandomTip()}`)}`);
      }
      if (lastError) {
        return { parsed: parsedAll, error: lastError };
      } else {
        return { parsed: parsedAll };
      }
    }
    function config2(options) {
      if (_dotenvKey(options).length === 0) {
        return DotenvModule.configDotenv(options);
      }
      const vaultPath = _vaultPath(options);
      if (!vaultPath) {
        _warn(`you set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}`);
        return DotenvModule.configDotenv(options);
      }
      return DotenvModule._configVault(options);
    }
    function decrypt(encrypted, keyStr) {
      const key = Buffer.from(keyStr.slice(-64), "hex");
      let ciphertext = Buffer.from(encrypted, "base64");
      const nonce = ciphertext.subarray(0, 12);
      const authTag = ciphertext.subarray(-16);
      ciphertext = ciphertext.subarray(12, -16);
      try {
        const aesgcm = crypto2.createDecipheriv("aes-256-gcm", key, nonce);
        aesgcm.setAuthTag(authTag);
        return `${aesgcm.update(ciphertext)}${aesgcm.final()}`;
      } catch (error) {
        const isRange = error instanceof RangeError;
        const invalidKeyLength = error.message === "Invalid key length";
        const decryptionFailed = error.message === "Unsupported state or unable to authenticate data";
        if (isRange || invalidKeyLength) {
          const err = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        } else if (decryptionFailed) {
          const err = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
          err.code = "DECRYPTION_FAILED";
          throw err;
        } else {
          throw error;
        }
      }
    }
    function populate(processEnv, parsed, options = {}) {
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      const populated = {};
      if (typeof parsed !== "object") {
        const err = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
        err.code = "OBJECT_REQUIRED";
        throw err;
      }
      for (const key of Object.keys(parsed)) {
        if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
          if (override === true) {
            processEnv[key] = parsed[key];
            populated[key] = parsed[key];
          }
          if (debug) {
            if (override === true) {
              _debug(`"${key}" is already defined and WAS overwritten`);
            } else {
              _debug(`"${key}" is already defined and was NOT overwritten`);
            }
          }
        } else {
          processEnv[key] = parsed[key];
          populated[key] = parsed[key];
        }
      }
      return populated;
    }
    var DotenvModule = {
      configDotenv,
      _configVault,
      _parseVault,
      config: config2,
      decrypt,
      parse,
      populate
    };
    module.exports.configDotenv = DotenvModule.configDotenv;
    module.exports._configVault = DotenvModule._configVault;
    module.exports._parseVault = DotenvModule._parseVault;
    module.exports.config = DotenvModule.config;
    module.exports.decrypt = DotenvModule.decrypt;
    module.exports.parse = DotenvModule.parse;
    module.exports.populate = DotenvModule.populate;
    module.exports = DotenvModule;
  }
});

// node_modules/dotenv/lib/env-options.js
var require_env_options = __commonJS({
  "node_modules/dotenv/lib/env-options.js"(exports, module) {
    "use strict";
    var options = {};
    if (process.env.DOTENV_CONFIG_ENCODING != null) {
      options.encoding = process.env.DOTENV_CONFIG_ENCODING;
    }
    if (process.env.DOTENV_CONFIG_PATH != null) {
      options.path = process.env.DOTENV_CONFIG_PATH;
    }
    if (process.env.DOTENV_CONFIG_QUIET != null) {
      options.quiet = process.env.DOTENV_CONFIG_QUIET;
    }
    if (process.env.DOTENV_CONFIG_DEBUG != null) {
      options.debug = process.env.DOTENV_CONFIG_DEBUG;
    }
    if (process.env.DOTENV_CONFIG_OVERRIDE != null) {
      options.override = process.env.DOTENV_CONFIG_OVERRIDE;
    }
    if (process.env.DOTENV_CONFIG_DOTENV_KEY != null) {
      options.DOTENV_KEY = process.env.DOTENV_CONFIG_DOTENV_KEY;
    }
    module.exports = options;
  }
});

// node_modules/dotenv/lib/cli-options.js
var require_cli_options = __commonJS({
  "node_modules/dotenv/lib/cli-options.js"(exports, module) {
    "use strict";
    var re = /^dotenv_config_(encoding|path|quiet|debug|override|DOTENV_KEY)=(.+)$/;
    module.exports = function optionMatcher(args) {
      const options = args.reduce(function(acc, cur) {
        const matches = cur.match(re);
        if (matches) {
          acc[matches[1]] = matches[2];
        }
        return acc;
      }, {});
      if (!("quiet" in options)) {
        options.quiet = "true";
      }
      return options;
    };
  }
});

// node_modules/dotenv/config.js
var init_config = __esm({
  "node_modules/dotenv/config.js"() {
    "use strict";
    (function() {
      require_main().config(
        Object.assign(
          {},
          require_env_options(),
          require_cli_options()(process.argv)
        )
      );
    })();
  }
});

// src/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}
var config;
var init_class = __esm({
  "src/generated/prisma/internal/class.ts"() {
    "use strict";
    config = {
      "previewFeatures": [],
      "clientVersion": "7.8.0",
      "engineVersion": "3c6e192761c0362d496ed980de936e2f3cebcd3a",
      "activeProvider": "postgresql",
      "inlineSchema": '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../src/generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel User {\n  id String @id @default(cuid())\n\n  name  String\n  email String @unique\n\n  passwordHash String?\n\n  emailVerified Boolean @default(false)\n  image         String?\n\n  workflows   Workflow[]\n  credentials Credential[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Credential {\n  id String @id @default(cuid())\n\n  name String\n  type String\n\n  value Json\n\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  nodes Node[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Workflow {\n  id String @id @default(cuid())\n\n  name String @default("unnamed-workflow")\n\n  runs Int @default(0)\n\n  status WorkflowStatus @default(DRAFT)\n\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  nodes       Node[]\n  connections Connection[]\n  executions  Execution[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Node {\n  id String @id\n\n  workflowId String\n  workflow   Workflow @relation(fields: [workflowId], references: [id], onDelete: Cascade)\n\n  name String\n\n  type String\n\n  position Json\n\n  data Json @default("{}")\n\n  credentialId String?\n  credential   Credential? @relation(fields: [credentialId], references: [id], onDelete: SetNull)\n\n  outputConnections Connection[] @relation("FromNode")\n  inputConnections  Connection[] @relation("ToNode")\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Connection {\n  id String @id @default(cuid())\n\n  workflowId String\n  workflow   Workflow @relation(fields: [workflowId], references: [id], onDelete: Cascade)\n\n  fromNodeId String\n  fromNode   Node   @relation("FromNode", fields: [fromNodeId], references: [id], onDelete: Cascade)\n\n  toNodeId String\n  toNode   Node   @relation("ToNode", fields: [toNodeId], references: [id], onDelete: Cascade)\n\n  fromOutput String @default("main")\n  toInput    String @default("main")\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@unique([fromNodeId, toNodeId, fromOutput, toInput])\n}\n\nmodel Execution {\n  id String @id @default(cuid())\n\n  workflowId String\n  workflow   Workflow @relation(fields: [workflowId], references: [id], onDelete: Cascade)\n\n  status ExecutionStatus @default(RUNNING)\n\n  startedAt   DateTime  @default(now())\n  completedAt DateTime?\n\n  input  Json?\n  output Json?\n  error  String? @db.Text\n}\n\nenum WorkflowStatus {\n  ACTIVE\n  PAUSED\n  DRAFT\n}\n\nenum ExecutionStatus {\n  RUNNING\n  SUCCESS\n  FAILED\n}\n',
      "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
      },
      "parameterizationSchema": {
        "strings": [],
        "graph": ""
      }
    };
    config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"passwordHash","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"workflows","kind":"object","type":"Workflow","relationName":"UserToWorkflow"},{"name":"credentials","kind":"object","type":"Credential","relationName":"CredentialToUser"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Credential":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"type","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"Json"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"CredentialToUser"},{"name":"nodes","kind":"object","type":"Node","relationName":"CredentialToNode"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Workflow":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"runs","kind":"scalar","type":"Int"},{"name":"status","kind":"enum","type":"WorkflowStatus"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"UserToWorkflow"},{"name":"nodes","kind":"object","type":"Node","relationName":"NodeToWorkflow"},{"name":"connections","kind":"object","type":"Connection","relationName":"ConnectionToWorkflow"},{"name":"executions","kind":"object","type":"Execution","relationName":"ExecutionToWorkflow"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Node":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"workflowId","kind":"scalar","type":"String"},{"name":"workflow","kind":"object","type":"Workflow","relationName":"NodeToWorkflow"},{"name":"name","kind":"scalar","type":"String"},{"name":"type","kind":"scalar","type":"String"},{"name":"position","kind":"scalar","type":"Json"},{"name":"data","kind":"scalar","type":"Json"},{"name":"credentialId","kind":"scalar","type":"String"},{"name":"credential","kind":"object","type":"Credential","relationName":"CredentialToNode"},{"name":"outputConnections","kind":"object","type":"Connection","relationName":"FromNode"},{"name":"inputConnections","kind":"object","type":"Connection","relationName":"ToNode"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Connection":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"workflowId","kind":"scalar","type":"String"},{"name":"workflow","kind":"object","type":"Workflow","relationName":"ConnectionToWorkflow"},{"name":"fromNodeId","kind":"scalar","type":"String"},{"name":"fromNode","kind":"object","type":"Node","relationName":"FromNode"},{"name":"toNodeId","kind":"scalar","type":"String"},{"name":"toNode","kind":"object","type":"Node","relationName":"ToNode"},{"name":"fromOutput","kind":"scalar","type":"String"},{"name":"toInput","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Execution":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"workflowId","kind":"scalar","type":"String"},{"name":"workflow","kind":"object","type":"Workflow","relationName":"ExecutionToWorkflow"},{"name":"status","kind":"enum","type":"ExecutionStatus"},{"name":"startedAt","kind":"scalar","type":"DateTime"},{"name":"completedAt","kind":"scalar","type":"DateTime"},{"name":"input","kind":"scalar","type":"Json"},{"name":"output","kind":"scalar","type":"Json"},{"name":"error","kind":"scalar","type":"String"}],"dbName":null}},"enums":{},"types":{}}');
    config.parameterizationSchema = {
      strings: JSON.parse('["where","orderBy","cursor","user","workflow","nodes","_count","credential","fromNode","toNode","outputConnections","inputConnections","connections","executions","workflows","credentials","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","data","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","create","update","User.upsertOne","User.deleteOne","User.deleteMany","having","_min","_max","User.groupBy","User.aggregate","Credential.findUnique","Credential.findUniqueOrThrow","Credential.findFirst","Credential.findFirstOrThrow","Credential.findMany","Credential.createOne","Credential.createMany","Credential.createManyAndReturn","Credential.updateOne","Credential.updateMany","Credential.updateManyAndReturn","Credential.upsertOne","Credential.deleteOne","Credential.deleteMany","Credential.groupBy","Credential.aggregate","Workflow.findUnique","Workflow.findUniqueOrThrow","Workflow.findFirst","Workflow.findFirstOrThrow","Workflow.findMany","Workflow.createOne","Workflow.createMany","Workflow.createManyAndReturn","Workflow.updateOne","Workflow.updateMany","Workflow.updateManyAndReturn","Workflow.upsertOne","Workflow.deleteOne","Workflow.deleteMany","_avg","_sum","Workflow.groupBy","Workflow.aggregate","Node.findUnique","Node.findUniqueOrThrow","Node.findFirst","Node.findFirstOrThrow","Node.findMany","Node.createOne","Node.createMany","Node.createManyAndReturn","Node.updateOne","Node.updateMany","Node.updateManyAndReturn","Node.upsertOne","Node.deleteOne","Node.deleteMany","Node.groupBy","Node.aggregate","Connection.findUnique","Connection.findUniqueOrThrow","Connection.findFirst","Connection.findFirstOrThrow","Connection.findMany","Connection.createOne","Connection.createMany","Connection.createManyAndReturn","Connection.updateOne","Connection.updateMany","Connection.updateManyAndReturn","Connection.upsertOne","Connection.deleteOne","Connection.deleteMany","Connection.groupBy","Connection.aggregate","Execution.findUnique","Execution.findUniqueOrThrow","Execution.findFirst","Execution.findFirstOrThrow","Execution.findMany","Execution.createOne","Execution.createMany","Execution.createManyAndReturn","Execution.updateOne","Execution.updateMany","Execution.updateManyAndReturn","Execution.upsertOne","Execution.deleteOne","Execution.deleteMany","Execution.groupBy","Execution.aggregate","AND","OR","NOT","id","workflowId","ExecutionStatus","status","startedAt","completedAt","input","output","error","equals","in","notIn","lt","lte","gt","gte","contains","startsWith","endsWith","not","string_contains","string_starts_with","string_ends_with","array_starts_with","array_ends_with","array_contains","fromNodeId","toNodeId","fromOutput","toInput","createdAt","updatedAt","name","type","position","credentialId","runs","WorkflowStatus","userId","value","email","passwordHash","emailVerified","image","every","some","none","fromNodeId_toNodeId_fromOutput_toInput","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","increment","decrement","multiply","divide"]'),
      graph: "tAM3YA0OAADTAQAgDwAA1AEAIHgAAM4BADB5AAAkABB6AADOAQAwewEAAAABmQFAANIBACGaAUAA0gEAIZsBAQDPAQAhowEBAAAAAaQBAQDQAQAhpQEgANEBACGmAQEA0AEAIQEAAAABACAOAwAA1wEAIAUAANgBACAMAADjAQAgDQAA5wEAIHgAAOQBADB5AAADABB6AADkAQAwewEAzwEAIX4AAOYBoQEimQFAANIBACGaAUAA0gEAIZsBAQDPAQAhnwECAOUBACGhAQEAzwEAIQQDAAD-AgAgBQAA_wIAIAwAAIMDACANAACEAwAgDgMAANcBACAFAADYAQAgDAAA4wEAIA0AAOcBACB4AADkAQAweQAAAwAQegAA5AEAMHsBAAAAAX4AAOYBoQEimQFAANIBACGaAUAA0gEAIZsBAQDPAQAhnwECAOUBACGhAQEAzwEAIQMAAAADACABAAAEADACAAAFACAQBAAA3QEAIAcAAOIBACAKAADjAQAgCwAA4wEAIBUAANYBACB4AADhAQAweQAABwAQegAA4QEAMHsBAM8BACF8AQDPAQAhmQFAANIBACGaAUAA0gEAIZsBAQDPAQAhnAEBAM8BACGdAQAA1gEAIJ4BAQDQAQAhBQQAAIADACAHAACCAwAgCgAAgwMAIAsAAIMDACCeAQAA6AEAIBAEAADdAQAgBwAA4gEAIAoAAOMBACALAADjAQAgFQAA1gEAIHgAAOEBADB5AAAHABB6AADhAQAwewEAAAABfAEAzwEAIZkBQADSAQAhmgFAANIBACGbAQEAzwEAIZwBAQDPAQAhnQEAANYBACCeAQEA0AEAIQMAAAAHACABAAAIADACAAAJACAMAwAA1wEAIAUAANgBACB4AADVAQAweQAACwAQegAA1QEAMHsBAM8BACGZAUAA0gEAIZoBQADSAQAhmwEBAM8BACGcAQEAzwEAIaEBAQDPAQAhogEAANYBACABAAAACwAgAwAAAAcAIAEAAAgAMAIAAAkAIAEAAAAHACAOBAAA3QEAIAgAAOABACAJAADgAQAgeAAA3wEAMHkAAA8AEHoAAN8BADB7AQDPAQAhfAEAzwEAIZUBAQDPAQAhlgEBAM8BACGXAQEAzwEAIZgBAQDPAQAhmQFAANIBACGaAUAA0gEAIQMEAACAAwAgCAAAgQMAIAkAAIEDACAPBAAA3QEAIAgAAOABACAJAADgAQAgeAAA3wEAMHkAAA8AEHoAAN8BADB7AQAAAAF8AQDPAQAhlQEBAM8BACGWAQEAzwEAIZcBAQDPAQAhmAEBAM8BACGZAUAA0gEAIZoBQADSAQAhqgEAAN4BACADAAAADwAgAQAAEAAwAgAAEQAgAwAAAA8AIAEAABAAMAIAABEAIAEAAAAPACABAAAADwAgAwAAAA8AIAEAABAAMAIAABEAIAwEAADdAQAgeAAA2QEAMHkAABcAEHoAANkBADB7AQDPAQAhfAEAzwEAIX4AANoBfiJ_QADSAQAhgAFAANsBACGBAQAA3AEAIIIBAADcAQAggwEBANABACEFBAAAgAMAIIABAADoAQAggQEAAOgBACCCAQAA6AEAIIMBAADoAQAgDAQAAN0BACB4AADZAQAweQAAFwAQegAA2QEAMHsBAAAAAXwBAM8BACF-AADaAX4if0AA0gEAIYABQADbAQAhgQEAANwBACCCAQAA3AEAIIMBAQDQAQAhAwAAABcAIAEAABgAMAIAABkAIAEAAAAHACABAAAADwAgAQAAABcAIAIDAAD-AgAgBQAA_wIAIAwDAADXAQAgBQAA2AEAIHgAANUBADB5AAALABB6AADVAQAwewEAAAABmQFAANIBACGaAUAA0gEAIZsBAQDPAQAhnAEBAM8BACGhAQEAzwEAIaIBAADWAQAgAwAAAAsAIAEAAB4AMAIAAB8AIAEAAAADACABAAAACwAgAQAAAAEAIA0OAADTAQAgDwAA1AEAIHgAAM4BADB5AAAkABB6AADOAQAwewEAzwEAIZkBQADSAQAhmgFAANIBACGbAQEAzwEAIaMBAQDPAQAhpAEBANABACGlASAA0QEAIaYBAQDQAQAhBA4AAPwCACAPAAD9AgAgpAEAAOgBACCmAQAA6AEAIAMAAAAkACABAAAlADACAAABACADAAAAJAAgAQAAJQAwAgAAAQAgAwAAACQAIAEAACUAMAIAAAEAIAoOAAD6AgAgDwAA-wIAIHsBAAAAAZkBQAAAAAGaAUAAAAABmwEBAAAAAaMBAQAAAAGkAQEAAAABpQEgAAAAAaYBAQAAAAEBFQAAKQAgCHsBAAAAAZkBQAAAAAGaAUAAAAABmwEBAAAAAaMBAQAAAAGkAQEAAAABpQEgAAAAAaYBAQAAAAEBFQAAKwAwARUAACsAMAoOAADgAgAgDwAA4QIAIHsBAOwBACGZAUAA7gEAIZoBQADuAQAhmwEBAOwBACGjAQEA7AEAIaQBAQDwAQAhpQEgAN8CACGmAQEA8AEAIQIAAAABACAVAAAuACAIewEA7AEAIZkBQADuAQAhmgFAAO4BACGbAQEA7AEAIaMBAQDsAQAhpAEBAPABACGlASAA3wIAIaYBAQDwAQAhAgAAACQAIBUAADAAIAIAAAAkACAVAAAwACADAAAAAQAgHAAAKQAgHQAALgAgAQAAAAEAIAEAAAAkACAFBgAA3AIAICIAAN4CACAjAADdAgAgpAEAAOgBACCmAQAA6AEAIAt4AADKAQAweQAANwAQegAAygEAMHsBAKsBACGZAUAArQEAIZoBQACtAQAhmwEBAKsBACGjAQEAqwEAIaQBAQCwAQAhpQEgAMsBACGmAQEAsAEAIQMAAAAkACABAAA2ADAhAAA3ACADAAAAJAAgAQAAJQAwAgAAAQAgAQAAAB8AIAEAAAAfACADAAAACwAgAQAAHgAwAgAAHwAgAwAAAAsAIAEAAB4AMAIAAB8AIAMAAAALACABAAAeADACAAAfACAJAwAA2gIAIAUAANsCACB7AQAAAAGZAUAAAAABmgFAAAAAAZsBAQAAAAGcAQEAAAABoQEBAAAAAaIBgAAAAAEBFQAAPwAgB3sBAAAAAZkBQAAAAAGaAUAAAAABmwEBAAAAAZwBAQAAAAGhAQEAAAABogGAAAAAAQEVAABBADABFQAAQQAwCQMAAM8CACAFAADQAgAgewEA7AEAIZkBQADuAQAhmgFAAO4BACGbAQEA7AEAIZwBAQDsAQAhoQEBAOwBACGiAYAAAAABAgAAAB8AIBUAAEQAIAd7AQDsAQAhmQFAAO4BACGaAUAA7gEAIZsBAQDsAQAhnAEBAOwBACGhAQEA7AEAIaIBgAAAAAECAAAACwAgFQAARgAgAgAAAAsAIBUAAEYAIAMAAAAfACAcAAA_ACAdAABEACABAAAAHwAgAQAAAAsAIAMGAADMAgAgIgAAzgIAICMAAM0CACAKeAAAyQEAMHkAAE0AEHoAAMkBADB7AQCrAQAhmQFAAK0BACGaAUAArQEAIZsBAQCrAQAhnAEBAKsBACGhAQEAqwEAIaIBAADAAQAgAwAAAAsAIAEAAEwAMCEAAE0AIAMAAAALACABAAAeADACAAAfACABAAAABQAgAQAAAAUAIAMAAAADACABAAAEADACAAAFACADAAAAAwAgAQAABAAwAgAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIAsDAADIAgAgBQAAyQIAIAwAAMoCACANAADLAgAgewEAAAABfgAAAKEBApkBQAAAAAGaAUAAAAABmwEBAAAAAZ8BAgAAAAGhAQEAAAABARUAAFUAIAd7AQAAAAF-AAAAoQECmQFAAAAAAZoBQAAAAAGbAQEAAAABnwECAAAAAaEBAQAAAAEBFQAAVwAwARUAAFcAMAsDAACjAgAgBQAApAIAIAwAAKUCACANAACmAgAgewEA7AEAIX4AAKICoQEimQFAAO4BACGaAUAA7gEAIZsBAQDsAQAhnwECAKECACGhAQEA7AEAIQIAAAAFACAVAABaACAHewEA7AEAIX4AAKICoQEimQFAAO4BACGaAUAA7gEAIZsBAQDsAQAhnwECAKECACGhAQEA7AEAIQIAAAADACAVAABcACACAAAAAwAgFQAAXAAgAwAAAAUAIBwAAFUAIB0AAFoAIAEAAAAFACABAAAAAwAgBQYAAJwCACAiAACfAgAgIwAAngIAIEQAAJ0CACBFAACgAgAgCngAAMIBADB5AABjABB6AADCAQAwewEAqwEAIX4AAMQBoQEimQFAAK0BACGaAUAArQEAIZsBAQCrAQAhnwECAMMBACGhAQEAqwEAIQMAAAADACABAABiADAhAABjACADAAAAAwAgAQAABAAwAgAABQAgAQAAAAkAIAEAAAAJACADAAAABwAgAQAACAAwAgAACQAgAwAAAAcAIAEAAAgAMAIAAAkAIAMAAAAHACABAAAIADACAAAJACANBAAAmAIAIAcAAJkCACAKAACaAgAgCwAAmwIAIBWAAAAAAXsBAAAAAXwBAAAAAZkBQAAAAAGaAUAAAAABmwEBAAAAAZwBAQAAAAGdAYAAAAABngEBAAAAAQEVAABrACAJFYAAAAABewEAAAABfAEAAAABmQFAAAAAAZoBQAAAAAGbAQEAAAABnAEBAAAAAZ0BgAAAAAGeAQEAAAABARUAAG0AMAEVAABtADABAAAACwAgDQQAAP8BACAHAACAAgAgCgAAgQIAIAsAAIICACAVgAAAAAF7AQDsAQAhfAEA7AEAIZkBQADuAQAhmgFAAO4BACGbAQEA7AEAIZwBAQDsAQAhnQGAAAAAAZ4BAQDwAQAhAgAAAAkAIBUAAHEAIAkVgAAAAAF7AQDsAQAhfAEA7AEAIZkBQADuAQAhmgFAAO4BACGbAQEA7AEAIZwBAQDsAQAhnQGAAAAAAZ4BAQDwAQAhAgAAAAcAIBUAAHMAIAIAAAAHACAVAABzACABAAAACwAgAwAAAAkAIBwAAGsAIB0AAHEAIAEAAAAJACABAAAABwAgBAYAAPwBACAiAAD-AQAgIwAA_QEAIJ4BAADoAQAgDBUAAMABACB4AAC_AQAweQAAewAQegAAvwEAMHsBAKsBACF8AQCrAQAhmQFAAK0BACGaAUAArQEAIZsBAQCrAQAhnAEBAKsBACGdAQAAwAEAIJ4BAQCwAQAhAwAAAAcAIAEAAHoAMCEAAHsAIAMAAAAHACABAAAIADACAAAJACABAAAAEQAgAQAAABEAIAMAAAAPACABAAAQADACAAARACADAAAADwAgAQAAEAAwAgAAEQAgAwAAAA8AIAEAABAAMAIAABEAIAsEAAD5AQAgCAAA-gEAIAkAAPsBACB7AQAAAAF8AQAAAAGVAQEAAAABlgEBAAAAAZcBAQAAAAGYAQEAAAABmQFAAAAAAZoBQAAAAAEBFQAAgwEAIAh7AQAAAAF8AQAAAAGVAQEAAAABlgEBAAAAAZcBAQAAAAGYAQEAAAABmQFAAAAAAZoBQAAAAAEBFQAAhQEAMAEVAACFAQAwCwQAAPYBACAIAAD3AQAgCQAA-AEAIHsBAOwBACF8AQDsAQAhlQEBAOwBACGWAQEA7AEAIZcBAQDsAQAhmAEBAOwBACGZAUAA7gEAIZoBQADuAQAhAgAAABEAIBUAAIgBACAIewEA7AEAIXwBAOwBACGVAQEA7AEAIZYBAQDsAQAhlwEBAOwBACGYAQEA7AEAIZkBQADuAQAhmgFAAO4BACECAAAADwAgFQAAigEAIAIAAAAPACAVAACKAQAgAwAAABEAIBwAAIMBACAdAACIAQAgAQAAABEAIAEAAAAPACADBgAA8wEAICIAAPUBACAjAAD0AQAgC3gAAL4BADB5AACRAQAQegAAvgEAMHsBAKsBACF8AQCrAQAhlQEBAKsBACGWAQEAqwEAIZcBAQCrAQAhmAEBAKsBACGZAUAArQEAIZoBQACtAQAhAwAAAA8AIAEAAJABADAhAACRAQAgAwAAAA8AIAEAABAAMAIAABEAIAEAAAAZACABAAAAGQAgAwAAABcAIAEAABgAMAIAABkAIAMAAAAXACABAAAYADACAAAZACADAAAAFwAgAQAAGAAwAgAAGQAgCQQAAPIBACB7AQAAAAF8AQAAAAF-AAAAfgJ_QAAAAAGAAUAAAAABgQGAAAAAAYIBgAAAAAGDAQEAAAABARUAAJkBACAIewEAAAABfAEAAAABfgAAAH4Cf0AAAAABgAFAAAAAAYEBgAAAAAGCAYAAAAABgwEBAAAAAQEVAACbAQAwARUAAJsBADAJBAAA8QEAIHsBAOwBACF8AQDsAQAhfgAA7QF-In9AAO4BACGAAUAA7wEAIYEBgAAAAAGCAYAAAAABgwEBAPABACECAAAAGQAgFQAAngEAIAh7AQDsAQAhfAEA7AEAIX4AAO0BfiJ_QADuAQAhgAFAAO8BACGBAYAAAAABggGAAAAAAYMBAQDwAQAhAgAAABcAIBUAAKABACACAAAAFwAgFQAAoAEAIAMAAAAZACAcAACZAQAgHQAAngEAIAEAAAAZACABAAAAFwAgBwYAAOkBACAiAADrAQAgIwAA6gEAIIABAADoAQAggQEAAOgBACCCAQAA6AEAIIMBAADoAQAgC3gAAKoBADB5AACnAQAQegAAqgEAMHsBAKsBACF8AQCrAQAhfgAArAF-In9AAK0BACGAAUAArgEAIYEBAACvAQAgggEAAK8BACCDAQEAsAEAIQMAAAAXACABAACmAQAwIQAApwEAIAMAAAAXACABAAAYADACAAAZACALeAAAqgEAMHkAAKcBABB6AACqAQAwewEAqwEAIXwBAKsBACF-AACsAX4if0AArQEAIYABQACuAQAhgQEAAK8BACCCAQAArwEAIIMBAQCwAQAhDgYAALgBACAiAAC9AQAgIwAAvQEAIIQBAQAAAAGFAQEAAAAEhgEBAAAABIcBAQAAAAGIAQEAAAABiQEBAAAAAYoBAQAAAAGLAQEAAAABjAEBAAAAAY0BAQAAAAGOAQEAvAEAIQcGAAC4AQAgIgAAuwEAICMAALsBACCEAQAAAH4ChQEAAAB-CIYBAAAAfgiOAQAAugF-IgsGAAC4AQAgIgAAuQEAICMAALkBACCEAUAAAAABhQFAAAAABIYBQAAAAASHAUAAAAABiAFAAAAAAYkBQAAAAAGKAUAAAAABjgFAALcBACELBgAAsgEAICIAALYBACAjAAC2AQAghAFAAAAAAYUBQAAAAAWGAUAAAAAFhwFAAAAAAYgBQAAAAAGJAUAAAAABigFAAAAAAY4BQAC1AQAhDwYAALIBACAiAAC0AQAgIwAAtAEAIIQBgAAAAAGHAYAAAAABiAGAAAAAAYkBgAAAAAGKAYAAAAABjgGAAAAAAY8BAQAAAAGQAQEAAAABkQEBAAAAAZIBgAAAAAGTAYAAAAABlAGAAAAAAQ4GAACyAQAgIgAAswEAICMAALMBACCEAQEAAAABhQEBAAAABYYBAQAAAAWHAQEAAAABiAEBAAAAAYkBAQAAAAGKAQEAAAABiwEBAAAAAYwBAQAAAAGNAQEAAAABjgEBALEBACEOBgAAsgEAICIAALMBACAjAACzAQAghAEBAAAAAYUBAQAAAAWGAQEAAAAFhwEBAAAAAYgBAQAAAAGJAQEAAAABigEBAAAAAYsBAQAAAAGMAQEAAAABjQEBAAAAAY4BAQCxAQAhCIQBAgAAAAGFAQIAAAAFhgECAAAABYcBAgAAAAGIAQIAAAABiQECAAAAAYoBAgAAAAGOAQIAsgEAIQuEAQEAAAABhQEBAAAABYYBAQAAAAWHAQEAAAABiAEBAAAAAYkBAQAAAAGKAQEAAAABiwEBAAAAAYwBAQAAAAGNAQEAAAABjgEBALMBACEMhAGAAAAAAYcBgAAAAAGIAYAAAAABiQGAAAAAAYoBgAAAAAGOAYAAAAABjwEBAAAAAZABAQAAAAGRAQEAAAABkgGAAAAAAZMBgAAAAAGUAYAAAAABCwYAALIBACAiAAC2AQAgIwAAtgEAIIQBQAAAAAGFAUAAAAAFhgFAAAAABYcBQAAAAAGIAUAAAAABiQFAAAAAAYoBQAAAAAGOAUAAtQEAIQiEAUAAAAABhQFAAAAABYYBQAAAAAWHAUAAAAABiAFAAAAAAYkBQAAAAAGKAUAAAAABjgFAALYBACELBgAAuAEAICIAALkBACAjAAC5AQAghAFAAAAAAYUBQAAAAASGAUAAAAAEhwFAAAAAAYgBQAAAAAGJAUAAAAABigFAAAAAAY4BQAC3AQAhCIQBAgAAAAGFAQIAAAAEhgECAAAABIcBAgAAAAGIAQIAAAABiQECAAAAAYoBAgAAAAGOAQIAuAEAIQiEAUAAAAABhQFAAAAABIYBQAAAAASHAUAAAAABiAFAAAAAAYkBQAAAAAGKAUAAAAABjgFAALkBACEHBgAAuAEAICIAALsBACAjAAC7AQAghAEAAAB-AoUBAAAAfgiGAQAAAH4IjgEAALoBfiIEhAEAAAB-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_QADSAQAhgAFAANsBACGBAQAA3AEAIIIBAADcAQAggwEBANABACECAAAAGQAgFQAAsQIAIAIAAACvAgAgFQAAsAIAIAt4AACuAgAweQAArwIAEHoAAK4CADB7AQDPAQAhfAEAzwEAIX4AANoBfiJ_QADSAQAhgAFAANsBACGBAQAA3AEAIIIBAADcAQAggwEBANABACELeAAArgIAMHkAAK8CABB6AACuAgAwewEAzwEAIXwBAM8BACF-AADaAX4if0AA0gEAIYABQADbAQAhgQEAANwBACCCAQAA3AEAIIMBAQDQAQAhB3sBAOwBACF-AADtAX4if0AA7gEAIYABQADvAQAhgQGAAAAAAYIBgAAAAAGDAQEA8AEAIQd7AQDsAQAhfgAA7QF-In9AAO4BACGAAUAA7wEAIYEBgAAAAAGCAYAAAAABgwEBAPABACEHewEAAAABfgAAAH4Cf0AAAAABgAFAAAAAAYEBgAAAAAGCAYAAAAABgwEBAAAAAQkIAAD6AQAgCQAA-wEAIHsBAAAAAZUBAQAAAAGWAQEAAAABlwEBAAAAAZgBAQAAAAGZAUAAAAABmgFAAAAAAQIAAAARACAcAAC7AgAgAwAAABEAIBwAALsCACAdAAC6AgAgARUAAJADADACAAAAEQAgFQAAugIAIAIAAACLAgAgFQAAuQIAIAd7AQDsAQAhlQEBAOwBACGWAQEA7AEAIZcBAQDsAQAhmAEBAOwBACGZAUAA7gEAIZoBQADuAQAhCQgAAPcBACAJAAD4AQAgewEA7AEAIZUBAQDsAQAhlgEBAOwBACGXAQEA7AEAIZgBAQDsAQAhmQFAAO4BACGaAUAA7gEAIQkIAAD6AQAgCQAA-wEAIHsBAAAAAZUBAQAAAAGWAQEAAAABlwEBAAAAAZgBAQAAAAGZAUAAAAABmgFAAAAAAQsHAACZAgAgCgAAmgIAIAsAAJsCACAVgAAAAAF7AQAAAAGZAUAAAAABmgFAAAAAAZsBAQAAAAGcAQEAAAABnQGAAAAAAZ4BAQAAAAECAAAACQAgHAAAxwIAIAMAAAAJACAcAADHAgAgHQAAxgIAIAEVAACPAwAwEAQAAN0BACAHAADiAQAgCgAA4wEAIAsAAOMBACAVAADWAQAgeAAA4QEAMHkAAAcAEHoAAOEBADB7AQAAAAF8AQDPAQAhmQFAANIBACGaAUAA0gEAIZsBAQDPAQAhnAEBAM8BACGdAQAA1gEAIJ4BAQDQAQAhAgAAAAkAIBUAAMYCACACAAAAxAIAIBUAAMUCACAMFQAA1gEAIHgAAMMCADB5AADEAgAQegAAwwIAMHsBAM8BACF8AQDPAQAhmQFAANIBACGaAUAA0gEAIZsBAQDPAQAhnAEBAM8BACGdAQAA1gEAIJ4BAQDQAQAhDBUAANYBACB4AADDAgAweQAAxAIAEHoAAMMCADB7AQDPAQAhfAEAzwEAIZkBQADSAQAhmgFAANIBACGbAQEAzwEAIZwBAQDPAQAhnQEAANYBACCeAQEA0AEAIQgVgAAAAAF7AQDsAQAhmQFAAO4BACGaAUAA7gEAIZsBAQDsAQAhnAEBAOwBACGdAYAAAAABngEBAPABACELBwAAgAIAIAoAAIECACALAACCAgAgFYAAAAABewEA7AEAIZkBQADuAQAhmgFAAO4BACGbAQEA7AEAIZwBAQDsAQAhnQGAAAAAAZ4BAQDwAQAhCwcAAJkCACAKAACaAgAgCwAAmwIAIBWAAAAAAXsBAAAAAZkBQAAAAAGaAUAAAAABmwEBAAAAAZwBAQAAAAGdAYAAAAABngEBAAAAAQMcAACNAwAgrQEAAI4DACCzAQAAAQAgBBwAALwCADCtAQAAvQIAMK8BAAC_AgAgswEAAMACADAEHAAAswIAMK0BAAC0AgAwrwEAALYCACCzAQAAhwIAMAQcAACnAgAwrQEAAKgCADCvAQAAqgIAILMBAACrAgAwAAAABRwAAIcDACAdAACLAwAgrQEAAIgDACCuAQAAigMAILMBAAABACALHAAA0QIAMB0AANUCADCtAQAA0gIAMK4BAADTAgAwrwEAANQCACCwAQAAwAIAMLEBAADAAgAwsgEAAMACADCzAQAAwAIAMLQBAADWAgAwtQEAAMMCADALBAAAmAIAIAoAAJoCACALAACbAgAgFYAAAAABewEAAAABfAEAAAABmQFAAAAAAZoBQAAAAAGbAQEAAAABnAEBAAAAAZ0BgAAAAAECAAAACQAgHAAA2QIAIAMAAAAJACAcAADZAgAgHQAA2AIAIAEVAACJAwAwAgAAAAkAIBUAANgCACACAAAAxAIAIBUAANcCACAIFYAAAAABewEA7AEAIXwBAOwBACGZAUAA7gEAIZoBQADuAQAhmwEBAOwBACGcAQEA7AEAIZ0BgAAAAAELBAAA_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_AIAIA8AAP0CACCkAQAA6AEAIKYBAADoAQAgAAQDAAD-AgAgBQAA_wIAIAwAAIMDACANAACEAwAgBQQAAIADACAHAACCAwAgCgAAgwMAIAsAAIMDACCeAQAA6AEAIAIDAAD-AgAgBQAA_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_wEAIAcAAIACACAKAACBAgAgFYAAqQMAIXsBAOwBACF8AQDsAQAhmQFAAO4BACGaAUAA7gEAIZsBAQDsAQAhnAEBAOwBACGdAYAAAAABngEBAPABACEMBAAA_wEAIAcAAIACACAKAACBAgAgFYAAAAABewEA7AEAIXwBAOwBACGZAUAA7gEAIZoBQADuAQAhmwEBAOwBACGcAQEA7AEAIZ0BgAAAAAGeAQEA8AEAIQMAAAAHACAcAACjAwAgHQAArAMAIA0AAAAHACAEAAD_AQAgBwAAgAIAIAsAAIICACAVgACsAwAhewEA7AEAIXwBAOwBACGZAUAA7gEAIZoBQADuAQAhmwEBAOwBACGcAQEA7AEAIZ0BgAAAAAGeAQEA8AEAIQwEAAD_AQAgBwAAgAIAIAsAAIICACAVgAAAAAF7AQDsAQAhfAEA7AEAIZkBQADuAQAhmgFAAO4BACGbAQEA7AEAIZwBAQDsAQAhnQGAAAAAAZ4BAQDwAQAhAwAAAAMAIBwAAKUDACAdAACvAwAgDAAAAAMAIAMAAKMCACAFAACkAgAgDQAApgIAIBUAAK8DACB7AQDsAQAhfgAAogKhASKZAUAA7gEAIZoBQADuAQAhmwEBAOwBACGfAQIAoQIAIaEBAQDsAQAhCgMAAKMCACAFAACkAgAgDQAApgIAIHsBAOwBACF-AACiAqEBIpkBQADuAQAhmgFAAO4BACGbAQEA7AEAIZ8BAgChAgAhoQEBAOwBACEKAwAAyAIAIAUAAMkCACAMAADKAgAgewEAAAABfgAAAKEBApkBQAAAAAGaAUAAAAABmwEBAAAAAZ8BAgAAAAGhAQEAAAABAgAAAAUAIBwAALADACADAAAAAwAgHAAAsAMAIB0AALQDACAMAAAAAwAgAwAAowIAIAUAAKQCACAMAAClAgAgFQAAtAMAIHsBAOwBACF-AACiAqEBIpkBQADuAQAhmgFAAO4BACGbAQEA7AEAIZ8BAgChAgAhoQEBAOwBACEKAwAAowIAIAUAAKQCACAMAAClAgAgewEA7AEAIX4AAKICoQEimQFAAO4BACGaAUAA7gEAIZsBAQDsAQAhnwECAKECACGhAQEA7AEAIQMGAAoOBgIPIAQFAwABBQoDBgAJDBYGDRoIBQQAAgYABwcMBAoSBgsTBgMDAAEFDQMGAAUBBQ4AAwQAAggAAwkAAwIKFAALFQABBAACAwUbAAwcAA0dAAIOIQAPIgAAAAADBgAPIgAQIwARAAAAAwYADyIAECMAEQEDAAEBAwABAwYAFiIAFyMAGAAAAAMGABYiABcjABgBAwABAQMAAQUGAB0iACAjACFEAB5FAB8AAAAAAAUGAB0iACAjACFEAB5FAB8CBAACB3AEAgQAAgd2BAMGACYiACcjACgAAAADBgAmIgAnIwAoAwQAAggAAwkAAwMEAAIIAAMJAAMDBgAtIgAuIwAvAAAAAwYALSIALiMALwEEAAIBBAACAwYANCIANSMANgAAAAMGADQiADUjADYQAgERIwESJgETJwEUKAEWKgEXLAsYLQwZLwEaMQsbMg0eMwEfNAEgNQskOA4lORImOgQnOwQoPAQpPQQqPgQrQAQsQgstQxMuRQQvRwswSBQxSQQySgQzSws0ThU1Txk2UAI3UQI4UgI5UwI6VAI7VgI8WAs9WRo-WwI_XQtAXhtBXwJCYAJDYQtGZBxHZSJIZgNJZwNKaANLaQNMagNNbANObgtPbyNQcgNRdAtSdSRTdwNUeANVeQtWfCVXfSlYfgZZfwZagAEGW4EBBlyCAQZdhAEGXoYBC1-HASpgiQEGYYsBC2KMAStjjQEGZI4BBmWPAQtmkgEsZ5MBMGiUAQhplQEIapYBCGuXAQhsmAEIbZoBCG6cAQtvnQExcJ8BCHGhAQtyogEyc6MBCHSkAQh1pQELdqgBM3epATc"
    };
    config.compilerWasm = {
      getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
      getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
        return await decodeBase64AsWasm(wasm);
      },
      importName: "./query_compiler_fast_bg.js"
    };
  }
});

// src/generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext, NullTypes2, TransactionIsolationLevel, defineExtension;
var init_prismaNamespace = __esm({
  "src/generated/prisma/internal/prismaNamespace.ts"() {
    "use strict";
    getExtensionContext = runtime2.Extensions.getExtensionContext;
    NullTypes2 = {
      DbNull: runtime2.NullTypes.DbNull,
      JsonNull: runtime2.NullTypes.JsonNull,
      AnyNull: runtime2.NullTypes.AnyNull
    };
    TransactionIsolationLevel = runtime2.makeStrictEnum({
      ReadUncommitted: "ReadUncommitted",
      ReadCommitted: "ReadCommitted",
      RepeatableRead: "RepeatableRead",
      Serializable: "Serializable"
    });
    defineExtension = runtime2.Extensions.defineExtension;
  }
});

// src/generated/prisma/enums.ts
var init_enums = __esm({
  "src/generated/prisma/enums.ts"() {
    "use strict";
  }
});

// src/generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";
var PrismaClient;
var init_client = __esm({
  "src/generated/prisma/client.ts"() {
    "use strict";
    init_class();
    init_prismaNamespace();
    init_enums();
    init_enums();
    globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
    PrismaClient = getPrismaClientClass();
  }
});

// src/db/index.ts
import { PrismaPg } from "@prisma/adapter-pg";
var connectionString, adapter, prisma;
var init_db = __esm({
  "src/db/index.ts"() {
    "use strict";
    init_config();
    init_client();
    connectionString = `${process.env.DATABASE_URL}`;
    adapter = new PrismaPg({ connectionString });
    prisma = new PrismaClient({ adapter });
  }
});

// src/router/credentials.ts
import { Router as Router2 } from "express";
var CredentialRouter;
var init_credentials = __esm({
  "src/router/credentials.ts"() {
    "use strict";
    init_db();
    CredentialRouter = Router2();
    CredentialRouter.post("/create", async (req, res) => {
      const id = "test-user";
      const { name, apikey, type } = req.body;
      try {
        const cred = await prisma.credential.create({
          data: {
            name,
            type,
            value: {
              apikey
            },
            userId: id
          }
        });
        return res.status(200).json({
          msg: `credential ${name} created`,
          credid: cred.id
        });
      } catch (err) {
        res.status(400).json({
          msg: "creadential creation failed"
        });
      }
    });
    CredentialRouter.post("/update", async (req, res) => {
      const userid = "test-user";
      const { credid, name, apikey, type } = req.body;
      try {
        if (!(credid && name && apikey && type)) throw new Error("inputs are incorrect");
        const cred = await prisma.credential.update({
          where: {
            id: credid,
            userId: userid
          },
          data: {
            name,
            value: {
              apikey
            },
            type
          }
        });
        return res.status(200).json({
          msg: "This Credential has been update.",
          credid: cred.id
        });
      } catch (err) {
        res.status(400).json({
          err: err.message ?? "Failed Editing Credential"
        });
      }
    });
    CredentialRouter.get("/all", async (req, res) => {
      const id = "test-user";
      try {
        const creds = await prisma.credential.findMany({
          where: {
            userId: id
          }
        });
        return res.status(200).json({
          credential: creds
        });
      } catch (err) {
        res.status(400).json({
          msg: "creadential didnt found"
        });
      }
    });
    CredentialRouter.delete("/delete", async (req, res) => {
      const id = "test-user";
      const { apiId } = req.body;
      try {
        const creds = await prisma.credential.delete({
          where: {
            id: apiId
          }
        });
        return res.status(200).json({
          msg: "This Credential has been deleted"
        });
      } catch (err) {
        res.status(400).json({
          msg: err.message ?? "Failed deleting Credential"
        });
      }
    });
  }
});

// src/middleware.ts
async function authmiddleware(req, res, next) {
  try {
    req.userId = "3";
    console.log("1");
    next();
  } catch (error) {
    res.status(401).json({
      error
    });
  }
}
var init_middleware = __esm({
  "src/middleware.ts"() {
    "use strict";
  }
});

// src/workflow-engine/resolveTemplate.ts
function ResolveTemplate(text, webhookbody, startDelimeter = "{{", endDelimeter = "}}") {
  let start = 0;
  let end = 0;
  let finalString = "";
  while (text.length > start) {
    if (startDelimeter === text.slice(start, start + 2)) {
      let endpoint = start;
      while (text.slice(endpoint, endpoint + 2) !== endDelimeter) {
        endpoint++;
      }
      const part = text.slice(start + 2, endpoint);
      const words = part.split(".");
      let Valueobj = {
        ...webhookbody
      };
      for (let i = 0; i < words.length; i++) {
        if (Valueobj && Valueobj[words[i]] !== void 0) {
          Valueobj = Valueobj[words[i]];
        } else {
          Valueobj = void 0;
          break;
        }
      }
      finalString += Valueobj !== void 0 ? Valueobj : text.slice(start, endpoint + 1);
      start = endpoint + 1;
      start++;
    } else {
      finalString += text[start];
      start++;
      end++;
    }
  }
  return finalString;
}
var init_resolveTemplate = __esm({
  "src/workflow-engine/resolveTemplate.ts"() {
    "use strict";
  }
});

// src/workflow-engine/ResolveObjectTemplate.ts
function ResolveObjectTemplate(value, context) {
  if (typeof value === "string") {
    return ResolveTemplate(value, context);
  }
  if (value && typeof value === "object") {
    const result = {};
    for (const key in value) {
      result[key] = ResolveObjectTemplate(value[key], context);
    }
    return result;
  }
  return value;
}
var init_ResolveObjectTemplate = __esm({
  "src/workflow-engine/ResolveObjectTemplate.ts"() {
    "use strict";
    init_resolveTemplate();
  }
});

// src/workflow-engine/executers/httpExecuter.ts
import axios from "axios";
async function httpExecuter({
  data,
  context
}) {
  console.log("HTTP executor running");
  const endpoint = ResolveTemplate(
    data.Endpoint || "",
    context
  );
  const RequestBody = ResolveObjectTemplate(
    JSON.parse(data.RequestBody) || {},
    context
  );
  const RequestHeader = ResolveObjectTemplate(
    JSON.parse(data.headers) || {},
    context
  );
  console.log(RequestBody);
  let result;
  if (data.Method == "GET") {
    const response2 = await axios.get(endpoint, {
      headers: RequestHeader
    });
    result = await response2.data;
  }
  if (data.Method == "POST") {
    const response2 = await axios.post(endpoint, RequestBody, {
      headers: RequestHeader
    });
    result = await response2.data;
  }
  return { status: 200, body: result };
}
var init_httpExecuter = __esm({
  "src/workflow-engine/executers/httpExecuter.ts"() {
    "use strict";
    init_resolveTemplate();
    init_ResolveObjectTemplate();
  }
});

// src/workflow-engine/executers/discordExecuter.ts
import axios2 from "axios";
async function DiscordExecuter({
  data,
  context
}) {
  console.log("Discord executor running");
  try {
    const message = ResolveTemplate(
      data.content,
      context
    );
    const response2 = await axios2.post(data.webhookUrl, {
      content: message,
      username: data.username || "automation bot"
    });
    return {
      status: response2.status,
      sent: true
    };
  } catch (err) {
    console.log(err);
    if (err.code === "ENOTFOUND" || err.response?.status === 404 || err.response?.status === 401) {
      throw new Error("Discord webhook is invalid or no longer exists");
    }
    throw new Error("Failed to send message to Discord");
  }
}
var init_discordExecuter = __esm({
  "src/workflow-engine/executers/discordExecuter.ts"() {
    "use strict";
    init_resolveTemplate();
  }
});

// src/workflow-engine/executers/geminiReqHandler.ts
import { GoogleGenAI } from "@google/genai";
async function geminiReqHandler({
  apiKey,
  prompt,
  systemInstruction
}) {
  try {
    const ai = new GoogleGenAI({ apiKey });
    let args = {
      model: "gemini-3.1-flash-lite",
      contents: [prompt]
    };
    if (systemInstruction) {
      args.config = { systemInstruction };
    }
    const response2 = await ai.models.generateContent(args);
    return response2.text || null;
  } catch (error) {
    console.log(error);
    const ermsg = error?.message || "";
    if (ermsg.includes("API key not valid")) {
      throw new Error("Gemini API key not valid");
    }
    if (ermsg.includes("You exceeded your current quota")) {
      throw new Error("Gemini API key limit exceeded");
    }
    throw new Error("Gemini request failed");
  }
}
var init_geminiReqHandler = __esm({
  "src/workflow-engine/executers/geminiReqHandler.ts"() {
    "use strict";
  }
});

// src/workflow-engine/executers/geminiExecutor.ts
async function GeminiExecutor({
  data,
  context,
  credential
}) {
  if (!credential) {
    throw new Error("Gemini credential missing");
  }
  try {
    const prompt = ResolveTemplate(data.UserPrompt ?? "", context);
    const systemInstruction = ResolveTemplate(data.SystemPrompt ?? "", context);
    const response2 = await geminiReqHandler({
      apiKey: credential.value.apikey,
      prompt,
      systemInstruction
    });
    return {
      text: response2
    };
  } catch (err) {
    throw err;
  }
}
var init_geminiExecutor = __esm({
  "src/workflow-engine/executers/geminiExecutor.ts"() {
    "use strict";
    init_resolveTemplate();
    init_geminiReqHandler();
  }
});

// src/workflow-engine/executorRegistry.ts
function getExecuter(type) {
  return executors[type];
}
var executors;
var init_executorRegistry = __esm({
  "src/workflow-engine/executorRegistry.ts"() {
    "use strict";
    init_httpExecuter();
    init_discordExecuter();
    init_geminiExecutor();
    executors = {
      "HTTP-REQUEST": httpExecuter,
      DISCORD: DiscordExecuter,
      GEMINI: GeminiExecutor,
      WEBHOOK: async ({ data }) => {
        return {
          success: true,
          response: "webhook"
        };
      },
      "TRIGGER-MANUALLY": async ({ data }) => {
        if (!data.data) {
          return {
            send: true
          };
        }
        const parsed = JSON.parse(data.data);
        data = {
          data: parsed,
          sent: true
        };
        return data;
      },
      NOTION: async ({ data }) => {
        return {
          response: "fake gemini response"
        };
      },
      CLAUDE: async ({ data }) => {
        return {
          response: "fake gemini response"
        };
      },
      CHATGPT: async ({ data }) => {
        return {
          response: "fake gemini response"
        };
      },
      "GOOGLE-SHEET": async ({ data }) => {
        return {
          response: "fake gemini response"
        };
      },
      "GOOGLE-FORMS": async ({ data }) => {
        return {
          response: "fake gemini response"
        };
      }
    };
  }
});

// src/workflow-engine/executeNode.ts
async function executeNode(node, context) {
  const executer = getExecuter(node.name.toUpperCase());
  if (!executer) {
    throw new Error(
      `No executor found for ${node.name.toUpperCase()}`
    );
  }
  const output = await executer({
    data: node.data,
    context,
    credential: node.credential
  });
  return {
    ...context,
    [node.data.variableName || node.name]: output
  };
}
var init_executeNode = __esm({
  "src/workflow-engine/executeNode.ts"() {
    "use strict";
    init_executorRegistry();
  }
});

// src/workflow-engine/topologicalSort.ts
function topologicalSort(nodes, connections) {
  const graph = /* @__PURE__ */ new Map();
  const indegree = /* @__PURE__ */ new Map();
  for (const node of nodes) {
    graph.set(node.id, []);
    indegree.set(node.id, 0);
  }
  for (const connection of connections) {
    const from = connection.fromNodeId;
    const to = connection.toNodeId;
    graph.get(from)?.push(to);
    indegree.set(to, (indegree.get(to) || 0) + 1);
  }
  const queue = [];
  for (const [nodeId, degree] of indegree) {
    if (degree === 0) {
      queue.push(nodeId);
    }
  }
  const result = [];
  while (queue.length > 0) {
    const current = queue.shift();
    const node = nodes.find((n) => n.id === current);
    if (node) {
      result.push(node);
    }
    for (const neighbour of graph.get(current) || []) {
      indegree.set(neighbour, indegree.get(neighbour) - 1);
      if (indegree.get(neighbour) === 0) {
        queue.push(neighbour);
      }
    }
  }
  return result;
}
var init_topologicalSort = __esm({
  "src/workflow-engine/topologicalSort.ts"() {
    "use strict";
  }
});

// src/workflow-engine/executeWorkflow.ts
async function executeWorkflow(workflowId, initialContext = {}) {
  const execution = await prisma.execution.create({
    data: {
      workflowId,
      status: "RUNNING"
    }
  });
  let contex = initialContext;
  const steps = [];
  try {
    const workflow = await prisma.workflow.findUnique({
      where: {
        id: workflowId
      },
      include: {
        nodes: {
          include: {
            credential: true
          }
        },
        connections: true
      }
    });
    if (!workflow) {
      throw Error("no workflow here");
    }
    const sortednodes = topologicalSort(workflow.nodes, workflow.connections);
    for (const node of sortednodes) {
      const step = {
        nodeId: node.id,
        nodeName: node.name,
        status: "RUNNING",
        startedAt: /* @__PURE__ */ new Date()
      };
      steps.push(step);
      try {
        contex = await executeNode(node, contex);
        step.status = "SUCCESS";
        step.completedAt = /* @__PURE__ */ new Date();
        step.duration = step.completedAt.getTime() - step.startedAt.getTime();
      } catch (err) {
        step.status = "FAILED";
        step.completedAt = /* @__PURE__ */ new Date();
        step.error = err.message;
        step.duration = step.completedAt.getTime() - step.startedAt.getTime();
        throw err;
      }
    }
    await prisma.execution.update({
      where: {
        id: execution.id
      },
      data: {
        status: "SUCCESS",
        completedAt: /* @__PURE__ */ new Date(),
        output: {
          context: contex,
          steps
        }
      }
    });
    return {
      context: contex,
      steps,
      executionId: execution.id
    };
  } catch (err) {
    const reser = await prisma.execution.update({
      where: {
        id: execution.id
      },
      data: {
        status: "FAILED",
        completedAt: /* @__PURE__ */ new Date(),
        error: err.message,
        output: {
          context: contex,
          steps
        }
      }
    });
    throw err;
  }
}
var init_executeWorkflow = __esm({
  "src/workflow-engine/executeWorkflow.ts"() {
    "use strict";
    init_db();
    init_executeNode();
    init_topologicalSort();
  }
});

// src/workflow-engine/validateWorkflow.ts
async function validateWorkflow(workflowId) {
  const errors = [];
  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId
    },
    include: {
      nodes: true,
      connections: true
    }
  });
  if (!workflow) {
    return {
      success: false,
      errors: ["Workflow not found"]
    };
  }
  const triggers = workflow.nodes.filter(
    (node) => node.type === "trigger"
  );
  if (triggers.length === 0) {
    errors.push("Workflow needs a trigger");
  }
  if (triggers.length > 1) {
    errors.push("Workflow can only have one trigger");
  }
  if (workflow.nodes.length > 1) {
    for (const node of workflow.nodes) {
      const data = node.data;
      if (node.name === "HTTP-request") {
        if (!data.Endpoint) {
          errors.push(
            "HTTP request endpoint missing"
          );
        }
      }
      if (node.name === "discord") {
        if (!data.webhookUrl) {
          errors.push(
            "Discord webhook URL missing"
          );
        }
      }
      const hasconnection = workflow.connections.some((a) => a.fromNodeId === node.id || a.toNodeId === node.id);
      if (!hasconnection) {
        errors.push(
          `${node.name} is not connected`
        );
      }
    }
  }
  return {
    success: errors.length === 0,
    errors
  };
}
var init_validateWorkflow = __esm({
  "src/workflow-engine/validateWorkflow.ts"() {
    "use strict";
    init_db();
  }
});

// src/router/workflow.ts
import { Router as Router3 } from "express";
import { nanoid } from "nanoid";
var WorkflowRouter, name1;
var init_workflow = __esm({
  "src/router/workflow.ts"() {
    "use strict";
    init_middleware();
    init_db();
    init_executeWorkflow();
    init_validateWorkflow();
    WorkflowRouter = Router3();
    name1 = [
      "NebulaVortex",
      "QuantumShadow",
      "ApexTitan",
      "CyberPulse",
      "EchoChroma",
      "SolarFlint",
      "AetherShift",
      "NovaScribe",
      "VectorGrip",
      "BeaconGrid"
    ];
    WorkflowRouter.post("/", async (req, res) => {
      const id = "test-user";
      const name = name1[Math.floor(Math.random() * 10)] + "-" + name1[Math.floor(Math.random() * 10)];
      try {
        const workflow = await prisma.workflow.create({
          data: {
            name,
            userId: id
          }
        });
        return res.json({
          msg: `Workflow ${workflow.name} created bc`,
          workflow
        });
      } catch (error) {
        res.json({
          msg: `creadential creation failed`
        });
      }
    });
    WorkflowRouter.post("/togglestatus", authmiddleware, async (req, res) => {
      const userid = 3;
      const { crrstatus, workflowid } = req.body;
      let status = crrstatus;
      if (crrstatus === "DRAFT") {
        const validation = await validateWorkflow(workflowid);
        if (!validation.success) {
          return res.status(400).json({
            msg: "Workflow cannot be activated",
            errors: validation.errors
          });
        }
        status = "ACTIVE";
      }
      if (crrstatus === "PAUSED") {
        status = "ACTIVE";
      }
      if (crrstatus === "ACTIVE") {
        status = "PAUSED";
      }
      await prisma.workflow.update({
        where: {
          id: workflowid
        },
        data: {
          status
        }
      });
      return res.json({
        msg: `Workflow ${status}`
      });
    });
    WorkflowRouter.post("/duplicate", async (req, res) => {
      const userid = "test-user";
      const { workflowid } = req.body;
      try {
        const ogWorkflow = await prisma.workflow.findUnique({
          where: {
            id: workflowid
          },
          include: { nodes: true, connections: true }
        });
        if (!ogWorkflow) return res.json({ msg: `Workflow not found` });
        const duplicateZap = await prisma.$transaction(async (tx) => {
          const newWorkflow = await tx.workflow.create({
            data: {
              name: `${ogWorkflow.name} (copy)`,
              userId: ogWorkflow.userId
            }
          });
          const idMap = /* @__PURE__ */ new Map();
          await tx.node.createMany({
            data: ogWorkflow.nodes.map((node) => {
              const newId = crypto.randomUUID();
              idMap.set(node.id, newId);
              return {
                id: newId,
                name: node.name,
                position: node.position,
                type: node.type,
                workflowId: newWorkflow.id,
                data: node.metadata
              };
            })
          });
          await tx.connection.createMany({
            data: ogWorkflow.connections.map((c) => {
              return {
                workflowId: newWorkflow.id,
                fromNodeId: idMap.get(c.fromNodeId),
                toNodeId: idMap.get(c.toNodeId)
              };
            })
          });
          return newWorkflow;
        });
        return res.json({
          msg: "Workflow duplicated",
          workflow: duplicateZap
        });
      } catch (error) {
        return res.status(500).json({
          msg: "Failed duplicating workflow"
        });
      }
    });
    WorkflowRouter.delete("/delete", async (req, res) => {
      const userid = "test-user";
      const { workflowid } = req.body;
      try {
        const response2 = await prisma.workflow.delete({
          where: {
            id: workflowid
          }
        });
        return res.json({
          msg: `${response2.name ?? "Workflow"} deleted`
        });
      } catch (error) {
        return res.json({
          msg: `Failed deleting Workflow `
        });
      }
    });
    WorkflowRouter.get("/all", async (req, res) => {
      try {
        const workflows = await prisma.workflow.findMany({
          where: {
            userId: "test-user"
          }
        });
        return res.json({ workflows });
      } catch (error) {
        console.log(error);
        return res.json({ msg: "eroro aaya bhai dekhle " });
      }
    });
    WorkflowRouter.put("/rename", authmiddleware, async (req, res) => {
      const userid = "test-user";
      const { newname, workflowid } = req.body;
      try {
        const response2 = await prisma.workflow.update({
          where: {
            userId: userid,
            id: workflowid
          },
          data: {
            name: newname
          }
        });
        return res.json({
          msg: `name changed to ${newname}`
        });
      } catch (error) {
        return res.json({
          msg: `Failed changing name`
        });
      }
    });
    WorkflowRouter.get("/:workflowid", authmiddleware, async (req, res) => {
      const { workflowid } = req.params;
      const workflow = await prisma.workflow.findFirst({
        where: {
          id: workflowid
        },
        include: {
          nodes: true,
          connections: true
        }
      });
      return res.json(workflow);
    });
    WorkflowRouter.put("/:workflowid", async (req, res) => {
      const { workflowid } = req.params;
      const { nodes, edges } = req.body;
      try {
        await prisma.$transaction(async (tsx) => {
          await tsx.workflow.update({
            where: {
              id: workflowid
            },
            data: {
              status: "DRAFT"
            }
          });
          await tsx.node.deleteMany({
            where: {
              workflowId: workflowid
            }
          });
          await tsx.connection.deleteMany({
            where: {
              workflowId: workflowid
            }
          });
          await tsx.node.createMany({
            data: nodes.map((node) => {
              const metadata = node.data.metadata;
              if (node.data.name === "Webhook") {
                metadata.WebhookId = nanoid();
              }
              return {
                id: node.id,
                name: node.data.name,
                position: node.position,
                type: node.type,
                workflowId: workflowid,
                data: node.data.metadata,
                credentialId: node.data.metadata?.Credential?.id
              };
            })
          });
          await tsx.connection.createMany({
            data: edges.map((edge) => ({
              workflowId: workflowid,
              fromNodeId: edge.source,
              toNodeId: edge.target
            }))
          });
        });
        res.json({
          msg: "workflow saved successfully"
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          msg: "Failed to save workflow"
        });
      }
    });
    WorkflowRouter.get("/executions/all", async (req, res) => {
      const userid = "test-user";
      const allExecutions = await prisma.execution.findMany({
        where: {
          workflow: {
            userId: userid
          }
        },
        include: {
          workflow: {
            select: {
              name: true
            }
          }
        },
        orderBy: {
          completedAt: "desc"
        }
      });
      return res.json(allExecutions);
    });
    WorkflowRouter.post("/test/:workflowId", async (req, res) => {
      const workflowId = req.params.workflowId;
      try {
        const result = await executeWorkflow(workflowId);
        res.json({
          msg: "Workflow executed",
          executionId: result.executionId
        });
      } catch (error) {
        res.status(500).json({
          msg: "Workflow failed",
          error: error.message
        });
      }
    });
  }
});

// src/router/node.ts
import { Router as Router4 } from "express";
var NodeRouter, name12;
var init_node = __esm({
  "src/router/node.ts"() {
    "use strict";
    init_db();
    NodeRouter = Router4();
    name12 = [
      "Quine",
      "Daemon",
      "Entropy",
      "Heuristic",
      "Mutex",
      "Parity",
      "Lemnisca",
      "Turing",
      "Algorism",
      "Cobol"
    ];
    NodeRouter.post("/create", async (req, res) => {
      const userid = "test-user";
      const { Allnodes } = req.body;
      const name = name12[Math.floor(Math.random() * 10)] + "-" + name12[Math.floor(Math.random() * 10)];
      console.log(Allnodes);
      try {
        const Node = await prisma.node.createMany({
          data: Allnodes
        });
        res.json({ msg: "node created", Node });
      } catch (error) {
        console.log(error);
        res.json({ msg: "node creation failed", err: error });
      }
    });
  }
});

// src/workflow-engine/utils/flattenVariables.ts
function FlattenVariables(obj, prefix = "") {
  let veriables = [];
  Object.keys(obj).forEach((key) => {
    const path2 = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === "object" && obj[key] !== null) {
      veriables.push(...FlattenVariables(obj[key], path2));
    } else {
      veriables.push(path2);
    }
  });
  return veriables;
}
var init_flattenVariables = __esm({
  "src/workflow-engine/utils/flattenVariables.ts"() {
    "use strict";
  }
});

// src/router/testRouter.ts
import { Router as Router5 } from "express";
var testRouter;
var init_testRouter = __esm({
  "src/router/testRouter.ts"() {
    "use strict";
    init_flattenVariables();
    testRouter = Router5();
    testRouter.post("/test1", async (req, res) => {
      const { text } = req.body;
      const userid = req.get("userid");
      try {
        return res.status(200).json({
          userid,
          automationresponse: text
        });
      } catch (err) {
        res.status(400).json({
          msg: "creadential creation failed"
        });
      }
    });
    testRouter.get("/test2", async (req, res) => {
      const userid = req.get("userid");
      console.log("iwas her er");
      try {
        return res.status(200).json({
          userid,
          msg: "user created in get ",
          name: "aryan",
          name2: "anu"
        });
      } catch (err) {
        res.status(400).json({
          msg: "creadential creation failed"
        });
      }
    });
    testRouter.get("/variables", async (req, res) => {
      const context = {
        AddingUserVariable: {
          body: {
            user: "aryan",
            channel: "sunday-running-club"
          }
        }
      };
      const variables = FlattenVariables(context);
      res.json({
        variables
      });
    });
  }
});

// src/router/webhoook.ts
import { Router as Router6 } from "express";
var webhookRouter;
var init_webhoook = __esm({
  "src/router/webhoook.ts"() {
    "use strict";
    init_db();
    init_executeWorkflow();
    webhookRouter = Router6();
    webhookRouter.post("/:webhookId", async (req, res) => {
      const { webhookId } = req.params;
      const webhooknode = await prisma.node.findFirst({
        where: {
          data: {
            path: ["WebhookId"],
            equals: webhookId
          }
        },
        include: {
          workflow: true
        }
      });
      if (!webhooknode) {
        return res.status(404).json({
          message: "Webhook not found"
        });
      }
      if (webhooknode.workflow.status != "ACTIVE") {
        return res.status(404).json({
          message: "Webhook inactive"
        });
      }
      await executeWorkflow(webhooknode?.workflowId, {
        Webhookpayload: {
          body: req.body
        }
      });
      res.json({
        done: "true"
      });
    });
  }
});

// src/index.ts
import express from "express";
import cors from "cors";
var require_index = __commonJS({
  "src/index.ts"() {
    init_user();
    init_credentials();
    init_workflow();
    init_node();
    init_testRouter();
    init_webhoook();
    var PORT = process.env.PORT || 3001;
    var app = express();
    app.use(express.json());
    app.use(cors({
      origin: process.env.FRONTEND_URL,
      credentials: true
    }));
    app.use("/api/v1/user", userRouter);
    app.use("/api/v1/workflow", WorkflowRouter);
    app.use("/api/v1/node", NodeRouter);
    app.use("/api/v1/credentials", CredentialRouter);
    app.use("/api/v1/test", testRouter);
    app.use("/api/v1/webhook", webhookRouter);
    app.listen(PORT, () => {
      console.log(`server runniing on port ${PORT}`);
    });
  }
});
export default require_index();
//# sourceMappingURL=index.mjs.map