module.exports = function (err, req, res, next) {
  console.error("에러:", err.message);

  switch (err.message) {
    case "InputValidation":
      return res.status(400).send({ errorMessage: "입력된 요청이 잘못되었습니다." });
    case "ExistEmail":
      return res.status(400).send({ errorMessage: "이미 가입된 이메일입니다." });
    case "UserNotFound":
      return res.status(404).send({ errorMessage: "존재하지 않는 사용자입니다." });
    case "PasswordError":
      return res.status(401).send({ errorMessage: "비밀번호가 일치하지 않습니다." });
    case "DataBaseError":
      return res.status(500).send({ errorMessage: "데이터베이스 오류입니다." });
    case "TokenNotMatched":
      return res.status(401).send({ errorMessage: "유효하지 않은 토큰입니다." });
    default:
      return res.status(500).send({ errorMessage: "서버 오류가 발생했습니다." });
  }
};