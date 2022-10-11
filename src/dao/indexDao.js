const { pool } = require("../../config/database");

exports.insertUsers = async function (connection, userID, userName, password) {
  const Query = `insert into user(userID,userName,password) values(?,?,?);`;
  const Params = [userID,userName,password];

  const rows = await connection.query(Query, Params);

  return rows;
};

exports.selectUsers = async function (connection, params) {
  const Query = `select * from user`;
  const Params = [];

  const rows = await connection.query(Query, Params);

  return rows;
};

exports.isValidUsers = async function (connection, userID,password) {
  const Query = `select userIdx, userName from user WHERE userID = ? and password = ? and status='A';`;
  
  const Params = [userID,password];

  const rows = await connection.query(Query, Params);

  return rows;
};


exports.isValidHos = async function (connection, hosName) {
  const Query = `select hosIdx from hospitals WHERE hosName = ?;`;
  
  const Params = [hosName];

  const rows = await connection.query(Query, Params);

  return rows;
};


exports.insertReserv = async function (connection,hosIdx, Date,Time,userIdx,userName, userNum, userBirth) {
  const Query = `insert into reservation(hosIdx, Date,Time,userIdx,userName, userNum, userBirth) values(?,?,?,?,?,?,?);`;
  const Params = [hosIdx, Date,Time,userIdx,userName, userNum, userBirth];

  const rows = await connection.query(Query, Params);

  return rows;
};

exports.selectUserRes = async function (connection, userIdx) {
  //const Query = `select * from reservation WHERE userIdx = ?;`;
  const Query = `select * from reservation inner join hospitals on reservation.hosIdx = hospitals.hosIdx where userIdx = ?
  `
  const Params = [userIdx];

  const rows = await connection.query(Query, Params);

  return rows;
};




// exports.insertHospital = async function (connection, userID, userName, password) {
//   const Query = `insert into user(userID,userName,password) values(?,?,?);`;
//   const Params = [userID,userName,password];

//   const rows = await connection.query(Query, Params);

//   return rows;
// };