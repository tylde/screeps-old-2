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

const spawnCreepFunctionGenerator = function (type, startTask, prefix, creepBodyBase, canBodyBaseIncrement, maximumIncrement) {
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
    let times = canBodyBaseIncrement ? Math.floor(room.energyCapacityAvailable / baseCost) : 1;
    if (maximumIncrement !== null && times > maximumIncrement) times = maximumIncrement;
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

const settlerBodyBase = { WORK: 1, CARRY: 1, MOVE: 1 };
const minerBodyBase = { WORK: 5, CARRY: 0, MOVE: 3 };
const transporterBodyBase = { WORK: 0, CARRY: 2, MOVE: 1 };

const refillerBodyBase = { WORK: 0, CARRY: 1, MOVE: 1 };
const defenseRepairerBodyBase = { WORK: 1, CARRY: 1, MOVE: 2 };

Room.prototype.spawnPioneer = spawnCreepFunctionGenerator('pioneer', 'harvest', 'P', pionerBodyBase, true, 4);
Room.prototype.spawnHarvester = spawnCreepFunctionGenerator('harvester', 'harvest', 'H', harvesterBodyBase, true, 4);
Room.prototype.spawnEmergencyHarvester = spawnCreepFunctionGenerator('harvester', 'harvest', 'H', emergencyHarvesterBodyBase, false, null);

Room.prototype.spawnSettler = spawnCreepFunctionGenerator('settler', 'get-energy', 'S', settlerBodyBase, true, null);
Room.prototype.spawnMiner = spawnCreepFunctionGenerator('miner', 'mine', 'M', minerBodyBase, false, null);
Room.prototype.spawnTransporter = spawnCreepFunctionGenerator('transporter', 'get-energy', 'T', transporterBodyBase, true, 6);

Room.prototype.spawnRefiller = spawnCreepFunctionGenerator('refiller', 'get-energy', 'RF', refillerBodyBase, true, 3);
Room.prototype.spawnDefenseRepairer = spawnCreepFunctionGenerator('defenseRepairer', 'get-energy', 'DR', defenseRepairerBodyBase, true, 3);