module.exports = {
  run: creep => {
    if (creep.memory.isWorking === false && creep.carry.energy === 0) creep.memory.isWorking = true;
    else if (creep.memory.isWorking === true && creep.carry.energy === creep.carryCapacity) creep.memory.isWorking = false;

    if (creep.memory.isWorking === true) {
      const source = creep.pos.findClosestByPath(FIND_SOURCES);
      if (creep.harvest(source) === ERR_NOT_IN_RANGE) creep.moveTo(source);
    }
    else {
      const targets = creep.room.find(FIND_STRUCTURES, {
        filter: structure => {
          return structure.structureType == STRUCTURE_CONTROLLER
        }
      });

      if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(targets[0]);
    }
  }
}