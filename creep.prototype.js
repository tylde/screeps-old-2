require('creep.prototype.find');
require('creep.prototype.actions');
require('creep.prototype.role');
require('creep.prototype.move');

Creep.prototype.run = function () {
  const creep = this;

  const role = creep.memory.role;

  if (role === 'harvester') creep.runHarvester();
  else if (role === 'miner') creep.runMiner();
  else if (role === 'upgrader') creep.runUpgrader();
  else if (role === 'builder') creep.runBuilder();
  else if (role === 'repairer') creep.runRepairer();
  else if (role === 'defenserepairer') creep.runDefenseRepairer();
  else if (role === 'refiller') creep.runRefiller();
  else if (role === 'transporter') creep.runTransporter();
};