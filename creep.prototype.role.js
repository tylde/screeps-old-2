const getPioneersSourceId = function (creep) {
  if (creep.memory.sourceId === undefined) {
    const sources = creep.findSources().sort((a, b) => a.id < b.id);
    if (sources > 0) {
      const number = creep.memory.number % sources.length;
      creep.memory.sourceId = sources[number].id;
    }
    else creep.memory.sourceId = null;
  }
}

Creep.prototype.runPioneer = function () {
  const creep = this;

  getPioneersSourceId(creep);

  if (creep.memory.task === 'harvest' && creep.carry.energy === creep.carryCapacity) creep.memory.task = 'pioneer';
  else if (creep.memory.task === 'pioneer' && creep.carry.energy === 0) creep.memory.task = 'harvest';

  if (creep.memory.task === 'harvest') creep.harvestEnergy();
  else if (creep.memory.task === 'pioneer') creep.pioneer();
}


Creep.prototype.runBuilder = function () {
  const creep = this;
  // creep.moveTo(Game.flags['B']); return;
  creep.memory.containerId = '5b424579e291d8041ac9f4ee';

  if (creep.memory.constructionId !== undefined) {
    const construction = Game.getObjectById(creep.memory.constructionId);
    if (!construction) creep.memory.constructionId = undefined;
    if (construction && construction.progress === construction.progressTotal) creep.memory.constructionId = undefined;
  }
  if (creep.memory.constructionId === undefined) {
    const construction = creep.findClosestConstructionSite();
    if (construction) creep.memory.constructionId = construction.id;
  }

  if (creep.memory.task === 'gather' && creep.carry.energy === creep.carryCapacity) creep.memory.task = 'construct';
  else if (creep.memory.task === 'construct' && creep.carry.energy === 0) creep.memory.task = 'gather';

  if (creep.memory.task === 'gather') creep.getEnergy();
  else if (creep.memory.task === 'construct') creep.constructStructures();
};



Creep.prototype.runHarvester = function () {
  const creep = this;

  if (creep.memory.sourceId === undefined) {
    const spawn = creep.findClosestSpawn();
    const source = spawn.pos.findClosestByPath(FIND_SOURCES);
    if (source) creep.memory.sourceId = source.id;
  }

  if (creep.memory.task === 'harvest' && creep.carry.energy === creep.carryCapacity) creep.memory.task = 'transport';
  else if (creep.memory.task === 'transport' && creep.carry.energy === 0) creep.memory.task = 'harvest';

  if (creep.memory.task === 'harvest') creep.harvestEnergy();
  else if (creep.memory.task === 'transport') creep.transportEnergyToSpawn();
};



Creep.prototype.runMiner = function () {
  const creep = this;

  if (creep.memory.containerId === undefined) {
    const containers = creep.findContainers();
    containers.sort((a, b) => a.id < b.id);
    creep.memory.containerId = containers[creep.memory.number - 1].id;
  }

  if (creep.memory.containerId !== undefined && creep.memory.sourceId === undefined) {
    const container = Game.getObjectById(creep.memory.containerId)
    const source = container.pos.findClosestByPath(FIND_SOURCES);
    if (source) creep.memory.sourceId = source.id;
  }

  const container = Game.getObjectById(creep.memory.containerId);
  const source = Game.getObjectById(creep.memory.sourceId);
  if (creep.pos.toString() == container.pos.toString()) creep.harvest(source);
  else creep.moveTo(container);
};



Creep.prototype.runRefiller = function () {
  const creep = this;
  creep.memory.containerId = '5b424579e291d8041ac9f4ee';

  if (creep.memory.task === 'gather' && creep.carry.energy === creep.carryCapacity) creep.memory.task = 'refill';
  else if (creep.memory.task === 'refill' && creep.carry.energy === 0) creep.memory.task = 'gather';

  if (creep.memory.task === 'gather') creep.getEnergy();
  else if (creep.memory.task === 'refill') creep.refillEnergy();
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

  if (creep.memory.task === 'gather' && creep.carry.energy === creep.carryCapacity) creep.memory.task = 'repair';
  else if (creep.memory.task === 'repair' && creep.carry.energy === 0) creep.memory.task = 'gather';

  if (creep.memory.task === 'gather') creep.getEnergy();
  else if (creep.memory.task === 'repair') creep.repairStructures();
};

Creep.prototype.runDefenseRepairer = function () {
  const creep = this;

  creep.memory.containerId = '5b424579e291d8041ac9f4ee';

  if (creep.memory.task === 'gather' && creep.carry.energy === creep.carryCapacity) creep.memory.task = 'repair';
  else if (creep.memory.task === 'repair' && creep.carry.energy === 0) creep.memory.task = 'gather';

  if (creep.memory.task === 'gather') creep.getEnergy();
  else if (creep.memory.task === 'repair') creep.repairDefenseStructures();
};



Creep.prototype.runTransporter = function () {
  const creep = this;

  if (creep.memory.containerId === undefined) {
    const containers = creep.findContainers();
    if (containers.length > 0) {
      containers.sort((a, b) => a.id < b.id);
      creep.memory.containerId = containers[creep.memory.number - 1].id;
    }
  }

  if (creep.memory.task === 'gather' && creep.carry.energy === creep.carryCapacity) creep.memory.task = 'transport';
  else if (creep.memory.task === 'transport' && creep.carry.energy === 0) creep.memory.task = 'gather';

  if (creep.memory.task === 'gather') creep.withdrawEnergyFromContainer();
  else if (creep.memory.task === 'transport') creep.transportEnergyToStorage();
};



Creep.prototype.runUpgrader = function () {
  const creep = this;

  if (creep.memory.sourceId === undefined) {
    const controller = creep.room.controller;
    const source = controller.pos.findClosestByPath(FIND_SOURCES);
    if (source) creep.memory.sourceId = source.id;
  }

  if (creep.memory.task === 'gather' && creep.carry.energy === creep.carryCapacity) creep.memory.task = 'upgrade';
  else if (creep.memory.task === 'upgrade' && creep.carry.energy === 0) creep.memory.task = 'gather';

  if (creep.memory.task === 'gather') creep.getEnergy();
  else if (creep.memory.task === 'upgrade') creep.upgradeController();
};