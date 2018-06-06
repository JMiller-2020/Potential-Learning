/*
 * Gene consists of mutation #, type, and info
 * Types:
 * - NODE: info = null
 * - LINK: info = [from, to, weight]
 */

const NODE = 0;
const LINK = 1;

var mutationCounter = 0;

class Genome {
  // genes, nodeCounter

  constructor() {
    this.genes = [];
    this.nodeCounter = 0;
  }

  toNetwork() {
    let network = [];
    for(let i = 0; i < this.genes.length; i++) {
      let gene = this.genes[i]
      switch(gene.type) {
        case NODE:
          let neuron = new Neuron();
          network.push(neuron);
          break;
        case LINK:
          network[gene.info[1]].addIn(network[gene.info[0]], gene.info[2]);
          break;
      }
    }
    return network;
  }

  addGene(type, info=null) {
    let gene = {
      mutNum: mutationCounter++,
      type: type,
      info: info
    }
    this.genes.push(gene);
  }
}

/**
 * This shouldn't really be used. implemented jic
 */
Genome.fromNetwork = function (network) {
  let genome = new Genome();
  let links = [];
  for(let i = 0; i < network.length; i++) {
    genome.addGene(NODE);
    for(let j = 0; j < network[i].ins.length; j++) {
      links.push([
        /*from*/network.indexOf(network[i].ins[j]),
        /*to*/i,
        /*weight*/network[i].weights[j]
      ]);
    }
  }
  for(let i = 0; i < links.length; i++) {
    genome.addGene(LINK, links[i]);
  }
  return genome;
}
