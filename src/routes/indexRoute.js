module.exports = function(app){
    const index = require("../controllers/indexController");
    const jwtMiddleware = require("../../config/jwtMiddleware");

    //라우터 정의
    //app.HTTP메소드(uri, 컨트롤러 콜백함수)
    app.get("/signup", index.output.signup);
    app.get("/login",index.output.login);
    app.get("/main",index.output.main);

    //병원 별 api
    //app.get("/hospital_eye", index.hospital.hospital_eye);
    // app.get("/hospital_hb", index.hospital.hospital_hb);
    // app.get("/hospital_jh", index.hospital.hospital_jh);
    // app.get("/hospital_n", index.hospital.hospital_n);
    // app.get("/hospital_no", index.hospital.hospital_no);
    // app.get("/hospital_sk", index.hospital.hospital_sk);
    // app.get("/hospital_skin", index.hospital.hospital_skin);
    // app.get("/hospital_t", index.hospital.hospital_t);
    app.get("/hospital", index.hospital);

    app.get("/pharmacy", index.pharmacy);
    //로그인
    app.post("/login",index.process.createJwt);
    //회원가입 
    app.post("/signup",index.process.signup);
    
    //로그인 유지, 토큰 검증
    app.get("/jwt", jwtMiddleware, index.readJwt);

    //유저조회
    app.get("/users", index.readUsers);
   };
