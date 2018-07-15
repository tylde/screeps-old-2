const getCreepBaseCost = function (body) {
  let cost = 0;
  for (let key in body) {
    cost += BODYPART_COST[global[key]] * body[key];
  }
  return cost;
}

const buildCreepBody = function (body, times) {
  let creepBody = [];
  for (let key in body) {
    for (let i = 0; i < times; i++) {
      for (let j = 0; j < body[key]; j++) {
        creepBody.push(global[key]);
      }
    }
  }
  return creepBody;
}

const spawnCreepFunctionGenerator = function (type, startTask, prefix, creepBodyBase, maximumIncrement) {
  return function () {
    const room = this;

    const spawns = room.find(FIND_STRUCTURES, { filter: structure => structure.structureType === STRUCTURE_SPAWN });
    const spawn = spawns[0];

    if (!spawn) return;
    if (spawn.spawning) return;

    const typeAmount = _.filter(Game.creeps, creep => creep.memory.role === type && creep.memory.homeRoom === spawn.room.name);
    let creepNumber = 1;
    let creepName = '' + room.name + ' - ' + prefix + '1';
    for (let i = 1; i <= typeAmount.length + 1; i++) {
      creepName = '' + room.name + ' - ' + prefix + i;
      creepNumber = i;
      if (Game.creeps[creepName] === undefined) break;
    }

    let bodyBase = {};
    switch (type) {
      case 'pioneer': bodyBase = { WORK: 1, CARRY: 1, MOVE: 1 }; break;
      case 'harvester': bodyBase = { WORK: 1, CARRY: 1, MOVE: 1 }; break;
      case 'longHarvester': bodyBase = { WORK: 1, CARRY: 1, MOVE: 1 }; break;
      case 'settler': bodyBase = { WORK: 1, CARRY: 1, MOVE: 1 }; break;
      case 'defenseRepairer': bodyBase = { WORK: 1, CARRY: 1, MOVE: 1 }; break;
      case 'claimer': bodyBase = { CLAIM: 1, MOVE: 1 }; break;
      case 'reserver': bodyBase = { CLAIM: 1, MOVE: 1 }; break;
      case 'refiller': bodyBase = { CARRY: 2, MOVE: 1 }; break;
      case 'attacker': bodyBase = { ATTACK: 1, MOVE: 1 }; break;
      case 'spawnBuilder': bodyBase = { WORK: 1, CARRY: 1, MOVE: 1 }; break;
      case 'miner': bodyBase = { WORK: 5, CARRY: 1, MOVE: 3 }; break;
      case 'transporter': bodyBase = { WORK: 0, CARRY: 2, MOVE: 1 }; break;
      case 'emergencyHarvester': bodyBase = { WORK: 1, CARRY: 1, MOVE: 2 }; break;
    }

    let creepBody = null

    const baseCost = getCreepBaseCost(bodyBase);
    let times = Math.floor(room.energyCapacityAvailable / baseCost);
    if (maximumIncrement !== null && times > maximumIncrement) times = maximumIncrement;

    if (type === 'transporter') {
      creepBody = buildCreepBody(bodyBase, times - 1);
      creepBody.push(WORK, MOVE);
    }
    else {
      creepBody = buildCreepBody(bodyBase, times);
    }


    let additionalMemory = {}

    // if (type === 'reserver') {
    //   additionalMemory.destRoom = room.memory.reserverDest[creepNumber];
    // }

    if (type === 'clamer') {
      additionalMemory.destRoom = room.memory.claimerDest[creepNumber];
    }

    if (type === 'spawnBuilder') {
      additionalMemory.destRoom = room.memory.spawnBuilderDest[creepNumber];
    }

    if (type === 'attacker') {
      additionalMemory.destRoom = 'W57S12';
    }

    switch (type) {
      case 'miner': { additionalMemory = { ...room.memory.minerSpawnData[creepNumber] }; break; }
      case 'transporter': { additionalMemory = { ...room.memory.transporterSpawnData[creepNumber] }; break; }
      case 'longHarvester': { additionalMemory = { ...room.memory.longarvesterSpawnData[creepNumber] }; break; }
      case 'reserver': { additionalMemory = { ...room.memory.reserverSpawnData[creepNumber] }; break; }
    }

    const spawnResult = spawn.spawnCreep(creepBody, creepName, {
      memory: {
        role: type,
        task: startTask,
        number: creepNumber,
        homeRoom: spawn.room.name,
        ...additionalMemory
      }
    });

    // cosole.log(spawnResult)
    if (spawnResult === OK) { console.log('Create new creep:', creepName); }
  }
}

const pionerBodyBase = { WORK: 1, CARRY: 1, MOVE: 1 };
const harvesterBodyBase = { WORK: 1, CARRY: 1, MOVE: 1 };
const emergencyHarvesterBodyBase = { WORK: 1, CARRY: 1, MOVE: 2 };

const settlerBodyBase = { WORK: 1, CARRY: 1, MOVE: 1 };
const minerBodyBase = { WORK: 5, CARRY: 1, MOVE: 3 };
const transporterBodyBase = { WORK: 0, CARRY: 2, MOVE: 1 };

const refillerBodyBase = { WORK: 0, CARRY: 2, MOVE: 1 };
const defenseRepairerBodyBase = { WORK: 1, CARRY: 1, MOVE: 1 };

const reserversBodyBase = { CLAIM: 1, MOVE: 1 };
const claimersBodyBase = { CLAIM: 1, MOVE: 1 };

const longHarvestersBodyBase = { WORK: 1, CARRY: 1, MOVE: 1 };

const attackerBodyBase = { ATTACK: 1, MOVE: 1 };

const spawnBuilderBase = { WORK: 1, CARRY: 1, MOVE: 1 };



Room.prototype.spawnPioneer = spawnCreepFunctionGenerator('pioneer', 'harvest', 'P', pionerBodyBase, 4);
Room.prototype.spawnHarvester = spawnCreepFunctionGenerator('harvester', 'harvest', 'H', harvesterBodyBase, 4);
Room.prototype.spawnEmergencyHarvester = spawnCreepFunctionGenerator('harvester', 'harvest', 'H', emergencyHarvesterBodyBase, 1);

Room.prototype.spawnSettler = spawnCreepFunctionGenerator('settler', 'get-energy', 'S', settlerBodyBase, 7);
Room.prototype.spawnMiner = spawnCreepFunctionGenerator('miner', 'mine', 'M', minerBodyBase, 1);
Room.prototype.spawnTransporter = spawnCreepFunctionGenerator('transporter', 'get-energy', 'T', transporterBodyBase, 7);

Room.prototype.spawnRefiller = spawnCreepFunctionGenerator('refiller', 'get-energy', 'RF', refillerBodyBase, 2);
Room.prototype.spawnDefenseRepairer = spawnCreepFunctionGenerator('defenseRepairer', 'get-energy', 'DR', defenseRepairerBodyBase, 4);

Room.prototype.spawnReserver = spawnCreepFunctionGenerator('reserver', 'reserve', 'RS', reserversBodyBase, 1);
Room.prototype.spawnClaimer = spawnCreepFunctionGenerator('claimer', 'claim', 'C', claimersBodyBase, 2);

Room.prototype.spawnLongHarvester = spawnCreepFunctionGenerator('longHarvester', 'harvest', 'LH', longHarvestersBodyBase, 5);

Room.prototype.spawnAttacker = spawnCreepFunctionGenerator('attacker', 'attack', 'A', attackerBodyBase, 4);

Room.prototype.spawnSpawnBuilder = spawnCreepFunctionGenerator('spawnBuilder', 'harvest', 'SB', spawnBuilderBase, 4);


