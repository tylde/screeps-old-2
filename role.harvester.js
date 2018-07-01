module.exports = {
  run: creep => {
    if (creep.memory.task === 'gather' && creep.carry.energy === creep.carryCapacity) creep.memory.task = 'transport';
    else if (creep.memory.task === 'transport' && creep.carry.energy === 0) creep.memory.task = 'gather';

    if (creep.memory.task === 'gather') {
      const source = creep.pos.findClosestByPath(FIND_SOURCES);
      if (creep.harvest(source) === ERR_NOT_IN_RANGE) creep.moveTo(source);
    }
    else if (creep.memory.task === 'transport') {
      const targets = creep.room.find(FIND_STRUCTURES, {
        filter: structure => structure.structureType == STRUCTURE_SPAWN && structure.energy < structure.energyCapacity
      });

      if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(targets[0]);
    }
  }
}