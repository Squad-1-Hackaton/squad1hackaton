const prisma = require('./prisma')

async function main() {
    const admin = await prisma.user.upsert({
        where: { email: 'alice@prisma.io' },
        update: {},
        create: {
        email: 'alice@prisma.io',
        name: 'Alice',
        posts: {
            create: {
            title: 'Check out Prisma with Next.js',
            content: 'https://www.prisma.io/nextjs',
            published: true,
            },
        },
        },
    })
    const trilhaUX = await prisma.user.upsert({
        where: { email: 'bob@prisma.io' },
        update: {},
        create: {
        email: 'bob@prisma.io',
        name: 'Bob',
        posts: {
            create: [
            {
                title: 'Follow Prisma on Twitter',
                content: 'https://twitter.com/prisma',
                published: true,
            },
            {
                title: 'Follow Nexus on Twitter',
                content: 'https://twitter.com/nexusgql',
                published: true,
            },
            ],
        },
        },
    })
    const trilhaDEV = await prisma.user.upsert({
        where: { email: 'bob@prisma.io' },
        update: {},
        create: {
        email: 'bob@prisma.io',
        name: 'Bob',
        posts: {
            create: [
            {
                title: 'Follow Prisma on Twitter',
                content: 'https://twitter.com/prisma',
                published: true,
            },
            {
                title: 'Follow Nexus on Twitter',
                content: 'https://twitter.com/nexusgql',
                published: true,
            },
            ],
        },
        },
    })
    const trilhaDEV = await prisma.user.upsert({
        where: { email: 'bob@prisma.io' },
        update: {},
        create: {
        email: 'bob@prisma.io',
        name: 'Bob',
        posts: {
            create: [
            {
                title: 'Follow Prisma on Twitter',
                content: 'https://twitter.com/prisma',
                published: true,
            },
            {
                title: 'Follow Nexus on Twitter',
                content: 'https://twitter.com/nexusgql',
                published: true,
            },
            ],
        },
        },
    })
}
main()