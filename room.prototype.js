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
  const settlersAmount = room.memory.creepAmount.settler;

  const containers = room.find(FIND_STRUCTURES, { filter: structure => structure.structureType == STRUCTURE_CONTAINER });
  const towers = room.find(FIND_STRUCTURES, { filter: structure => structure.structureType == STRUCTURE_TOWER });
  const construcionSites = room.find(FIND_CONSTRUCTION_SITES);
  const defenseStructures = room.find(FIND_STRUCTURES, { filter: structure => structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART });

  const sources = room.find(FIND_SOURCES);


  const isCreepNeeded = {
    1: {
      harvester: harvestersAmount < 2,
      pioneer: pioneersAmount < 6 * sources.length,
      settler: false,
      miner: false,
      refiller: false,
      transporter: false,
      repairer: false,
      defenseRepairer: false
    },
    2: {
      harvester: harvestersAmount < 2,
      pioneer: pioneersAmount < 6 * sources.length,
      settler: false,
      miner: false,
      refiller: false,
      transporter: false,
      repairer: false,
      defenseRepairer: false
    },
    3: {
      harvester: harvestersAmount < 2,
      pioneer: pioneersAmount < 5 * sources.length,
      settler: false,
      miner: false,
      refiller: false,
      transporter: false,
      repairer: false,
      defenseRepairer: false
    },
    4: {
      harvester: (room.storage) ? false : harvestersAmount < 2,
      pioneer: (room.storage) ? false : pioneersAmount < 4 * sources.length,
      settler: (room.storage) ? settlersAmount < 2 : false,
      miner: minersAmount < 2,
      refiller: refillersAmount < 2,
      transporter: transportersAmount < minersAmount,
      repairer: false,
      defenseRepairer: defenseRepairersAmount < 1
    },
    5: {
      harvester: (room.storage) ? false : harvestersAmount < 2,
      pioneer: (room.storage) ? false : pioneersAmount < 4 * sources.length,
      settler: (room.storage) ? settlersAmount < 2 : false,
      miner: minersAmount < 2,
      refiller: refillersAmount < 2,
      transporter: transportersAmount < minersAmount,
      repairer: false,
      defenseRepairer: defenseRepairersAmount < 1
    }

  }
  // console.log()

  const rolesPriority = [
    'harvester',
    'miner',
    'transporter',
    'refiller',
    'pioneer',
    'settler',
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
    case 'settler': room.spawnSettler(); break;
    case 'harvester': room.spawnHarvester(); break;
    case 'miner': room.spawnMiner(); break;
    case 'transporter': room.spawnTransporter(); break;
    case 'refiller': room.spawnRefiller(); break;
    case 'defenseRepairer': room.spawnDefenseRepairer(); break;
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
    defenseRepairer: _.filter(creeps, creep => creep.memory.role === 'defenseRepairer').length,
    refiller: _.filter(creeps, creep => creep.memory.role === 'refiller').length,
    transporter: _.filter(creeps, creep => creep.memory.role === 'transporter').length,
    pioneer: _.filter(creeps, creep => creep.memory.role === 'pioneer').length,
    settler: _.filter(creeps, creep => creep.memory.role === 'settler').length
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
        filter: structure => [STRUCTURE_ROAD, STRUCTURE_CONTAINER].includes(structure.structureType) && structure.hits < structure.hitsMax
      });
      if (structuresToRepair) tower.repair(structuresToRepair[0]);
    }
  }
}