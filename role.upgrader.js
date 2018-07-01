module.exports = {
  run: creep => {
    if (creep.memory.task === 'gather' && creep.carry.energy === creep.carryCapacity) creep.memory.task = 'upgrade';
    else if (creep.memory.task === 'upgrade' && creep.carry.energy === 0) creep.memory.task = 'gather';

    if (creep.memory.task === 'gather') {
      if (creep.room.storage !== undefined) {
        const storage = creep.room.storage;
        if (creep.withdraw(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) creep.moveTo(storage);
      }
      else {
        const containers = creep.room.find(FIND_STRUCTURES, {
          filter: structure => structure.structureType == STRUCTURE_CONTAINER
        });
        if (containers.length > 0) {

        }
        else {
          const source = creep.pos.findClosestByPath(FIND_SOURCES);
          if (creep.harvest(source) === ERR_NOT_IN_RANGE) creep.moveTo(source);
        }
      }
    }
    else if (creep.memory.task === 'upgrade') {
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.controller);
    }
  }
}