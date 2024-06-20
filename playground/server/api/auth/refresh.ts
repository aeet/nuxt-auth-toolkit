import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

export default defineEventHandler(() => {
  const newToken = jwt.sign({ payload: uuidv4() }, uuidv4(), { expiresIn: '5s' })
  const newRefreshToken = jwt.sign({ payload: uuidv4() }, uuidv4(), { expiresIn: '7d' })

  return {
    data: {
      access_token: newToken,
      refresh_token: newRefreshToken,
    },
  }
})
