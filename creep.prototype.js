require('creep.prototype.find');
require('creep.prototype.actions');
require('creep.prototype.role');
require('creep.prototype.move');

Creep.prototype.run = function () {
  const creep = this;

  const role = creep.memory.role;

  switch (role) {
    case 'harvester': creep.runHarvester(); break;
    case 'miner': creep.runMiner(); break;
    case 'pioneer': creep.runPioneer(); break;
    case 'upgrader': creep.runUpgrader(); break;
    case 'builder': creep.runBuilder(); break;
    case 'repairer': creep.runRepairer(); break;
    case 'defenserepairer': creep.runDefenseRepairer(); break;
    case 'refiller': creep.runRefiller(); break;
    case 'transporter': creep.runTransporter(); break;
  }

  // switch (creep.memory.task) {
  //   case 'harvest': creep.say('🛠️'); break;
  //   case 'gather': creep.say('🗃️'); break;
  //   case 'mine': creep.say('⛏️'); break;
  //   case 'construct': creep.say('🚧'); break;
  //   case 'upgrade': creep.say('☝'); break;
  //   case 'transport': creep.say('🚚'); break;
  //   case 'claim': creep.say('🚩'); break;
  //   case 'pioneer': creep.say('🔰'); break;
  //   case 'reserve': creep.say('🔒'); break;
  //   case 'heal': creep.say('💉'); break;
  //   case 'refill': creep.say('⛽'); break;

  //   // 🏹 🔪 🔧 🃏 ☕ ⭐ 🔑 🔩 💥 💢 🐾 🛠️ 🔗 🚬 🗡️ ⚰️
  // }
};