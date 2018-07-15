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
}

Game.rooms['W58S13'].memory.longarvesterSpawnData = {
  1: { destRoom: 'W58S12', sourceId: '59f19f5b82100e1594f34d34' },
  // 2: { destRoom: 'W59S12', sourceId: '59f19f4c82100e1594f34bac' },
  // 3: { destRoom: 'W57S12', sourceId: '59f19f7382100e1594f34ec6' },
}

Game.rooms['W58S13'].memory.transporterSpawnData = {
  1: { destRoom: 'W58S13', containerId: '5b468973a323e768731e21e9' }, // M1
  2: { destRoom: 'W58S13', containerId: '5b468715a4291461ca51c495' }, // M2
  3: { destRoom: 'W58S12', containerId: '5b4b0e2fd0e6f062069873fa' }, // M3
  4: { destRoom: 'W59S13', containerId: '5b4b1619fce63f435a317a7a' }, // M4
  5: { destRoom: 'W59S13', containerId: '5b4b3931daffbe16d1ee1369' }, // M5
  6: { destRoom: 'W59S13', containerId: '5b4b1619fce63f435a317a7a' }, // M4
  7: { destRoom: 'W59S13', containerId: '5b4b3931daffbe16d1ee1369' }, // M5
  8: { destRoom: 'W59S13', containerId: '5b4b3931daffbe16d1ee1369' }, // M5
  9: { destRoom: 'W59S12', containerId: '5b4b3931daffbe16d1ee1369' }, // M6
  10: { destRoom: 'W59S12', containerId: '5b4b3931daffbe16d1ee1369' }, // M6
}

Game.rooms['W58S13'].memory.minerSpawnData = {
  1: { destRoom: 'W58S13', containerId: '5b468973a323e768731e21e9', sourceId: '59f19f5b82100e1594f34d3a' },
  2: { destRoom: 'W58S13', containerId: '5b468715a4291461ca51c495', sourceId: '59f19f5b82100e1594f34d38' },
  3: { destRoom: 'W58S12', containerId: '5b4b0e2fd0e6f062069873fa', sourceId: '59f19f5b82100e1594f34d35' },
  4: { destRoom: 'W59S13', containerId: '5b4b1619fce63f435a317a7a', sourceId: '59f19f4c82100e1594f34baf' },
  5: { destRoom: 'W59S13', containerId: '5b4b3931daffbe16d1ee1369', sourceId: '59f19f4c82100e1594f34bae' },
  6: { destRoom: 'W59S12', containerId: '5b4bb999e15e100251f96140', sourceId: '59f19f4c82100e1594f34bac' },
}