/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = {};
    let words = this.words;
    for (let i = 0; i < words.length; i++) {
      if (!chains[words[i]]) {
        chains[words[i]] = [words[i+1] || null];
      } else {
        chains[words[i]].push(words[i+1] || null);
      }
    }
    return chains;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let text = '';
    let newWord;
    // choose a random word from the list of words to start with
    const words = this.words;
    let idx = Math.floor(Math.random() * words.length);
    text = words[idx];
    newWord = text;
    
    // set our newWord = text to start with
    // newWord is used to get and concatenate the next word in the chain
    // to the "text" variable

    // loop through for an amount of times equal to "numWords"
    // use newWord to get the array at "this.chains[newWord]", and get its length
    // add a random word f
    for (let i = 1; i < numWords; i++) {
      let wordIdx = Math.floor(Math.random() * this.chains[newWord].length)
      if (!this.chains[newWord].includes(null)) {
        text += ` ${this.chains[newWord][wordIdx]}`
        newWord = this.chains[newWord][wordIdx]
      } else {
        break;
      }
    }
    return text;
  }
}

module.exports = { MarkovMachine };
