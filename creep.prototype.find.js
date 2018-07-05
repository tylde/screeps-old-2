Creep.prototype.findContainersInRoom = function () {
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

Creep.prototype.findSourcesInRoom = function () {
  const creep = this;
  return creep.room.find(FIND_SOURCES);
};
Creep.prototype.findClosestSource = function () {
  const creep = this;
  return creep.pos.findClosestByPath(FIND_SOURCES);
};