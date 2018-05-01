import jwt from 'jsonwebtoken'
const jwtSecret = {
  secret: 'secret',
  options: {
    expiresIn: '3600s'
  } //以秒为单位
}
import bcryty from 'bcryptjs'
const saltRounds = 10

const pwdHash = pwd => {
  return bcryty.hash(pwd, saltRounds)
}
const pwdCompare = (myPlaintextPassword, hash) => {
  return bcryty.compare(myPlaintextPassword, hash)
}
/*  jwt加密  */
const signToken = payload => {
  return jwt.sign(payload, jwtSecret.secret, jwtSecret.options)
}

const decodeToken = token => {
  return jwt.decode(token, { complete: true })
}
/*  jwt验证  */
const verifyToken = token => {
  return jwt.verify(token, jwtSecret.secret)
}

// 更新 access_token, 保持单点登录
const updateToken = async (user, req) => {
  let token = uuid.v4()
  req.session.token = token
  req.session.is_admin = user.admin
  user.access_token = token
  return await user.save()
}

export { updateToken, decodeToken, signToken, verifyToken, pwdHash, pwdCompare }
