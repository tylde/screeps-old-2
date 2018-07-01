const spawningModule = require('./spawning.module');

const harvesterRole = require('./role.harvester');
const upgraderRole = require('role.upgrader');
// const minerRole = require('role.miner');

const HARVESTER_MAX_AMOUNT = 1;
const UPGRADERS_MAX_AMOUNT = 6;


const harvesters = _.filter(Game.creeps, creep => creep.memory.role === 'harvester');
const upgraders = _.filter(Game.creeps, creep => creep.memory.role === 'upgrader');


if (harvesters.length < HARVESTER_MAX_AMOUNT) spawningModule.createNewCreep('harvester');
if (upgraders.length < UPGRADERS_MAX_AMOUNT) spawningModule.createNewCreep('upgrader');




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
}