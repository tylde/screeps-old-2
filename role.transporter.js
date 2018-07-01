const creepActions = require('./creep.actions');

module.exports = {
  run: creep => {
    if (creep.memory.task === 'gather' && creep.carry.energy === creep.carryCapacity) creep.memory.task = 'transport';
    else if (creep.memory.task === 'transport' && creep.carry.energy === 0) creep.memory.task = 'gather';

    if (creep.memory.task === 'gather') creepActions.withdrawEnergy(creep);
    else if (creep.memory.task === 'transport') creepActions.transportEnergyToStorage(creep);
  }
}