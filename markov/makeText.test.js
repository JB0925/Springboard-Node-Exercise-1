const { MarkovMachine } = require("./markov");
const { readFromFile, readFromURL, determineIfFileOrURL} = require("./makeText");
const fs = require("fs");
const axios = require("axios");

test("does readFromFile print the contents of the file in the context of the Markov Machine?", () => {
    let text = readFromFile('eggs.txt');
    expect(typeof text).toBe(String);
})