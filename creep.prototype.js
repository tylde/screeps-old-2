require('creep.prototype.find');

Creep.prototype.harvestEnergy = function () {
  const creep = this;

  const source = creep.findClosestSource();
  if (creep.harvest(source) === ERR_NOT_IN_RANGE) creep.moveTo(source);
}

Creep.prototype.getEnergy = function () {
  const creep = this;

  if (creep.room.storage !== undefined) {
    const storage = creep.room.storage;
    if (creep.withdraw(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) creep.moveTo(storage);
  }
  else {
    const containers = creep.findContainersInRoom();
    if (containers.length > 0) {
      const container = creep.findClosestContainer();
      if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) creep.moveTo(container);
    }
    else {
      creep.harvestEnergy();
    }
  }
};

Creep.prototype._upgradeController = Creep.prototype.upgradeController;
Creep.prototype.upgradeController = function () {
  const creep = this;

  if (creep._upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.controller);
};

Creep.prototype.transportEnergyToSpawn = function () {
  const creep = this;

  const targets = creep.room.find(FIND_STRUCTURES, {
    filter: structure => structure.structureType == STRUCTURE_SPAWN && structure.energy < structure.energyCapacity
  });

  if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(targets[0]);
};




Creep.prototype.constructStructures = function () {
  const creep = this;

  const constructions = creep.room.find(FIND_CONSTRUCTION_SITES);
  if (constructions.length > 0) {
    constructions.sort((a, b) => a.id.toString() < b.id.toString());
    if (creep.build(constructions[0]) == ERR_NOT_IN_RANGE) creep.moveTo(constructions[0])
  }
  else creep.moveTo(Game.flags['B']);
};

Creep.prototype.repairStructures = function () {
  const creep = this;

  const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: structure => {
      return (
        (structure.structureType == STRUCTURE_ROAD ||
          structure.structureType == STRUCTURE_CONTAINER) &&
        structure.hits < structure.hitsMax
      );
    }
  });
  if (target) {
    if (creep.repair(target) == ERR_NOT_IN_RANGE) creep.moveTo(target);
  }
  else creep.moveTo(Game.flags['R']);
};

Creep.prototype.refillEnergy = function () {
  const creep = this;

  const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: structure => {
      return (
        (structure.structureType == STRUCTURE_EXTENSION ||
          structure.structureType == STRUCTURE_TOWER ||
          structure.structureType == STRUCTURE_SPAWN) &&
        structure.energy < structure.energyCapacity
      );
    }
  });
  if (target) {
    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(target);
  }
  else creep.moveTo(Game.flags['R']);
};

Creep.prototype.withdrawEnergy = function () {
  const creep = this;

  const containers = creep.findContainersInRoom();
  if (containers.length > 0) {
    containers.sort((a, b) => a.id < b.id);
    const container = containers[creep.memory.number - 1];

    if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) creep.moveTo(container);
  }
};

Creep.prototype.transportEnergyToStorage = function () {
  const creep = this;

  const storage = creep.room.storage;
  if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(storage);
};


