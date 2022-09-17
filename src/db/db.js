import Dexie from "dexie";

const db = new Dexie("t-tree-db");

db.version(2).stores({
  tasks: "_id, title, done, _hash, _rev, _deleted",
});

db.version(3)
  .stores({
    tasks: "_id, title, done, _hash, _rev, _deleted, _createdAt, _updatedAt",
  })
  .upgrade((trans) => {
    return trans.tasks.toCollection().modify({ _createdAt: 0, _updatedAt: 0 });
  });

db.version(4).stores({
  tasks: "_id, title, done, _hash, _rev, _deleted, _createdAt, _updatedAt",
  sync: "sync_id, type, _id, title, done, _hash, _rev, _deleted, _createdAt, _updatedAt, _changedAt",
});

export default db;
