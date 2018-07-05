module.exports = {
  run: creep => {
    const containers = creep.findContainersInRoom();
    containers.sort((a, b) => a.id < b.id);

    const container = containers[creep.memory.number - 1];

    if (creep.pos.toString() == container.pos.toString()) {
      const source = creep.findClosestSource();
      creep.harvest(source);
    }
    else creep.moveTo(container);
  }
}