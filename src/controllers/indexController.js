const { pool } = require("../../config/database");
//pool : 우리가 만들어 놓은 mysql에 접근할 수 있는 객체
//라이브러리를 써서 db에 접근 할 수 있게 해 놓은거락 보면 됨
const { logger } = require("../../config/winston");
const jwt = require("jsonwebtoken");
const secret = require("../../config/secret");
const indexDao = require("../dao/indexDao");
  
const output = {

    signup : async function(req,res){
        return res.render('main/signup.ejs');
    },

    login : async function(req,res){
        return res.render('main/login2.ejs');
    },

     main : async function(req,res){
        const {userID} = req.params;
        return res.render('main/select2.ejs');
    },

}


const hospital = async function(req,res){
  return res.render('hospital/hospital.ejs');
}

const pharmacy = async function(req,res){
  return res.render('pharmacy/pharmacy.ejs');
}

const reservation = async function(req,res){
  return res.render('reservation/reservation.ejs');
}


// ---------------
const process = {
    createJwt : async function(req,res){
      const {userID, password} = req.body;
      if(!userID || !password){
        return res.send({
          isSuccess: false,
          code: 400,
          message: "회원정보를 입력해주세요",
        });
      }
    try{
      const connection = await pool.getConnection(async (conn)=>conn);
      try{
        const [rows]=await indexDao.isValidUsers(connection, userID, password);
        console.log(rows);
        //DB 회원 검증
        if(rows.length <1){
          return res.send({
            isSuccess: false,
            code: 410,
            message: "회원정보가 존재하지 않습니다."
          });
        }
        //login pw 확인 알고리즘 추가하기
        const {userIdx, userName} = rows[0];

        const token = jwt.sign(
          {userIdx: userIdx,
          userName: userName},
          secret.jwtsecret
          );  
        return res.send({
          result: {jwt: token},
          isSuccess: true,
          code: 200,
          message: "로그인 성공",
        });
      } 
    catch(err){
      logger.error(`createJwt Query error\n: ${JSON.stringify(err)}`)
      return false;
    }finally {
      connection.release();
    }
  } catch(err){
    logger.error(`createJwtDB Connection error\n: ${JSON.stringify(err)}`);
    return false;  
  }
  
   },


  signup : async function(req,res){
      const {userID, userName, password} = req.body;
      console.log(userID, userName, password);
    // DB에 insert
      try {
        const connection = await pool.getConnection(async (conn) => conn);
        try {
          const [rows] = await indexDao.insertUsers(
            connection,
            userID,
            userName, 
            password
            );
            //console.log(rows);
            const userIdx=rows.insertId;
            const token = jwt.sign(
              {userIdx: userIdx, userName: userName},
              secret.jwtsecret
            );
            
          return res.send({
            result: { jwt : token},
            isSuccess: true,
            code: 200,
            message: "회원가입 성공",
          });
        } catch (err) {
          logger.error(`insertUsers Query error\n: ${JSON.stringify(err)}`);
        } finally {
          connection.release();
        }
      } catch (err) {
        logger.error(`insertUsers DB Connection error\n: ${JSON.stringify(err)}`);
        return false;
      }
      
      try {
        const connection = await pool.getConnection(async (conn)=> conn);
        try {
        const [rows] = await indexDao.insertUsers(connection, userID, userName, password);

  
      } catch(err){
        logger.error(`createUsers Query error\n: ${JSON.stringify(err)}`)
        return false;
      }finally {
        connection.release();
      }
    } catch(err){
      logger.error(`createUsers DB Connection error\n: ${JSON.stringify(err)}`);
      return false;  
    }
     },
  

    getHosIdx : async function(req,res){
      const {hosName} = req.body;
      if(!hosName){
        return res.send({
          isSuccess: false,
          code: 400,
          message: "회원정보를 입력해주세요",
        });
      }
    try{
      const connection = await pool.getConnection(async (conn)=>conn);
      try{
        const [rows]=await indexDao.isValidHos(connection, hosName);
        console.log(rows);
        //DB 회원 검증
        if(rows.length <1){
          return res.send({
            isSuccess: false,
            code: 410,
            message: "해당 병원에 대한 정보가 존재하지 않습니다."
          });
        }
        //login pw 확인 알고리즘 추가하기
        const {hosIdx} = rows[0];

        return res.send({
          isSuccess: true,
          code: 200, // 요청 실패시 400번대 코드
          message: "요청 성공",
          result : hosIdx ,
        });
      } 
    catch(err){
      logger.error(`createhosDB Query error\n: ${JSON.stringify(err)}`)
      return false;
    }finally {
      connection.release();
    }
  } catch(err){
    logger.error(`createhosDB Connection error\n: ${JSON.stringify(err)}`);
    return false;  
  }
  
   },

   reservation : async function(req,res){
    const {hosIdx, Date,Time,userIdx,userName, userNum, userBirth} = req.body;

    if(!hosIdx || !Date || !Time ||! userIdx ||!userName || !userNum || !userBirth){
      return res.send({
        isSuccess: false,
        code: 400,
        message: "회원정보를 입력해주세요",
      });
    }
    try {
      const connection = await pool.getConnection(async (conn) => conn);
      try {
        const [rows] = await indexDao.insertReserv( connection, hosIdx, Date,Time,userIdx,userName, userNum, userBirth);
        //console.log(rows);
        return res.send({
          result: {rows},
          isSuccess: true,
          code: 200,
          message: "회원가입 성공",
        });
      } catch (err) {
        logger.error(`insertReserv Query error\n: ${JSON.stringify(err)}`);
        return res.send({    
          code: 400         
        });
     
      } finally {
        connection.release();
      }
    } catch (err) {
      logger.error(`insertReserv DB Connection error\n: ${JSON.stringify(err)}`);
      return false;
    }
   
  }

}
     


const readUsers = async function(req,res){
    // const {userID} = req.query;
    // console.log(userID);
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        try {
          const [rows] = await indexDao.selectUsers(connection);
        
          return res.send(
            {
            result: rows,
            isSuccess: true,
            code: 200, // 요청 실패시 400번대 코드
            message: "요청 성공",
          }
          );
        } catch (err) {
          logger.error(`readusers Query error\n: ${JSON.stringify(err)}`);
        } finally {
          connection.release();
        }
      } catch (err) {
        logger.error(`readusers DB Connection error\n: ${JSON.stringify(err)}`);
        return false;
      }

    
      
    
  }


const readJwt = async function(req,res){
  const { userIdx, userName } = req.verifiedToken;
  return res.send({
    result: {userIdx: userIdx, userName:userName},
    code: 200,
    message: "유효한 토큰입니다.",
  });
}

const getResInfo = async function(req,res){
  const {userIdx} = req.body;
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const [rows] = await indexDao.selectUserRes(connection,userIdx);
    
      return res.send(
        {
        result: rows,
        isSuccess: true,
        code: 200, // 요청 실패시 400번대 코드
        message: "요청 성공",
      }
      );
    } catch (err) {
      logger.error(`selectUserRes Query error\n: ${JSON.stringify(err)}`);
    } finally {
      connection.release();
    }
  } catch (err) {
    logger.error(`selectUserRes DB Connection error\n: ${JSON.stringify(err)}`);
    return false;
  }

}

module.exports = {
    output, process, hospital, readUsers, readJwt, pharmacy, reservation,getResInfo
}