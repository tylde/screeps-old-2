Creep.prototype.harvestEnergy = function () {
  const creep = this;

  let source = null;
  if (creep.memory.sourceId !== undefined) source = Game.getObjectById(creep.memory.sourceId);
  else source = creep.findClosestSource();

  if (creep.harvest(source) === ERR_NOT_IN_RANGE) creep.moveTo(source);
}



Creep.prototype.getEnergy = function () {
  const creep = this;

  if (creep.room.storage !== undefined) {
    const storage = creep.room.storage;
    if (creep.withdraw(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) creep.moveTo(storage);
  }
  else {
    const containers = creep.findContainers();
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

  let construction = null;
  if (creep.memory.constructionId !== undefined) construction = Game.getObjectById(creep.memory.constructionId);
  else construction = creep.findClosestConstructionSite();
  if (construction !== undefined && construction !== null) {
    if (creep.build(construction) == ERR_NOT_IN_RANGE) creep.moveTo(construction)
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



Creep.prototype.withdrawEnergyFromContainer = function () {
  const creep = this;

  let container = null;
  if (creep.memory.containerId !== undefined) container = Game.getObjectById(creep.memory.containerId);
  else container = creep.findClosestContainer;

  if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) creep.moveTo(container);
};



Creep.prototype.transportEnergyToStorage = function () {
  const creep = this;

  const storage = creep.room.storage;
  if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(storage);
};