require('./room.prototype.spawn');

Room.prototype.run = function () {
  const room = this;

  if (Game.time % 10 === 0) {
    room.updateMemory();
  }


  room.manageTowers();

  const creepsAmount = room.memory.creepAmount.creeps;
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
      pioneer: pioneersAmount < 6 * sources.length,
      upgrader: false,
      miner: false,
      builder: false,
      refiller: false,
      transporter: false,
      repairer: false,
      defenseRepairer: false,
      harvester: harvestersAmount < 1
    },
    2: {
      pioneer: pioneersAmount < 6 * sources.length,
      upgrader: false,
      miner: false,
      builder: false,
      refiller: false,
      transporter: false,
      repairer: false,
      defenseRepairer: false,
      harvester: harvestersAmount < 1
    },
    3: {
      pioneer: pioneersAmount < 5 * sources.length,
      upgrader: false,
      miner: false,
      builder: false,
      refiller: false,
      transporter: false,
      repairer: false,
      defenseRepairer: false,
      harvester: harvestersAmount < 2
    },
    4: {
      pioneer: (minersAmount === 0 && transportersAmount === 0 && refillersAmount === 0) ? pioneersAmount < 5 * sources.length : pioneersAmount < 1,
      upgrader: upgradersAmount < 4,
      miner: room.storage && minersAmount < containers.length,
      builder: false,
      refiller: room.storage,
      transporter: transportersAmount < minersAmount,
      repairer: false,
      defenseRepairer: false,
      harvester: !room.storage && harvestersAmount < 2
    }
  }

  const rolesPriority = [
    'harvester',
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

  // console.log(creepToSpawn)

  switch (creepToSpawn) {
    case 'pioneer': room.spawnPioneer(); break;
    case 'harvester': room.spawnHarvester(); break;
  }

  if (creepsAmount === 0 && room.energyAvailable !== room.energyCapacityAvailable) room.spawnEmergencyHarvester();


}

Room.prototype.updateMemory = function () {
  const room = this;

  const creeps = room.getRoomCreeps();
  room.memory.creepAmount = {
    creeps: creeps.length,
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