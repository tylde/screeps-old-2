Creep.prototype.runBuilder = function () {
  const creep = this;

  if (creep.memory.task === 'gather' && creep.carry.energy === creep.carryCapacity) creep.memory.task = 'construct';
  else if (creep.memory.task === 'construct' && creep.carry.energy === 0) creep.memory.task = 'gather';

  if (creep.memory.task === 'gather') creep.getEnergy();
  else if (creep.memory.task === 'construct') creep.constructStructures();
};


Creep.prototype.runHarvester = function () {
  const creep = this;

  if (creep.memory.task === 'harvest' && creep.carry.energy === creep.carryCapacity) creep.memory.task = 'transport';
  else if (creep.memory.task === 'transport' && creep.carry.energy === 0) creep.memory.task = 'harvest';

  if (creep.memory.task === 'harvest') creep.harvestEnergy();
  else if (creep.memory.task === 'transport') creep.transportEnergyToSpawn();
};

Creep.prototype.runMiner = function () {
  const creep = this;

  const containers = creep.findContainersInRoom();
  containers.sort((a, b) => a.id < b.id);

  const container = containers[creep.memory.number - 1];

  if (creep.pos.toString() == container.pos.toString()) {
    const source = creep.findClosestSource();
    creep.harvest(source);
  }
  else creep.moveTo(container);
};

Creep.prototype.runRefiller = function () {
  const creep = this;

  if (creep.memory.task === 'gather' && creep.carry.energy === creep.carryCapacity) creep.memory.task = 'refill';
  else if (creep.memory.task === 'refill' && creep.carry.energy === 0) creep.memory.task = 'gather';

  if (creep.memory.task === 'gather') creep.getEnergy();
  else if (creep.memory.task === 'refill') creep.refillEnergy();
};

Creep.prototype.runRepairer = function () {
  const creep = this;

  if (creep.memory.task === 'gather' && creep.carry.energy === creep.carryCapacity) creep.memory.task = 'repair';
  else if (creep.memory.task === 'repair' && creep.carry.energy === 0) creep.memory.task = 'gather';

  if (creep.memory.task === 'gather') creep.getEnergy();
  else if (creep.memory.task === 'repair') creep.repairStructures();
};

Creep.prototype.runTransporter = function () {
  const creep = this;

  if (creep.memory.task === 'gather' && creep.carry.energy === creep.carryCapacity) creep.memory.task = 'transport';
  else if (creep.memory.task === 'transport' && creep.carry.energy === 0) creep.memory.task = 'gather';

  if (creep.memory.task === 'gather') creep.withdrawEnergy();
  else if (creep.memory.task === 'transport') creep.transportEnergyToStorage();
};

Creep.prototype.runUpgrader = function () {
  const creep = this;

  if (creep.memory.task === 'gather' && creep.carry.energy === creep.carryCapacity) creep.memory.task = 'upgrade';
  else if (creep.memory.task === 'upgrade' && creep.carry.energy === 0) creep.memory.task = 'gather';

  if (creep.memory.task === 'gather') creep.getEnergy();
  else if (creep.memory.task === 'upgrade') creep.upgradeController();
};