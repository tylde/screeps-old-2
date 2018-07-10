const getCreepCost = function (body) {
  return body.reduce((acc, el) => acc + BODYPART_COST[el], 0);
}

Room.prototype.run = function () {
  const room = this;

  if (Game.time % 10 === 0) {
    room.updateMemory();
  }


  room.manageTowers();

  const harvestersAmount = room.memory.creepAmount.harvester;
  const upgradersAmount = room.memory.creepAmount.upgrader;
  const minersAmount = room.memory.creepAmount.miner;
  const buildersAmount = room.memory.creepAmount.builder;
  const repairersAmount = room.memory.creepAmount.repairer;
  const defenseRepairersAmount = room.memory.creepAmount.defenseRepairer;
  const refillersAmount = room.memory.creepAmount.refiller;
  const transportersAmount = room.memory.creepAmount.transporter;
  const pioneersAmount = room.memory.creepAmount.pioneer;

  const containers = room.find(FIND_STRUCTURES, { filter: structure => structure.structureType == STRUCTURE_CONTAINER });
  const towers = room.find(FIND_STRUCTURES, { filter: structure => structure.structureType == STRUCTURE_TOWER });
  const construcionSites = room.find(FIND_CONSTRUCTION_SITES);
  const defenseStructures = room.find(FIND_STRUCTURES, { filter: structure => structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART });

  const sources = room.find(FIND_SOURCES);


  const isCreepNeeded = {
    1: {
      pioneer: pioneersAmount < 4 * sources.length,
      upgrader: false,
      miner: false,
      builder: false,
      refiller: false,
      transporter: false,
      repairer: false,
      defenseRepairer: false,
    },
    2: {
      pioneer: pioneersAmount < 4 * sources.length,
      upgrader: false,
      miner: false,
      builder: false,
      refiller: false,
      transporter: false,
      repairer: false,
      defenseRepairer: false,
    },
    3: {
      pioneer: pioneersAmount < 4 * sources.length,
      upgrader: false,
      miner: false,
      builder: false,
      refiller: false,
      transporter: false,
      repairer: false,
      defenseRepairer: false,
    },
    4: {
      pioneer: (minersAmount === 0 && transportersAmount === 0 && refillersAmount === 0) ? pioneersAmount < 1 : pioneersAmount < 4 * sources.length,
      upgrader: upgradersAmount < 4,
      miner: room.storage && minersAmount < containers.length,
      builder: false,
      refiller: room.storage,
      transporter: transportersAmount < minersAmount,
      repairer: false,
      defenseRepairer: false,
    }
  }

  const rolesPriority = [
    'miner',
    'refiller',
    'transporter',
    'pioneer',
    'builder',
    'upgrader',
    'repairer',
    'defenseRepairer'
  ]

  let creepToSpawn = null;
  for (let i = 0; i < rolesPriority.length; i++) {
    if (creepToSpawn === null && isCreepNeeded[room.controller.level][rolesPriority[i]]) creepToSpawn = rolesPriority[i];
    if (creepToSpawn !== null) break;
  }

  // console.log(creepToSpawn);


  if (creepToSpawn !== null) room.spawnCreep(creepToSpawn);



}

Room.prototype.updateMemory = function () {
  const room = this;

  const creeps = room.getRoomCreeps();
  room.memory.creepAmount = {
    harvester: _.filter(creeps, creep => creep.memory.role === 'harvester').length,
    upgrader: _.filter(creeps, creep => creep.memory.role === 'upgrader').length,
    miner: _.filter(creeps, creep => creep.memory.role === 'miner').length,
    builder: _.filter(creeps, creep => creep.memory.role === 'builder').length,
    repairer: _.filter(creeps, creep => creep.memory.role === 'repairer').length,
    defenseRepairer: _.filter(creeps, creep => creep.memory.role === 'defenserepairer').length,
    refiller: _.filter(creeps, creep => creep.memory.role === 'refiller').length,
    transporter: _.filter(creeps, creep => creep.memory.role === 'transporter').length,
    pioneer: _.filter(creeps, creep => creep.memory.role === 'pioneer').length
  }
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

Room.prototype.spawnPioneer = function () {
  const partsBase = [WORK, CARRY, MOVE, MOVE];
  const nameBase = 'P';
  const task = 'harvest';
  const number = 0;
  const name = '';

  const creepCost = getCreepCost(body);

}


Room.prototype.spawnCreep = function (type) {
  const room = this;

  const spawns = room.find(FIND_STRUCTURES, { filter: structure => structure.structureType === STRUCTURE_SPAWN });
  const spawn = spawns[0];
  // for (let spawn in spawns) {

  // }

  if (!spawn) return;

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
    options.workParts = 3;
    options.carryParts = 3;
    options.moveParts = 3;
    options.nameBase = 'U';
    options.task = 'gather';
  }

  if (type === 'builder') {
    options.workParts = 3;
    options.carryParts = 3;
    options.moveParts = 3;
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

  if (type === 'defenserepairer') {
    options.workParts = 2;
    options.carryParts = 2;
    options.moveParts = 2;
    options.nameBase = 'DR';
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
    options.workParts = 4;
    options.carryParts = 0;
    options.moveParts = 1;
    options.nameBase = 'M';
    options.task = 'mine';
  }

  const typeAmount = _.filter(Game.creeps, creep => creep.memory.role === type && creep.memory.homeRoom === spawn.room.name);

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





Room.prototype.manageTowers = function () {
  const room = this;

  const towers = room.find(FIND_STRUCTURES, {
    filter: structure => structure.structureType == STRUCTURE_TOWER
  });
  for (let tower of towers) {
    const target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (target) tower.attack(target);
    else {
      const structuresToRepair = room.find(FIND_STRUCTURES, {
        filter: structure => (structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_CONTAINER) && structure.hits < structure.hitsMax
      });
      if (structuresToRepair) tower.repair(structuresToRepair[0]);
    }
  }
}