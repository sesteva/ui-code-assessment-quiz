const path = require("path")
module.exports = {  
  roots: [path.resolve(__dirname, './src')],
  testMatch: [
    "**/__tests__/**.test.+(ts|tsx|js)"
  ],
  testURL: 'http://localhost',
  setupFilesAfterEnv: [path.resolve(__dirname, './src/setupTests.js')],  
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js"
  ],
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.(ts|tsx)$": "ts-jest",
    ".+\\.(css|styl|less|sass|scss)$": "jest-transform-css"
  },
  globals: {
    "ts-jest": {
      "tsConfigFile": "tsconfig.jest.json"
    }
  },  
  transformIgnorePatterns: [    
    "node_modules/(?!antd)/"
  ],
  "testEnvironment": "jsdom" 
}