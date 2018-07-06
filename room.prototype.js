Room.prototype.run = function () {
  const room = this;

  const HARVESTER_MAX_AMOUNT = 1;
  const UPGRADERS_MAX_AMOUNT = 4;
  const MINERS_MAX_AMOUNT = 4;
  const BUILDERS_MAX_AMOUNT = 1;
  const REPAIRERS_MAX_AMOUNT = 0;
  const REFILLERS_MAX_AMOUNT = 2;
  const TRANSPORTERS_MAX_AMOUNT = 4;

  const creeps = room.getRoomCreeps();
  const roomPhase = room.getRoomPhase();

  room.manageTowers();

  const harvesters = _.filter(creeps, creep => creep.memory.role === 'harvester');
  const upgraders = _.filter(creeps, creep => creep.memory.role === 'upgrader');
  const miners = _.filter(creeps, creep => creep.memory.role === 'miner');
  const builders = _.filter(creeps, creep => creep.memory.role === 'builder');
  const repairers = _.filter(creeps, creep => creep.memory.role === 'repairer');
  const refillers = _.filter(creeps, creep => creep.memory.role === 'refiller');
  const transporters = _.filter(creeps, creep => creep.memory.role === 'transporter');

  const containers = room.find(FIND_STRUCTURES, { filter: structure => structure.structureType == STRUCTURE_CONTAINER });
  const towers = room.find(FIND_STRUCTURES, { filter: structure => structure.structureType == STRUCTURE_CONTAINER });
  const construcionSites = room.find(FIND_CONSTRUCTION_SITES);


  const isHarvesterNeeded = harvesters.length < HARVESTER_MAX_AMOUNT && !room.storage && containers.length === 0;
  const isBuilderNeeded = builders.length < BUILDERS_MAX_AMOUNT && construcionSites.length > 0;
  const isRepairerNeeded = repairers.length < REPAIRERS_MAX_AMOUNT && towers.length === 0;
  const isUpgraderNeeded = upgraders.length < UPGRADERS_MAX_AMOUNT;
  const isTransporterNeeded = transporters.length < TRANSPORTERS_MAX_AMOUNT && transporters.length < containers.length && room.storage;
  const isMinerNeeded = miners.length < MINERS_MAX_AMOUNT && miners.length < containers.length;
  const isRefillerNeeded = refillers.length < REFILLERS_MAX_AMOUNT && (room.storage || containers.length > 0);

  if (isHarvesterNeeded) room.spawnCreep('harvester');
  if (isBuilderNeeded) room.spawnCreep('builder');
  if (isRepairerNeeded) room.spawnCreep('repairer');
  if (isUpgraderNeeded) room.spawnCreep('upgrader');
  if (isTransporterNeeded) room.spawnCreep('transporter');
  if (isMinerNeeded) room.spawnCreep('miner');
  if (isRefillerNeeded) room.spawnCreep('refiller');

}

Room.prototype.getRoomCreeps = function () {
  const room = this;
  const creeps = [];
  for (let name in Memory.creeps) {
    if (Game.creeps[name]) {
      const creep = Game.creeps[name];
      if (creep.memory.homeRoom === room.name) creeps.push(creep);
    }
  }
  return creeps;
}

Room.prototype.spawnHarvester = function () {
  const options = {
    workParts: 1,
    carryParts: 1,
    moveParts: 2,
    nameBase: 'H',
    name: '',
    number: 0,
    task: 'harvest'
  }


}

Room.prototype.spawnCreep = function (type) {
  const room = this;

  const spawns = room.find(FIND_STRUCTURES, { filter: structure => structure.structureType === STRUCTURE_SPAWN });
  const spawn = spawns[0];
  // for (let spawn in spawns) {

  // }

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
    options.workParts = 5;
    options.carryParts = 10;
    options.moveParts = 10;
    options.nameBase = 'U';
    options.task = 'gather';
  }

  if (type === 'builder') {
    options.workParts = 2;
    options.carryParts = 2;
    options.moveParts = 4;
    options.nameBase = 'B';
    options.task = 'gather';
  }

  if (type === 'repairer') {
    options.workParts = 1;
    options.carryParts = 3;
    options.moveParts = 4;
    options.nameBase = 'R';
    options.task = 'gather';
  }

  if (type === 'transporter') {
    options.workParts = 0;
    options.carryParts = 4;
    options.moveParts = 2;
    options.nameBase = 'T';
    options.task = 'gather';
  }

  if (type === 'refiller') {
    options.workParts = 0;
    options.carryParts = 2;
    options.moveParts = 2;
    options.nameBase = 'RF';
    options.task = 'gather';
  }

  if (type === 'miner') {
    options.workParts = 3;
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


  if (spawn.spawning) return;

  const spawnResult = spawn.spawnCreep(creepBody, options.name, {
    memory: {
      role: type,
      task: options.task,
      number: options.number,
      homeRoom: spawn.room.name
    }
  });

  if (spawnResult === OK) {
    console.log('Create new creep:', options.name)
  }
}



Room.prototype.getRoomPhase = function () {

}



Room.prototype.manageTowers = function () {
  const room = this;

  const towers = room.find(FIND_STRUCTURES, {
    filter: structure => structure.structureType == STRUCTURE_TOWER
  });
  for (let tower of towers) {
    const target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

    if (target !== undefined && target !== null) tower.attack(target);
    else {
      const structuresToRepair = room.find(FIND_STRUCTURES, {
        filter: structure => {
          return (
            (structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_CONTAINER) &&
            structure.hits < structure.hitsMax
          );
        }
      });
      if (structuresToRepair) tower.repair(structuresToRepair[0]);
    }
  }
}