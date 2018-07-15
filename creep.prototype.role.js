const getCreepSourceId = function (creep) {
  if (creep.memory.sourceId === undefined || creep.memory.sourceId === null) {
    const sources = creep.findSources().sort((a, b) => a.id < b.id);
    if (sources.length > 0) {
      const number = creep.memory.number % sources.length;
      creep.memory.sourceId = sources[number].id;
    }
    else creep.memory.sourceId = null;
  }
}

Creep.prototype.runPioneer = function () {
  const creep = this;

  getCreepSourceId(creep);

  if (creep.memory.task === 'harvest' && creep.carry.energy === creep.carryCapacity) creep.memory.task = 'pioneer';
  else if (creep.memory.task === 'pioneer' && creep.carry.energy === 0) creep.memory.task = 'harvest';

  if (creep.memory.task === 'harvest') creep.harvestEnergy();
  else if (creep.memory.task === 'pioneer') creep.pioneer();
}


Creep.prototype.runReserver = function () {
  const creep = this;

  if (creep.pos.roomName !== creep.memory.destRoom) {
    const exit = creep.room.findExitTo(creep.memory.destRoom);
    creep.moveTo(creep.pos.findClosestByRange(exit));
  }
  else {
    if (creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.controller);
  }
}

Creep.prototype.runClaimer = function () {
  const creep = this;

  if (creep.pos.roomName !== creep.memory.destRoom) {
    const exit = creep.room.findExitTo(creep.memory.destRoom);
    creep.moveTo(creep.pos.findClosestByRange(exit));
  }
  else {
    if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.controller);
  }
}

Creep.prototype.runSpawnBuilder = function () {
  const creep = this;

  if (creep.memory.task === 'harvest' && creep.carry.energy === creep.carryCapacity) creep.memory.task = 'build';
  else if (creep.memory.task === 'build' && creep.carry.energy === 0) creep.memory.task = 'harvest';

  if (creep.memory.task === 'harvest') {
    if (creep.pos.roomName !== creep.memory.destRoom) {
      const exit = creep.room.findExitTo(creep.memory.destRoom);
      creep.moveTo(creep.pos.findClosestByRange(exit));
    }
    else {
      const source = creep.findClosestSource();
      if (creep.harvest(source) === ERR_NOT_IN_RANGE) creep.moveTo(source);
    }
  }
  else if (creep.memory.task === 'build') {
    if (creep.pos.roomName !== creep.memory.destRoom) {
      const exit = creep.room.findExitTo(creep.memory.destRoom);
      creep.moveTo(creep.pos.findClosestByRange(exit));
    }
    else {
      creep.constructStructures();
    }
  }


}


Creep.prototype.runAttacker = function () {
  const creep = this;


  if (creep.pos.roomName === creep.memory.homeRoom) {
    const exit = creep.room.findExitTo(creep.memory.destRoom);
    creep.moveTo(creep.pos.findClosestByRange(exit));
  }
  else if (creep.pos.roomName === creep.memory.destRoom) {
    let spawn = null;
    if (creep.name === 'A1') spawn = creep.findClosestExtension();
    if (creep.name === 'A2') spawn = creep.findClosestSpawn();

    if (spawn) {
      if (creep.attack(spawn) == ERR_NOT_IN_RANGE) creep.moveTo(spawn);
    }
    else {
      const hostile = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
      if (hostile) {
        if (creep.attack(hostile) == ERR_NOT_IN_RANGE) creep.moveTo(hostile);
      }
    }
  }
  else {

    // Game.creeps['A2'].moveToRoom('W56S12', 17, 47);
    // Game.creeps['A2'].move(RIGHT);
    // const hostile = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
    // if (hostile) {
    //   if (creep.attack(hostile) == ERR_NOT_IN_RANGE) creep.moveTo(hostile);
    //   creep.moveTo(hostile);
    // }
    // else {

    const exit = creep.room.findExitTo(creep.memory.destRoom);
    creep.moveTo(creep.pos.findClosestByRange(exit));

    // console.log(exit)
    // }
  }
}





Creep.prototype.runSettler = function () {
  const creep = this;

  if (creep.memory.task === 'get-energy' && creep.carry.energy === creep.carryCapacity) creep.memory.task = 'develop';
  else if (creep.memory.task === 'develop' && creep.carry.energy === 0) creep.memory.task = 'get-energy';

  if (creep.memory.task === 'get-energy') creep.getEnergyFromStorage();
  else if (creep.memory.task === 'develop') creep.develop();

  // creep.moveTo(Game.flags['S']);
}



Creep.prototype.runHarvester = function () {
  const creep = this;

  getCreepSourceId(creep);

  if (creep.memory.task === 'harvest' && creep.carry.energy === creep.carryCapacity) creep.memory.task = 'transport';
  else if (creep.memory.task === 'transport' && creep.carry.energy === 0) creep.memory.task = 'harvest';

  if (creep.memory.task === 'harvest') creep.harvestEnergy();
  else if (creep.memory.task === 'transport') creep.transportEnergyToSpawn();
};



Creep.prototype.runMiner = function () {
  const creep = this;

  const container = Game.getObjectById(creep.memory.containerId);
  const source = Game.getObjectById(creep.memory.sourceId);

  if (creep.pos.roomName === creep.memory.destRoom) {
    if (creep.pos.toString() == container.pos.toString()) {
      if (container.hits < container.hitsMax && creep.carry.energy !== 0) creep.repair(container);
      creep.harvest(source);
    }
    else creep.moveTo(container);
  }
  else {
    const exit = creep.room.findExitTo(creep.memory.destRoom);
    creep.moveTo(creep.pos.findClosestByRange(exit));
  }
};



Creep.prototype.runRefiller = function () {
  const creep = this;

  if (creep.memory.task === 'get-energy' && creep.carry.energy === creep.carryCapacity) creep.memory.task = 'refill';
  else if (creep.memory.task === 'refill' && creep.carry.energy === 0) creep.memory.task = 'get-energy';

  if (creep.ticksToLive > 20) {
    if (creep.memory.task === 'get-energy') creep.getEnergy();
    else if (creep.memory.task === 'refill') creep.refillEnergy();
  }
  else {
    if (creep.memory.task === 'get-energy') creep.moveTo(Game.flags[creep.name]);
    else if (creep.memory.task === 'refill') creep.transportEnergyToStorage();
  }
};



Creep.prototype.runRepairer = function () {
  const creep = this;

  if (creep.memory.targetId !== undefined) {
    const target = Game.getObjectById(creep.memory.targetId);
    if (!target) creep.memory.targetId = undefined;
    if (target && target.hits === target.hitsMax) creep.memory.targetId = undefined;
  }
  if (creep.memory.targetId === undefined) {
    const target = creep.findClosestStructureToRepair();
    if (target) creep.memory.targetId = target.id;
  }

  if (creep.memory.task === 'get-energy' && creep.carry.energy === creep.carryCapacity) creep.memory.task = 'repair';
  else if (creep.memory.task === 'repair' && creep.carry.energy === 0) creep.memory.task = 'get-energy';

  if (creep.memory.task === 'get-energy') creep.getEnergy();
  else if (creep.memory.task === 'repair') creep.repairStructures();
};

Creep.prototype.runDefenseRepairer = function () {
  const creep = this;

  if (creep.memory.task === 'get-energy' && creep.carry.energy === creep.carryCapacity) creep.memory.task = 'repair';
  else if (creep.memory.task === 'repair' && creep.carry.energy === 0) creep.memory.task = 'get-energy';

  if (creep.memory.task === 'get-energy') creep.getEnergy();
  else if (creep.memory.task === 'repair') creep.repairDefenseStructures();
};



Creep.prototype.runTransporter = function () {
  const creep = this;

  // if (creep.memory.containerId === undefined) {
  //   const containers = creep.findContainers();
  //   if (containers.length > 0) {
  //     containers.sort((a, b) => a.id < b.id);
  //     creep.memory.containerId = containers[creep.memory.number - 1].id;
  //   }
  // }

  if (creep.memory.task === 'get-energy' && creep.carry.energy === creep.carryCapacity) creep.memory.task = 'transport';
  else if (creep.memory.task === 'transport' && creep.carry.energy === 0) creep.memory.task = 'get-energy';

  // if (creep.memory.task === 'get-energy') creep.withdrawEnergyFromContainer();
  // else if (creep.memory.task === 'transport') creep.transportEnergyToStorage();

  if (creep.memory.task === 'get-energy') creep.getEnergyFromDest();
  else if (creep.memory.task === 'transport') creep.transportEnergyToHome();
};


Creep.prototype.runLongHarvester = function () {
  const creep = this;

  if (creep.memory.task === 'harvest' && creep.carry.energy === creep.carryCapacity) creep.memory.task = 'transport';
  else if (creep.memory.task === 'transport' && creep.carry.energy === 0) creep.memory.task = 'harvest';

  if (creep.memory.task === 'harvest') creep.harvestEnergyFromDest();
  else if (creep.memory.task === 'transport') creep.transportEnergyToHomeLH();
}