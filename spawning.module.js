module.exports = {
  createNewCreep: (type) => {
    const options = {
      workParts: 0,
      carryParts: 0,
      moveParts: 0,
      nameBase: '',
      name: '',
      number: 0,
      task: ''
    }

    if (type === 'harvester') {
      options.workParts = 1;
      options.carryParts = 1;
      options.moveParts = 2;
      options.nameBase = 'H';
      options.task = 'harvest';
    }

    if (type === 'upgrader') {
      options.workParts = 1;
      options.carryParts = 1;
      options.moveParts = 2;
      options.nameBase = 'U';
      options.task = 'gather';
    }

    if (type === 'builder') {
      options.workParts = 1;
      options.carryParts = 1;
      options.moveParts = 2;
      options.nameBase = 'B';
      options.task = 'gather';
    }

    if (type === 'repairer') {
      options.workParts = 1;
      options.carryParts = 1;
      options.moveParts = 2;
      options.nameBase = 'R';
      options.task = 'gather';
    }

    if (type === 'repairer') {
      options.workParts = 1;
      options.carryParts = 1;
      options.moveParts = 2;
      options.nameBase = 'R';
      options.task = 'gather';
    }

    if (type === 'miner') {
      options.workParts = 2;
      options.carryParts = 0;
      options.moveParts = 1;
      options.nameBase = 'M';
      options.task = 'mine';
    }

    const typeAmount = _.filter(Game.creeps, creep => creep.memory.role === type);

    for (let i = 1; i <= typeAmount.length + 1; i++) {
      options.name = options.nameBase + i;
      options.number = i;

      if (!Game.creeps[options.name]) break;
    }

    let creepBody = [];
    for (let i = 0; i < options.workParts; i++) { creepBody.push(WORK); }
    for (let i = 0; i < options.carryParts; i++) { creepBody.push(CARRY); }
    for (let i = 0; i < options.moveParts; i++) { creepBody.push(MOVE); }


    const spawnAlpha = Game.spawns['Alpha'];
    if (spawnAlpha.spawning) return;

    const spawnResult = spawnAlpha.spawnCreep(creepBody, options.name, {
      memory: { role: type, task: options.task, number: options.number }
    });

    if (spawnResult === OK) {
      console.log('Create new creep:', options.name)
    }



  }
}