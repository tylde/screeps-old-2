const creepActions = require('./creep.actions');

module.exports = {
  run: creep => {
    if (creep.memory.task === 'gather' && creep.carry.energy === creep.carryCapacity) creep.memory.task = 'refill';
    else if (creep.memory.task === 'refill' && creep.carry.energy === 0) creep.memory.task = 'gather';

    if (creep.memory.task === 'gather') creepActions.getEnergy(creep);
    else if (creep.memory.task === 'refill') creepActions.refillEnergy(creep);
  }
}