require('require');

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
};

