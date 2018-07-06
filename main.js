const spawningModule = require('./spawning.module');

require('require');

const HARVESTER_MAX_AMOUNT = 0;
const UPGRADERS_MAX_AMOUNT = 4;
const MINERS_MAX_AMOUNT = 4;
const BUILDERS_MAX_AMOUNT = 1;
const REPAIRERS_MAX_AMOUNT = 2;
const REFILLERS_MAX_AMOUNT = 2;
const TRANSPORTERS_MAX_AMOUNT = 4;

module.exports.loop = () => {
  const harvesters = _.filter(Game.creeps, creep => creep.memory.role === 'harvester');
  const upgraders = _.filter(Game.creeps, creep => creep.memory.role === 'upgrader');
  const miners = _.filter(Game.creeps, creep => creep.memory.role === 'miner');
  const builders = _.filter(Game.creeps, creep => creep.memory.role === 'builder');
  const repairers = _.filter(Game.creeps, creep => creep.memory.role === 'repairer');
  const refillers = _.filter(Game.creeps, creep => creep.memory.role === 'refiller');
  const transporters = _.filter(Game.creeps, creep => creep.memory.role === 'transporter');

  const containers = Game.rooms["W3N7"].find(FIND_STRUCTURES, { filter: structure => structure.structureType == STRUCTURE_CONTAINER });
  const construcionSites = Game.rooms["W3N7"].find(FIND_CONSTRUCTION_SITES);

  if (harvesters.length < HARVESTER_MAX_AMOUNT) spawningModule.createNewCreep('harvester');
  if (builders.length < BUILDERS_MAX_AMOUNT && construcionSites.length > 0) spawningModule.createNewCreep('builder');
  if (repairers.length < REPAIRERS_MAX_AMOUNT) spawningModule.createNewCreep('repairer');
  if (upgraders.length < UPGRADERS_MAX_AMOUNT) spawningModule.createNewCreep('upgrader');
  if (transporters.length < TRANSPORTERS_MAX_AMOUNT && transporters.length < containers.length && Game.rooms["W3N7"].storage) spawningModule.createNewCreep('transporter');
  if (miners.length < MINERS_MAX_AMOUNT && miners.length < containers.length) spawningModule.createNewCreep('miner');
  if (refillers.length < REFILLERS_MAX_AMOUNT) spawningModule.createNewCreep('refiller');

  for (let name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
    else {
      const creep = Game.creeps[name];
      creep.run();
    }
  }


  const towers = Game.rooms["W3N7"].find(FIND_STRUCTURES, {
    filter: structure => structure.structureType == STRUCTURE_TOWER
  });
  for (let tower of towers) {
    const target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (target === undefined || target === null) return;
    tower.attack(target);
  }
}

