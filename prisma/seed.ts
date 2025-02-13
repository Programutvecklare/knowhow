import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const admin = await prisma.user.upsert({
        where: { email: 'email@gmail.com' },
        update: {},
        create: {
            id: '1',
            email: 'email@gmail.com',
            name: 'Admin',
            emailVerified: true,
            role: 'admin'
        },
    })

    await prisma.challenge.createMany({
        data: [
            {
                title: 'Hello World',
                description: 'Write a function that returns the string "Hello World".',
                level: 0,
                boilerplate: `function sayHello() {\n  // Your code here\n}`,
                tips: `1. Use the return keyword to return a string
2. Make sure to use the exact string "Hello World"`,
                tests: `describe('sayHello', [
  test('Should return Hello World', () => {
    expect(sayHello()).toBe('Hello World')
  })
])`,
                userId: admin.id
            },
            {
                title: 'Reverse String',
                description: 'Write a function that reverses a string.',
                level: 0,
                boilerplate: `function reverse(str) {\n  // Your code here\n}`,
                tips: `1. You can convert a string to an array of characters using split('')
2. Arrays have methods that can help reverse elements
3. Remember to join the characters back into a string`,
                tests: `describe('reverse', [
  test('Reverse a simple string', () => {
    expect(reverse('hello')).toBe('olleh')
  }),
  test('Handle empty string', () => {
    expect(reverse('')).toBe('')
  }),
  test('Handle single character', () => {
    expect(reverse('a')).toBe('a')
  })
])`,
                userId: admin.id
            }
        ]
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })