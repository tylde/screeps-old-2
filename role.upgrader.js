module.exports = {
  run: creep => {
    if (creep.memory.task === 'gather' && creep.carry.energy === creep.carryCapacity) creep.memory.task = 'upgrade';
    else if (creep.memory.task === 'upgrade' && creep.carry.energy === 0) creep.memory.task = 'gather';

    if (creep.memory.task === 'gather') creep.getEnergy();
    else if (creep.memory.task === 'upgrade') creep.upgradeController();
  }
}