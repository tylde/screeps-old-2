module.exports = {
  run: creep => {
    if (creep.memory.task === 'gather' && creep.carry.energy === creep.carryCapacity) creep.memory.task = 'transport';
    else if (creep.memory.task === 'transport' && creep.carry.energy === 0) creep.memory.task = 'gather';

    if (creep.memory.task === 'gather') creep.withdrawEnergy();
    else if (creep.memory.task === 'transport') creep.transportEnergyToStorage();
  }
}