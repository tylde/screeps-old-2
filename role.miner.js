roleMiner = {
  run: creep => {

    const containers = {
      'M1': Game.getObjectById('#'),
      'M2': Game.getObjectById('#')
    }

    if (creep.pos.toString() == containers[creep.name].pos.toString()) {
      const source = creep.pos.findClosestByRange(FIND_SOURCES);
      creep.harvest(source);
    }
    else creep.moveTo(containers[creep.name]);

  }
}

module.exports = roleMiner;