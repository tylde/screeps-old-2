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