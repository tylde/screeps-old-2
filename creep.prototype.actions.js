

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
      if (creep.constructStructures() === ERR_NOT_FOUND) creep.upgradeController();
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
  else {
    creep.room.memory.actualRefillPioneerId = undefined;
    if (creep.constructStructures() === ERR_NOT_FOUND) creep.upgradeController();
  }
}
Creep.prototype.constructStructures = function () {
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



Creep.prototype.develop = function () {
  const creep = this;

  if (creep.constructStructures() === ERR_NOT_FOUND) creep.upgradeController();
}





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


Creep.prototype.getEnergy = function () {
  const creep = this;
  const storage = creep.room.storage;

  if (creep.room.storage !== undefined) {
    const flag = Game.flags[creep.name];
    // if (storage.energy === 0) creep.moveTo(flag);
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




Creep.prototype.getEnergyFromStorage = function () {
  const creep = this;
  const storage = creep.room.storage;
  if (storage === undefined) return;

  if (creep.withdraw(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) creep.moveTo(storage);
}


Creep.prototype.withdrawEnergyFromContainer = function () {
  const creep = this;

  let container = null;
  if (creep.memory.containerId !== undefined) container = Game.getObjectById(creep.memory.containerId);
  else container = creep.findClosestContainer();

  let result = null;
  result = creep.withdraw(container, RESOURCE_ENERGY);
  if (result === ERR_NOT_IN_RANGE) creep.moveTo(container);
};



Creep.prototype.transportResourceToStorage = function () {
  const creep = this;

  const storage = creep.room.storage;
  if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(storage);
};



Creep.prototype.withdrawMineralFromContainer = function () {
  const creep = this;

  let container = null;
  if (creep.memory.containerId !== undefined) container = Game.getObjectById(creep.memory.containerId);
  else return;
  const minerals = [
    RESOURCE_HYDROGEN,
    RESOURCE_OXYGEN,
    RESOURCE_UTRIUM,
    RESOURCE_LEMERGIUM,
    RESOURCE_KEANIUM,
    RESOURCE_ZYNTHIUM,
    RESOURCE_CATALYST,
    RESOURCE_GHODIUM
  ];

  minerals.forEach((mineral) => {
    if (container.store[mineral] > 0) {
      if (creep.withdraw(container, mineral) === ERR_NOT_IN_RANGE) creep.moveTo(container);
    }
  });
};


Creep.prototype.transportMineralToTerminal = function () {
  const creep = this;

  const terminal = creep.room.terminal;

  for (let resource in creep.carry) {
    if (creep.carry[resource] > 0) {
      if (creep.transfer(terminal, resource) == ERR_NOT_IN_RANGE) creep.moveTo(terminal);
    }
  }
};


Creep.prototype.transportEnergyToSpawn = function () {
  const creep = this;

  const targets = creep.room.find(FIND_STRUCTURES, {
    filter: structure => (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION) && structure.energy < structure.energyCapacity
  });
  if (targets.length === 0) { creep.moveTo(Game.flags['H']); return; }
  if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(targets[0]);
};







Creep.prototype._upgradeController = Creep.prototype.upgradeController;
Creep.prototype.upgradeController = function () {
  const creep = this;

  if (creep._upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.controller);
};



Creep.prototype.createRoadConstruction = function () {
  const creep = this;
  creep.room.createConstructionSite(creep.pos, STRUCTURE_ROAD);
}



Creep.prototype.harvestEnergyFromDest = function () {
  const creep = this;

  if (creep.pos.roomName === creep.memory.homeRoom) {
    const exit = creep.room.findExitTo(creep.memory.destRoom);
    creep.moveTo(creep.pos.findClosestByRange(exit));
  }
  else if (creep.pos.roomName === creep.memory.destRoom) {
    const source = (creep.memory.sourceId ? Game.getObjectById(creep.memory.sourceId) : creep.findClosestSource());
    if (source) {
      if (creep.harvest(source) === ERR_NOT_IN_RANGE) creep.moveTo(source);
    }
  }
  else {
    const exit = creep.room.findExitTo(creep.memory.destRoom);
    creep.moveTo(creep.pos.findClosestByRange(exit));
  }
}

Creep.prototype.getEnergyFromDest = function () {
  const creep = this;

  // if (creep.pos.roomName === creep.memory.homeRoom) {
  //   const exit = creep.room.findExitTo(creep.memory.destRoom);
  //   creep.moveTo(creep.pos.findClosestByRange(exit));
  // }
  // else if (creep.pos.roomName === creep.memory.destRoom) {
  //   creep.withdrawEnergyFromContainer()
  // }
  // else {
  //   const exit = creep.room.findExitTo(creep.memory.destRoom);
  //   creep.moveTo(creep.pos.findClosestByRange(exit));
  // }

  // const energy = creep.room.lookForAt(LOOK_ENERGY, creep.pos);
  // if (energy) creep.name, creep.pickup(energy[0]);

  if (creep.pos.roomName === creep.memory.destRoom) {
    creep.withdrawEnergyFromContainer();
    // const energy = creep.room.lookForAt(LOOK_ENERGY, creep.pos);
    // // console.log(energy[0]);
    // if (energy) creep.name, creep.pickup(energy[0]);
  }
  else {
    const exit = creep.room.findExitTo(creep.memory.destRoom);
    creep.moveTo(creep.pos.findClosestByRange(exit));

    const road = creep.room.lookForAt(LOOK_STRUCTURES, creep.pos);
    if (road) creep.name, creep.repair(road[0]);
  }
}







Creep.prototype.transportEnergyToHomeLH = function () {
  const creep = this;

  if (creep.pos.roomName === creep.memory.homeRoom) {
    creep.transportResourceToStorage();
  }
  else {
    creep.createRoadConstruction();
    const construction = creep.findClosestConstructionSite();
    if (construction) {
      if (creep.build(construction) == ERR_NOT_IN_RANGE) creep.moveTo(construction)
    }
    else {
      const exit = creep.room.findExitTo(creep.memory.homeRoom);
      creep.moveTo(creep.pos.findClosestByRange(exit));
    }
  }
}
Creep.prototype.transportResourceToHome = function () {
  const creep = this;

  if (creep.pos.roomName === creep.memory.homeRoom) {
    creep.transportResourceToStorage();
  }
  else {
    const exit = creep.room.findExitTo(creep.memory.homeRoom);
    creep.moveTo(creep.pos.findClosestByRange(exit));

    const road = creep.room.lookForAt(LOOK_STRUCTURES, creep.pos);
    if (road) creep.name, creep.repair(road[0]);
  }
}

Creep.prototype.transportMineralToHome = function () {
  const creep = this;

  if (creep.pos.roomName === creep.memory.homeRoom) {
    creep.transportMineralToStorage();
  }
  else {
    const exit = creep.room.findExitTo(creep.memory.homeRoom);
    creep.moveTo(creep.pos.findClosestByRange(exit));

    const road = creep.room.lookForAt(LOOK_STRUCTURES, creep.pos);
    if (road) creep.name, creep.repair(road[0]);
  }
}


// =====================================================================


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

  if (creep.carry.energy === creep.carryCapacity || creep.memory.structureId === undefined) {
    const targets = creep.room.find(FIND_STRUCTURES, {
      filter: structure => [STRUCTURE_WALL, STRUCTURE_RAMPART].includes(structure.structureType)
    });
    targets.sort((a, b) => a.hits - b.hits);
    creep.memory.structureId = targets[0].id;
  }

  const target = Game.getObjectById(creep.memory.structureId);

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
          (creep.memory.number === 3 && structure.structureType == STRUCTURE_TOWER) ||
          structure.structureType == STRUCTURE_SPAWN) &&
        structure.energy < structure.energyCapacity
      );
    }
  });
  if (target) {
    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(target);
  }
  else {
    const flag = Game.flags[creep.name];
    creep.moveTo(flag);
  }
  // else creep.moveTo(Game.flags['R']);
};



