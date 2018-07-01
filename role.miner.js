module.exports = {
  run: creep => {
    const containers = creep.room.find(FIND_STRUCTURES, {
      filter: structure => structure.structureType == STRUCTURE_CONTAINER
    });
    containers.sort((a, b) => a.id < b.id);

    const container = containers[creep.memory.number - 1];

    if (creep.pos.toString() == container.pos.toString()) {
      const source = creep.pos.findClosestByRange(FIND_SOURCES);
      creep.harvest(source);
    }
    else creep.moveTo(container);
  }
}