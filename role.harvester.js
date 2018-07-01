const creepActions = require('./creep.actions');

module.exports = {
  run: creep => {
    if (creep.memory.task === 'harvest' && creep.carry.energy === creep.carryCapacity) creep.memory.task = 'transport';
    else if (creep.memory.task === 'transport' && creep.carry.energy === 0) creep.memory.task = 'harvest';

    if (creep.memory.task === 'harvest') creepActions.harvestEnergy(creep);
    else if (creep.memory.task === 'transport') creepActions.transportEnergyToSpawn(creep);
  }
}