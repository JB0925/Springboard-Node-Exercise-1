const { MarkovMachine } = require("./markov");

beforeEach(() => {
    mm = new MarkovMachine('the cat in the hat');
    mm2 = new MarkovMachine('it will rain and it will snow today')
})
test("makeChains returns the correct output", () => {
    let testOutput = {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]};
    let testOutput2 = {"it": ["will", "will"], "will": ["rain", "snow"], 
                        "rain":["and"], "and":["it"], "snow":["today"], "today":[null]}
    expect(mm.makeChains()).toEqual(testOutput);
    expect(mm2.makeChains()).toEqual(testOutput2);
});

test("makeText.length is less than or equal to the integer passed to it", () => {
    let text = mm.makeText(10).split(' ');
    let text2 = mm2.makeText(50).split(' ');
    expect(text.length).toBeLessThan(11);
    expect(text2.length).toBeLessThan(51);
});