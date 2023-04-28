import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  verbose: true,
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
  },
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};
export default config;
