// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Factory function
const pAequorFactor = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,

    mutate() {
      const randDnaIndex = Math.floor(Math.random() * this.dna.length);
      let randDnaBase = returnRandBase();

      while (randDnaBase === this.dna[randDnaIndex]) {
        randDnaBase = returnRandBase();
      }

      this.dna[randDnaIndex] = randDnaBase;
      return this.dna;
    },

    compareDNA(pAequorObj) {
      let total = 0;
      for (let i = 0; i < pAequorObj.dna.length; i++) {
        if (this.dna[i] === pAequorObj.dna[i]) { total += 1; }
      }
      const percentage = (total * 100) / pAequorObj.dna.length;
      
      console.log(`specimen #${this.specimenNum} and specimen #${pAequorObj.specimenNum} have ${percentage.toFixed(2)}% DNA in common`);
    },

    willLikelySurvive() {
      const survivalRate = this.dna.filter(base => base === 'C' || base === 'G');

      return survivalRate.length >= 9 ? true : false;
    },

    complementStrand() {
      let compStrand = [];
      for (let i = 0; i < this.dna.length; i++) {
        switch(this.dna[i]) {
          case 'A':
            compStrand[i] = 'T';
            break;
          case 'T':
            compStrand[i] = 'A';
            break;
          case 'C':
            compStrand[i] = 'G';
            break;
          case 'G':
            compStrand[i] = 'C';
            break;
          default:
            break;
        }
      }
      return compStrand;
    }
  }
}

let canSurvive = [];
let complements = [];

let number = 1;
while(canSurvive.length < 30) {
  let obj = pAequorFactor(number, mockUpStrand());

  if(obj.willLikelySurvive()) {
    canSurvive.push(obj);
    number++;
  }
}


