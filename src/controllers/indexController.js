const { pool } = require("../../config/database");
//pool : 우리가 만들어 놓은 mysql에 접근할 수 있는 객체
//라이브러리를 써서 db에 접근 할 수 있게 해 놓은거락 보면 됨
const { logger } = require("../../config/winston");
const jwt = require("jsonwebtoken");
const secret = require("../../config/secret");
const indexDao = require("../dao/indexDao");
  
const output = {

    signup : async function(req,res){
        return res.render('signup.ejs');
    },

    login : async function(req,res){
        return res.render('login2.ejs');
    }
}

const process = {
    login : async function(req,res){
      //  console.log(req.body);
      const {userID, password} = req.body;
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

          return res.send(
            {
            result: rows,
            isSuccess: true,
            code: 200, // 요청 실패시 400번대 코드
            message: "user 생성 성공",
          }
          );
        } catch (err) {
          logger.error(`insertUsers Query error\n: ${JSON.stringify(err)}`);
        } finally {
          connection.release();
        }
      } catch (err) {
        logger.error(`insertUsers DB Connection error\n: ${JSON.stringify(err)}`);
        return false;
      }


    //   //console.log(userID, userName, password);
    //   //1. 유저 데이터 검증
    //   const userIDRegExp = /^[a-z]+[a-z0-9]{5,19}$/g;
    //   const passwordRegExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
    //   const userNameRegExp = /^[가-힣|a-z|A-Z|0-9|]{2,10}$/;
    //   console.log(userIDRegExp.test(userID));
    //   if(!userIDRegExp.test(userID)){
    //     return res.send({
    //       isSuccess: false,
    //       code: 400,
    //       message: "아이디 정규식 영문자로 시작하는 영문자 또는 숫자 6-20",
    //     });
    //   }
    //   if(!passwordRegExp.test(password)){
    //     return res.send({
    //       isSuccess: false,
    //       code: 400,
    //       message: "비밀번호 정규식 8-16문자, 숫자 조합",
    //     });
    //   }
    //   if(!userNameRegExp.test(userName)){
    //     return res.send({
    //       isSuccess: false,
    //       code: 400,
    //       message: "이름 정규식 2-10 한글,숫자 또는 영문",
    //     });
    //   }
      
    //   try {
    //     const connection = await pool.getConnection(async (conn)=> conn);
    //     try {
         
        
    //     const [rows] = await indexDao.insertUsers(connection, userID, userName, password);
        
    //     const userIdx = rows.insertID;

    //     const token = jwt.sign(
    //       {userIdx: userIdx, userName: userName},
    //       secret.jwtsecret
    //     );
    //   return res.send({
    //     result: { jwt: token},
    //     isSuccess: true,
    //     code: 200,
    //     message: "회원가입 성공",
    //   });
    //   } catch(err){
    //     logger.error(`createUsers Query error\n: ${JSON.stringify(err)}`)
    //     return false;
    //   }finally {
    //     connection.release();
    //   }
    // } catch(err){
    //   logger.error(`createUsers DB Connection error\n: ${JSON.stringify(err)}`);
    //   return false;  
    // }
    
    //  },
}}



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
};

module.exports = {
    output, process,readUsers
}