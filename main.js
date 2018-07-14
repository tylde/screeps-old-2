require('require');

const initMemory = function () {
  for (let roomName in Game.rooms) {
    Game.rooms[roomName].updateMemory();;
  }
}

module.exports.loop = () => {
  for (let name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
    else Game.creeps[name].run();
  }

  for (let roomName in Game.rooms) {
    Game.rooms[roomName].run();
  }

  // Game.creeps['A2'].moveToRoom('W56S12', 16, 17)
  // Game.creeps['DR1'].repair(Game.getObjectById('5b48e15d4b7616345e1a4779'))

};

