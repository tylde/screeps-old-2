module.exports = {
  harvestEnergy: creep => {
    const source = creep.pos.findClosestByPath(FIND_SOURCES);
    if (creep.harvest(source) === ERR_NOT_IN_RANGE) creep.moveTo(source);
  },

  getEnergy: creep => {
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
  },

  upgradeController: creep => {
    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.controller);
  },

  transportEnergy: creep => {
    const targets = creep.room.find(FIND_STRUCTURES, {
      filter: structure => structure.structureType == STRUCTURE_SPAWN && structure.energy < structure.energyCapacity
    });

    if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(targets[0]);
  },

  constructStructures: creep => {
    const constructions = creep.room.find(FIND_CONSTRUCTION_SITES);
    if (constructions.length > 0) {
      constructions.sort((a, b) => a.id < b.id);
      if (creep.build(constructions[0]) == ERR_NOT_IN_RANGE) creep.moveTo(constructions[0])
    }
  }
}