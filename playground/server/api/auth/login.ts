import jwt from 'jsonwebtoken'
import { v4 } from 'uuid'
import { sleep } from '../../services/sleep'

export default defineEventHandler(() => {
  sleep(3000)
  const token = jwt.sign({ payload: v4() }, v4(), { expiresIn: '5s' })
  const refreshToken = jwt.sign({ payload: v4() }, v4(), { expiresIn: '7d' })

  // return result
  return {
    msg: 'request token access',
    data: {
      access_token: token,
      refresh_token: refreshToken,
    },
  }
})
