const prisma = require('./prisma')
const UserRepository = require('../modules/users/repositories/UserRepository')
const CreateUserService = require('../modules/users/services/createUser/CreateUserService')


async function main() {
    const userRepository = new UserRepository()
    const createUserService = new CreateUserService(userRepository)

    try {
        await createUserService.execute({
            email: 'admin@gmail.com',
            password: '123456',
            name:'Usuário admin'
        })
    } catch (error) {
        console.log('Erro na criação do usuário')
    }
    
    try {
        await prisma.trails.create({
            data: {
                name: 'Trilha UX/UI',
            },
        })
    } catch (error) {
        console.log('Erro na criação da trilha UX')
    }

    try {
        await prisma.trails.create({
            data: {
                name: 'Trilha DEV',
            },
        })
    } catch (error) {
        console.log('Erro na criação da trilha DEV')
    }

    try {
        await prisma.trails.create({
            data: {
                name: 'Trilha QA'
            }
        })
    } catch (error) {
        console.log('Erro na criação da trilha DEVOPS')
    }
}
main()