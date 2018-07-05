module.exports = {
  run: creep => {
    if (creep.memory.task === 'gather' && creep.carry.energy === creep.carryCapacity) creep.memory.task = 'repair';
    else if (creep.memory.task === 'repair' && creep.carry.energy === 0) creep.memory.task = 'gather';

    if (creep.memory.task === 'gather') creep.getEnergy();
    else if (creep.memory.task === 'repair') creep.repairStructures();
  }
}