const prisma = require('../database/prisma')
const User = require('../models/User')

class UserRepository {
  constructor() {
    this.users = []
  }

  async createUser({ email, password }) {
    const user = await prisma.user.create({
      data: {
        email,
        password
      }
    })

    console.log('Created new user', { user })
  }
}

module.exports = UserRepository
