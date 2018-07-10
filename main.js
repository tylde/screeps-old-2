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


  // const test = Game.creeps['U1'].findClosestContainerWithEnergy();
  // console.log(test);

  // Game.creeps['U1'].moveToRoom('W52S1', 11, 7)

  // Game.creeps['B1'].moveToRoom('W52S1', 11, 5)
  // Game.creeps['B4'].moveToRoom('W52S1', 11, 5)
  // Game.creeps['B3'].moveToRoom('W52S1', 11, 5)

  // Game.creeps['H1'].moveToRoom('W52S1', 7, 15)
  // Game.creeps['H2'].moveToRoom('W52S1', 7, 13)
  // Game.creeps['M1'].moveToRoom('W52S1', 7, 14)
  // Game.creeps['B1'].moveToRoom('W52S1', 11, 5)
  // Game.creeps['B2'].moveToRoom('W52S1', 4, 15)
  // Game.creeps['DR1'].moveToRoom('W52S1', 4, 15)
  // Game.creeps['RF1'].moveToRoom('W52S1', 6, 14)
  // Game.creeps['DR1'].moveToRoom('W52S1', 11, 20)

  // Game.creeps['B2'].moveToRoom('W52S1', 27, 15)
  // Game.creeps['DR1'].moveToRoom('W52S1', 27, 15)
  // Game.creeps['RF1'].moveToRoom('W52S1', 11, 4)
  // Game.creeps['RF2'].moveToRoom('W52S1', 6, 14)
};

