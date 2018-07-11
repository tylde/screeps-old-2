Creep.prototype.findContainers = function () {
  const creep = this;
  return creep.room.find(FIND_STRUCTURES, {
    filter: structure => structure.structureType == STRUCTURE_CONTAINER
  });
};
Creep.prototype.findClosestContainer = function () {
  const creep = this;
  return creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: structure => structure.structureType == STRUCTURE_CONTAINER
  });
};
Creep.prototype.findClosestContainerWithEnergy = function () {
  const creep = this;
  creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: structure => structure.structureType == STRUCTURE_CONTAINER && structure.energy > 0
  });

  let target;

  var containers = creep.room.find(FIND_STRUCTURES, {
    filter: structure => structure.structureType == STRUCTURE_CONTAINER
  });
  var closest = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: structure => structure.structureType == STRUCTURE_CONTAINER
  });

  if (closest && closest.energy > 300) {
    console.log(closest.energy)
    target = closest;
  }
  else {
    for (i = 0; i < containers.length; i++) {
      if (containers[i] != closest) {
        target = containers[i];
      }
    }
  }

  return target;


};



Creep.prototype.findSources = function () {
  const creep = this;
  return creep.room.find(FIND_SOURCES);
};
Creep.prototype.findClosestSource = function () {
  const creep = this;
  return creep.pos.findClosestByPath(FIND_SOURCES);
};



Creep.prototype.findSpawns = function () {
  const creep = this;
  return creep.room.find(FIND_STRUCTURES, {
    filter: structure => structure.structureType == STRUCTURE_SPAWN
  });
};
Creep.prototype.findClosestSpawn = function () {
  const creep = this;
  return creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: structure => structure.structureType == STRUCTURE_SPAWN
  });
};



Creep.prototype.findConstructionSites = function () {
  const creep = this;
  return creep.room.find(FIND_CONSTRUCTION_SITES);
};
Creep.prototype.findClosestConstructionSite = function () {
  const creep = this;
  return creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
};



Creep.prototype.findClosestStructureToRepair = function () {
  const creep = this;
  return creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: structure => {
      return (
        (structure.structureType == STRUCTURE_ROAD ||
          structure.structureType == STRUCTURE_CONTAINER) &&
        structure.hits < structure.hitsMax
      );
    }
  });
};



Creep.prototype.findEmptySpawnsAndExtensions = function () {
  const creep = this;
  return creep.room.find(FIND_STRUCTURES, {
    filter: structure => {
      return (
        [STRUCTURE_SPAWN, STRUCTURE_EXTENSION].includes(structure.structureType) &&
        structure.energy < structure.energyCapacity
      );
    }
  });
}
Creep.prototype.findClosestEmptySpawnsAndExtensions = function () {
  const creep = this;
  return creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: structure => {
      return (
        [STRUCTURE_SPAWN, STRUCTURE_EXTENSION].includes(structure.structureType) &&
        structure.energy < structure.energyCapacity
      );
    }
  });
}


// Creep.prototype.findStructures(structuresTypeArray, additionalLogic) = function () {
//   const creep = this;
// }

Creep.prototype.findStructureToRefill = function () {
  const creep = this;

  return creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: structure => {
      return (
        [STRUCTURE_SPAWN, STRUCTURE_EXTENSION, STRUCTURE_TOWER].includes(structure.structureType) &&
        structure.energy < structure.energyCapacity
      );
    }
  });
}
Creep.prototype.findStructuresToRefill = function () {
  const creep = this;
  return creep.room.find(FIND_STRUCTURES, {
    filter: structure => {
      return (
        [STRUCTURE_SPAWN, STRUCTURE_EXTENSION, STRUCTURE_TOWER].includes(structure.structureType) &&
        structure.energy < structure.energyCapacity
      );
    }
  });
}