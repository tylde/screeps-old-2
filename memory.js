// Game.rooms['W58S13'].memory.reserverDest = {
//   1: 'W58S12',
//   2: 'W58S12',
//   3: 'W57S12'
// }



Game.rooms['W58S13'].memory.claimerDest = {
  1: 'W58S11'
}

Game.rooms['W58S13'].memory.spawnBuilderDest = {
  1: 'W58S11',
  2: 'W58S11',
  3: 'W58S11'
}


Game.rooms['W58S13'].memory.reserverSpawnData = {
  1: { destRoom: 'W58S12' },
  2: { destRoom: 'W58S12' },
  3: { destRoom: 'W59S13' },
  4: { destRoom: 'W59S13' },
  5: { destRoom: 'W57S12' },
  6: { destRoom: 'W57S12' },
}

Game.rooms['W58S13'].memory.longarvesterSpawnData = {
  1: { destRoom: 'W57S12', sourceId: '59f19f7382100e1594f34ec5' },
  2: { destRoom: 'W57S12', sourceId: '59f19f7382100e1594f34ec6' },
  // 3: { destRoom: 'W57S12', sourceId: '59f19f7382100e1594f34ec6' },
}

Game.rooms['W58S13'].memory.transporterSpawnData = {
  1: { destRoom: 'W58S13', containerId: '5b468973a323e768731e21e9' }, // M1
  2: { destRoom: 'W58S13', containerId: '5b468715a4291461ca51c495' }, // M2
  3: { destRoom: 'W59S13', containerId: '5b4b1619fce63f435a317a7a' }, // M4
  4: { destRoom: 'W59S13', containerId: '5b4b3931daffbe16d1ee1369' }, // M5
  5: { destRoom: 'W59S13', containerId: '5b4b1619fce63f435a317a7a' }, // M4
  6: { destRoom: 'W59S13', containerId: '5b4b3931daffbe16d1ee1369' }, // M5
  // 7: { destRoom: 'W59S13', containerId: '5b4b3931daffbe16d1ee1369' }, // M5
  // 8: { destRoom: 'W59S12', containerId: '5b4bb999e15e100251f96140' }, // M6
  // 9: { destRoom: 'W59S12', containerId: '5b4bb999e15e100251f96140' }, // M6
  7: { destRoom: 'W58S12', containerId: '5b4cc5d9030f9449f77f19d2' }, // M7
  8: { destRoom: 'W58S12', containerId: '5b5318c87c9ee34db2abb8b6' }, // M3
  // 11: { destRoom: 'W58S12', containerId: '5b5316365b3576529abdde2e' }, // M7
}

Game.rooms['W58S13'].memory.minerSpawnData = {
  1: { destRoom: 'W58S13', containerId: '5b468973a323e768731e21e9', sourceId: '59f19f5b82100e1594f34d3a' },
  2: { destRoom: 'W58S13', containerId: '5b468715a4291461ca51c495', sourceId: '59f19f5b82100e1594f34d38' },
  3: { destRoom: 'W59S13', containerId: '5b4b1619fce63f435a317a7a', sourceId: '59f19f4c82100e1594f34baf' },
  4: { destRoom: 'W59S13', containerId: '5b4b3931daffbe16d1ee1369', sourceId: '59f19f4c82100e1594f34bae' },
  // 5: { destRoom: 'W59S12', containerId: '5b4bb999e15e100251f96140', sourceId: '59f19f4c82100e1594f34bac' },
  5: { destRoom: 'W58S12', containerId: '5b4cc5d9030f9449f77f19d2', sourceId: '59f19f5b82100e1594f34d34' },
  // 7: { destRoom: 'W58S13', containerId: '5b5316365b3576529abdde2e', sourceId: '59f1c0cc7d0b3d79de5efece' }, // EXT
  6: { destRoom: 'W58S12', containerId: '5b5318c87c9ee34db2abb8b6', sourceId: '59f19f5b82100e1594f34d35' },
}

Game.rooms['W58S13'].memory.extractorSpawnData = {
  1: { destRoom: 'W58S13', containerId: '5b5316365b3576529abdde2e', sourceId: '59f1c0cc7d0b3d79de5efece' }, // EXT
}
Game.rooms['W58S13'].memory.mineralTransporterSpawnData = {
  1: { destRoom: 'W58S13', containerId: '5b5316365b3576529abdde2e' }
}


// =================================================================================================


Game.rooms['W58S11'].memory.minerSpawnData = {
  1: { destRoom: 'W58S11', containerId: '5b533d73a583d01884937f23', sourceId: '59f19f5a82100e1594f34d32' },
  2: { destRoom: 'W58S11', containerId: '5b534414cf241912d37660d1', sourceId: '59f19f5a82100e1594f34d30' },
  3: { destRoom: 'W59S11', containerId: '5b545cdf2ea6591057aabff4', sourceId: '59f19f4c82100e1594f34ba7' },
  4: { destRoom: 'W57S11', containerId: '5b545bb47c7d694d6b2b3831', sourceId: '59f19f7382100e1594f34ec1' },
  5: { destRoom: 'W59S11', containerId: '5b54a66ca106aa12c70eb947', sourceId: '59f19f4c82100e1594f34ba9' },
}

Game.rooms['W58S11'].memory.transporterSpawnData = {
  1: { destRoom: 'W58S11', containerId: '5b533d73a583d01884937f23' }, // M1
  2: { destRoom: 'W58S11', containerId: '5b534414cf241912d37660d1' }, // M2
  3: { destRoom: 'W59S11', containerId: '5b545cdf2ea6591057aabff4' },
  4: { destRoom: 'W57S11', containerId: '5b545bb47c7d694d6b2b3831' },
  5: { destRoom: 'W59S11', containerId: '5b54a66ca106aa12c70eb947' },
}

Game.rooms['W58S11'].memory.longarvesterSpawnData = {
  // 1: { destRoom: 'W57S11', sourceId: '59f19f7382100e1594f34ec1' },
  // 2: { destRoom: 'W59S11', sourceId: '59f19f4c82100e1594f34ba7' },
  // 1: { destRoom: 'W59S11', sourceId: '59f19f4c82100e1594f34ba9' }
}

Game.rooms['W58S11'].memory.reserverSpawnData = {
  1: { destRoom: 'W59S11' },
  2: { destRoom: 'W59S11' },
  3: { destRoom: 'W57S11' },
  4: { destRoom: 'W57S11' },
}