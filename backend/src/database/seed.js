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
                name: 'UX/UI Design',
            },
        })
    } catch (error) {
        console.log('Erro na criação da trilha UX')
    }

    try {
        await prisma.trails.create({
            data: {
                name: 'DEV',
            },
        })
    } catch (error) {
        console.log('Erro na criação da trilha DEV')
    }

    try {
        await prisma.trails.create({
            data: {
                name: 'QA'
            }
        })
    } catch (error) {
        console.log('Erro na criação da trilha DEVOPS')
    }
    try {
        await prisma.trails.create({
            data: {
                name: 'Errada'
            }
        })
    } catch (error) {
        console.log('Erro na criação da trilha DEVOPS')
    }
}
main()