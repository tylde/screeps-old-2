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

const spawnCreepFunctionGenerator = function (type, startTask, prefix, creepBodyBase, canBodyBaseIncrement) {
  return function () {
    const room = this;

    const spawns = room.find(FIND_STRUCTURES, { filter: structure => structure.structureType === STRUCTURE_SPAWN });
    const spawn = spawns[0];
    if (!spawn) return;
    if (spawn.spawning) return;

    const typeAmount = _.filter(Game.creeps, creep => creep.memory.role === type && creep.memory.homeRoom === spawn.room.name);
    let creepNumber = 1;
    let creepName = prefix + '1';
    for (let i = 1; i <= typeAmount.length + 1; i++) {
      creepName = prefix + i;
      creepNumber = i;
      if (Game.creeps[creepName] === undefined) break;
    }

    const baseCost = getCreepBaseCost(creepBodyBase);
    const times = creepBodyBase ? Math.floor(room.energyCapacityAvailable / baseCost) : 1
    const creepBody = buildCreepBody(creepBodyBase, times);


    const spawnResult = spawn.spawnCreep(creepBody, creepName, {
      memory: {
        role: type,
        task: startTask,
        number: creepNumber,
        homeRoom: spawn.room.name
      }
    });

    if (spawnResult === OK) { console.log('Create new creep:', creepName); }
  }
}

const pionerBodyBase = { WORK: 1, CARRY: 1, MOVE: 1 };
const harvesterBodyBase = { WORK: 1, CARRY: 1, MOVE: 1 };
const emergencyHarvesterBodyBase = { WORK: 1, CARRY: 1, MOVE: 2 };
const minerBodyBase = { WORK: 5, CARRY: 1, MOVE: 2 };
const transporterBodyBase = { WORK: 0, CARRY: 1, MOVE: 1 };

Room.prototype.spawnPioneer = spawnCreepFunctionGenerator('pioneer', 'harvest', 'P', pionerBodyBase, true);
Room.prototype.spawnHarvester = spawnCreepFunctionGenerator('harvester', 'harvest', 'H', harvesterBodyBase, true);
Room.prototype.spawnEmergencyHarvester = spawnCreepFunctionGenerator('harvester', 'harvest', 'H', emergencyHarvesterBodyBase, false);
Room.prototype.spawnMiner = spawnCreepFunctionGenerator('miner', 'mine', 'M', minerBodyBase, false);
Room.prototype.spawnTransporter = spawnCreepFunctionGenerator('transporter', 'gather', 'T', transporterBodyBase, true);