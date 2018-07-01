module.exports = {
  run: creep => {
    if (creep.memory.isWorking === false && creep.carry.energy === 0) creep.memory.isWorking = true;
    else if (creep.memory.isWorking === true && creep.carry.energy === creep.carryCapacity) creep.memory.isWorking = false;

    if (creep.memory.isWorking === true) {
      if (creep.room.storage !== undefined) {
        const storage = creep.room.storage;
        if (creep.withdraw(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) creep.moveTo(storage);
      }
      else {
        const source = creep.pos.findClosestByPath(FIND_SOURCES);
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) creep.moveTo(source);
      }
    }
    else {
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.controller);
    }
  }
}