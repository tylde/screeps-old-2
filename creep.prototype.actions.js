Creep.prototype.harvestEnergy = function () {
  const creep = this;

  const source = (creep.memory.sourceId ? Game.getObjectById(creep.memory.sourceId) : creep.findClosestSource());
  if (source) {
    if (creep.harvest(source) === ERR_NOT_IN_RANGE) creep.moveTo(source);
  }
  else {
    console.log(`${creep.name}: Source is undefined!`);
    creep.memory.sourceId = undefined;
  }
}

Creep.prototype.pioneer = function () {
  const creep = this;

  if (!Game.getObjectById(creep.room.memory.actualRefillPioneerId)) creep.room.memory.actualRefillPioneerId = undefined;

  switch (creep.room.memory.actualRefillPioneerId) {
    case creep.id: {
      creep.pioneerRefillment();
      break;
    }
    case undefined: {
      const structuresToRefill = creep.findStructuresToRefill();
      if (structuresToRefill.length > 0) {
        creep.room.memory.actualRefillPioneerId = creep.id;
        creep.pioneerRefillment();
        break;
      }
    }
    default: {
      if (creep.pioneerStructures() === ERR_NOT_FOUND) creep.upgradeController();
      break;
    }
  }
}
Creep.prototype.pioneerRefillment = function () {
  const creep = this;

  const structure = creep.findStructureToRefill();
  if (structure) {
    if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(structure);

  }
  else creep.room.memory.actualRefillPioneerId = undefined;
}
Creep.prototype.pioneerStructures = function () {
  const creep = this;

  if (creep.memory.constructionId === undefined) {
    const construction = creep.findClosestConstructionSite();
    if (construction) {
      creep.memory.constructionId = construction.id;
      return OK;
    }
    else return ERR_NOT_FOUND;
  }
  else {
    const construction = Game.getObjectById(creep.memory.constructionId);
    if (construction) {
      if (creep.build(construction) == ERR_NOT_IN_RANGE) creep.moveTo(construction);
      return OK;
    }
    else {
      creep.memory.constructionId = undefined;
      return ERR_NOT_FOUND;
    }
  }
}




Creep.prototype.getEnergy = function () {
  const creep = this;

  if (creep.room.storage !== undefined) {
    const storage = creep.room.storage;
    if (creep.withdraw(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) creep.moveTo(storage);
  }
  else {
    // const container = creep.findClosestContainerWithEnergy();
    const container = Game.getObjectById(creep.memory.containerId) || creep.findClosestContainer();

    if (container) {
      // const container = creep.findClosestContainer();

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
    filter: structure => (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION) && structure.energy < structure.energyCapacity
  });
  if (targets.length === 0) { creep.moveTo(Game.flags['H']); return; }
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



Creep.prototype.repairDefenseStructures = function () {
  const creep = this;

  const targets = creep.room.find(FIND_STRUCTURES, {
    filter: structure => [STRUCTURE_WALL, STRUCTURE_RAMPART].includes(structure.structureType)
  });
  if (targets.length === 0) { creep.moveTo(Game.flags['R']); return; }

  const tragetsHits = [...targets];
  const hitsSummary = tragetsHits.reduce((acc, el) => acc + el.hits, 0);
  const avegareHits = hitsSummary / targets.length;

  const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: structure => [STRUCTURE_WALL, STRUCTURE_RAMPART].includes(structure.structureType) && structure.hits < avegareHits + 1000
  });

  if (target) {
    if (creep.repair(target) == ERR_NOT_IN_RANGE) creep.moveTo(target);
  }
  else creep.moveTo(Game.flags['R']);

}



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