const prisma = require('./prisma')
const UserRepository = require('../modules/users/repositories/UserRepository')
const CreateUserService = require('../modules/users/services/createUser/CreateUserService')


async function main() {
    const userRepository = new UserRepository()
    const createUserService = new CreateUserService(userRepository)

    await createUserService.execute({
        email: 'admin@gmail.com',
        password: '123456',
        name:'Usuário admin'
    })
    //EXEMPLO DE QUERY
    // await prisma.users.findMany({
    //     include:{
    //         users_content: {
    //             select:{
    //                 id: true,
    //             },
    //             include:{
    //                 trails: true
    //             }
    //         }
    //     }
    // })
    await prisma.trails.create({
        data: {
            name: 'Trilha UX/UI',
        },
    })
    await prisma.trails.create({
        data: {
        name: 'Trilha DEV',
        },
    })
    await prisma.trails.create({
        data: {
        name: 'Trilha DEVOPS'
        }
    })
}
main()