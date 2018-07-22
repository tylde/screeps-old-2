require('./room.prototype.spawn');
const utils = require('utils')

Room.prototype.run = function () {
  const room = this;

  if (Game.time % 10 === 0) {
    // let start = Game.cpu.getUsed();
    room.updateMemory();
    // console.log('Room: ', room.name, '- CPU:', Game.cpu.getUsed() - start);
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
  const mineralTransportersAmount = room.memory.creepAmount.mineralTransporter;
  const pioneersAmount = room.memory.creepAmount.pioneer;
  const settlersAmount = room.memory.creepAmount.settler;
  const claimersAmount = room.memory.creepAmount.claimer;
  const reserversAmount = room.memory.creepAmount.reserver;
  const longHarvestersAmount = room.memory.creepAmount.longHarvester;
  const attackersAmount = room.memory.creepAmount.attacker;
  const spawnBuildersAmount = room.memory.creepAmount.spawnBuilder;
  const extractorsAmount = room.memory.creepAmount.extractor;

  const containers = room.find(FIND_STRUCTURES, { filter: structure => structure.structureType == STRUCTURE_CONTAINER });
  const towers = room.find(FIND_STRUCTURES, { filter: structure => structure.structureType == STRUCTURE_TOWER });
  const construcionSites = room.find(FIND_CONSTRUCTION_SITES);
  const defenseStructures = room.find(FIND_STRUCTURES, { filter: structure => structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART });

  const sources = room.find(FIND_SOURCES);

  // console.log(room.memory.transporterSpawnData)

  const isCreepNeeded = {
    1: {
      harvester: harvestersAmount < 0,
      pioneer: pioneersAmount < 2 * sources.length,
      settler: false,
      miner: false,
      refiller: false,
      transporter: false,
      repairer: false,
      defenseRepairer: false
    },
    2: {
      harvester: harvestersAmount < 0,
      pioneer: pioneersAmount < 2 * sources.length,
      settler: false,
      miner: false,
      refiller: false,
      transporter: false,
      repairer: false,
      defenseRepairer: false
    },
    3: {
      harvester: harvestersAmount < 0,
      pioneer: pioneersAmount < 2 * sources.length,
      settler: false,
      miner: false,
      refiller: false,
      transporter: false,
      repairer: repairersAmount < 1,
      defenseRepairer: false
    },
    4: {
      harvester: (room.storage) ? false : harvestersAmount < 0,
      pioneer: (room.storage) ? false : pioneersAmount < 2 * sources.length,
      settler: (room.storage) ? settlersAmount < 1 : false,
      // miner: false,
      miner: minersAmount < utils.getMemoryObjectPropCount(room.memory.minerSpawnData),
      refiller: (room.storage) ? refillersAmount < 3 : false,
      // transporter: false,
      transporter: transportersAmount < utils.getMemoryObjectPropCount(room.memory.transporterSpawnData),
      // repairer: false,
      defenseRepairer: defenseRepairersAmount < 1 && defenseStructures.length > 0,
      claimer: claimersAmount < 0,
      reserver: reserversAmount < utils.getMemoryObjectPropCount(room.memory.reserverSpawnData),
      longHarvester: longHarvestersAmount < utils.getMemoryObjectPropCount(room.memory.longarvesterSpawnData),
      attacker: attackersAmount < 0,
      spawnBuilder: spawnBuildersAmount < 0,
      mineralTransporter: mineralTransportersAmount < mineralTransportersAmount
    },
    5: {
      harvester: (room.storage) ? false : harvestersAmount < 0,
      pioneer: (room.storage) ? false : pioneersAmount < 2 * sources.length,
      // pioneer: true,
      settler: (room.storage) ? settlersAmount < 2 : false,
      miner: minersAmount < utils.getMemoryObjectPropCount(room.memory.minerSpawnData),
      // refiller: (room.storage) ? refillersAmount < 3 : false,
      refiller: (false) ? refillersAmount < 3 : false,
      transporter: transportersAmount < utils.getMemoryObjectPropCount(room.memory.transporterSpawnData),
      repairer: false,
      defenseRepairer: defenseRepairersAmount < 1 && defenseStructures.length > 0,
      claimer: claimersAmount < 0,
      reserver: reserversAmount < utils.getMemoryObjectPropCount(room.memory.reserverSpawnData),
      longHarvester: longHarvestersAmount < utils.getMemoryObjectPropCount(room.memory.longarvesterSpawnData),
      attacker: attackersAmount < 0,
      spawnBuilder: spawnBuildersAmount < 0,
      mineralTransporter: mineralTransportersAmount < mineralTransportersAmount
    },
    6: {
      harvester: (room.storage) ? false : harvestersAmount < 0,
      pioneer: (room.storage) ? false : pioneersAmount < 2 * sources.length,
      settler: (room.storage) ? settlersAmount < 2 : false,
      transporter: transportersAmount < utils.getMemoryObjectPropCount(room.memory.transporterSpawnData),
      refiller: (room.storage) ? refillersAmount < 3 : false,
      miner: minersAmount < utils.getMemoryObjectPropCount(room.memory.minerSpawnData),
      repairer: false,
      defenseRepairer: defenseRepairersAmount < 1 && defenseStructures.length > 0,
      claimer: claimersAmount < 0,
      reserver: reserversAmount < utils.getMemoryObjectPropCount(room.memory.reserverSpawnData),
      longHarvester: longHarvestersAmount < utils.getMemoryObjectPropCount(room.memory.longarvesterSpawnData),
      attacker: attackersAmount < 0,
      spawnBuilder: spawnBuildersAmount < 0,
      extractor: extractorsAmount < utils.getMemoryObjectPropCount(room.memory.extractorSpawnData),
      mineralTransporter: mineralTransportersAmount < extractorsAmount
    }

  }
  // console.log(transportersAmount < utils.getMemoryObjectPropCount(room.memory.transporterSpawnData) && transportersAmount < containers.length)

  const rolesPriority = [
    'harvester',
    'miner',
    'longHarvester',
    'transporter',
    'refiller',
    'extractor',
    'mineralTransporter',
    'pioneer',
    'settler',
    'repairer',
    'defenseRepairer',
    'spawnBuilder',
    'claimer',
    'reserver',
    'attacker',

  ]

  if (room.controller.level === 0) return;

  let creepToSpawn = null;
  for (let i = 0; i < rolesPriority.length; i++) {
    if (creepToSpawn === null && isCreepNeeded[room.controller.level][rolesPriority[i]]) creepToSpawn = rolesPriority[i];
    if (creepToSpawn !== null) break;
  }

  if (refillersAmount < 3 && room.controller.level >= 4 && room.storage && room.storage.store[RESOURCE_ENERGY] > 0) creepToSpawn = 'refiller';
  // console.log(room.name, creepToSpawn)

  switch (creepToSpawn) {
    case 'pioneer': room.spawnPioneer(); break;
    case 'settler': room.spawnSettler(); break;
    case 'harvester': room.spawnHarvester(); break;
    case 'extractor': room.spawnExtractor(); break;
    case 'miner': room.spawnMiner(); break;
    case 'transporter': room.spawnTransporter(); break;
    case 'refiller': room.spawnRefiller(); break;
    case 'defenseRepairer': room.spawnDefenseRepairer(); break;
    case 'claimer': room.spawnClaimer(); break;
    case 'reserver': room.spawnReserver(); break;
    case 'longHarvester': room.spawnLongHarvester(); break;
    case 'attacker': room.spawnAttacker(); break;
    case 'spawnBuilder': room.spawnSpawnBuilder(); break;
    case 'mineralTransporter': room.spawnMineralTransporter(); break;
  }


  if (creepsAmount === 0 && room.energyAvailable !== room.energyCapacityAvailable) room.spawnEmergencyHarvester();

  // console.log(room.name, creepToSpawn);


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
    settler: _.filter(creeps, creep => creep.memory.role === 'settler').length,
    claimer: _.filter(creeps, creep => creep.memory.role === 'claimer').length,
    reserver: _.filter(creeps, creep => creep.memory.role === 'reserver').length,
    longHarvester: _.filter(creeps, creep => creep.memory.role === 'longHarvester').length,
    attacker: _.filter(creeps, creep => creep.memory.role === 'attacker').length,
    spawnBuilder: _.filter(creeps, creep => creep.memory.role === 'spawnBuilder').length,
    extractor: _.filter(creeps, creep => creep.memory.role === 'extractor').length,
    mineralTransporter: _.filter(creeps, creep => creep.memory.role === 'mineralTransporter').length,
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
      const creepsToHeal = room.find(FIND_MY_CREEPS, { filter: creep => creep.hits < creep.hitsMax });
      if (creepsToHeal) tower.heal(creepsToHeal[0]);

      const structuresToRepair = room.find(FIND_STRUCTURES, {
        filter: structure => {
          return [STRUCTURE_ROAD, STRUCTURE_CONTAINER].includes(structure.structureType) && structure.hits < structure.hitsMax || [STRUCTURE_RAMPART, STRUCTURE_WALL].includes(structure.structureType) && structure.hits < 10000
        }
      });
      if (structuresToRepair) tower.repair(structuresToRepair[0]);
    }
  }
}