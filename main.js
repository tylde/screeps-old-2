const spawningModule = require('./spawning.module');

const harvesterRole = require('./role.harvester');
const upgraderRole = require('role.upgrader');
const minerRole = require('role.miner');
const builderRole = require('role.builder');
const repairerRole = require('role.repairer');
const refillerRole = require('role.refiller');
const transporterRole = require('role.transporter');

const HARVESTER_MAX_AMOUNT = 0;
const UPGRADERS_MAX_AMOUNT = 6;
const MINERS_MAX_AMOUNT = 4;
const BUILDERS_MAX_AMOUNT = 2;
const REPAIRERS_MAX_AMOUNT = 1;
const REFILLERS_MAX_AMOUNT = 1;
const TRANSPORTERS_MAX_AMOUNT = 4;


const harvesters = _.filter(Game.creeps, creep => creep.memory.role === 'harvester');
const upgraders = _.filter(Game.creeps, creep => creep.memory.role === 'upgrader');
const miners = _.filter(Game.creeps, creep => creep.memory.role === 'miner');
const builders = _.filter(Game.creeps, creep => creep.memory.role === 'builder');
const repairers = _.filter(Game.creeps, creep => creep.memory.role === 'repairer');
const refillers = _.filter(Game.creeps, creep => creep.memory.role === 'refiller');
const transporters = _.filter(Game.creeps, creep => creep.memory.role === 'transporter');

const containers = Game.rooms["W3N7"].find(FIND_STRUCTURES, { filter: structure => structure.structureType == STRUCTURE_CONTAINER });
const construcionSites = Game.rooms["W3N7"].find(FIND_CONSTRUCTION_SITES);

if (miners.length < MINERS_MAX_AMOUNT && miners.length < containers.length) spawningModule.createNewCreep('miner');
if (refillers.length < REFILLERS_MAX_AMOUNT) spawningModule.createNewCreep('refiller');
if (transporters.length < TRANSPORTERS_MAX_AMOUNT && transporters.length < containers.length && Game.rooms["W3N7"].storage) spawningModule.createNewCreep('transporter');
if (upgraders.length < UPGRADERS_MAX_AMOUNT) spawningModule.createNewCreep('upgrader');
if (repairers.length < REPAIRERS_MAX_AMOUNT) spawningModule.createNewCreep('repairer');
if (builders.length < BUILDERS_MAX_AMOUNT && construcionSites.length > 0) spawningModule.createNewCreep('builder');
if (harvesters.length < HARVESTER_MAX_AMOUNT) spawningModule.createNewCreep('harvester');

for (let name in Memory.creeps) {
  if (!Game.creeps[name]) {
    delete Memory.creeps[name];
    console.log('Clearing non-existing creep memory:', name);
  }
}

for (let name in Memory.creeps) {
  const creep = Game.creeps[name];
  const role = creep.memory.role;

  if (role === 'harvester') harvesterRole.run(creep);
  else if (role === 'miner') minerRole.run(creep);
  else if (role === 'upgrader') upgraderRole.run(creep);
  else if (role === 'builder') builderRole.run(creep);
  else if (role === 'repairer') repairerRole.run(creep);
  else if (role === 'refiller') refillerRole.run(creep);
  else if (role === 'transporter') transporterRole.run(creep);
}