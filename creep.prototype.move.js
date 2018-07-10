Creep.prototype.moveToRoom = function (roomName, x, y) {
  const creep = this;

  const pos = new RoomPosition(x, y, roomName);
  return creep.moveTo(pos, { reusePath: 10 });
}

