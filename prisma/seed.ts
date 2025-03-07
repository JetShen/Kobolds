import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Clean up existing data
  await prisma.comment.deleteMany()
  await prisma.activity.deleteMany()
  await prisma.sector.deleteMany()
  await prisma.team.deleteMany()
  await prisma.invitation.deleteMany()
  await prisma.user.deleteMany()
  await prisma.company.deleteMany()

  // Create admin user
  const hashedPassword = await bcrypt.hash('password123', 10)
  
  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: Role.ADMIN,
    },
  })

  // Create a company
  const company = await prisma.company.create({
    data: {
      name: 'Acme Corporation',
      description: 'A global technology company',
      website: 'https://acme.example.com',
    },
  })

  // Update admin user with company
  await prisma.user.update({
    where: { id: adminUser.id },
    data: { companyId: company.id },
  })

  // Create manager user
  const managerUser = await prisma.user.create({
    data: {
      name: 'Manager User',
      email: 'manager@example.com',
      password: hashedPassword,
      role: Role.MANAGER,
      companyId: company.id,
    },
  })

  // Create employee user
  const employeeUser = await prisma.user.create({
    data: {
      name: 'Employee User',
      email: 'employee@example.com',
      password: hashedPassword,
      role: Role.EMPLOYEE,
      companyId: company.id,
    },
  })

  // Create teams
  const developmentTeam = await prisma.team.create({
    data: {
      name: 'Development Team',
      description: 'Software development team',
      companyId: company.id,
      creatorId: adminUser.id,
    },
  })

  const marketingTeam = await prisma.team.create({
    data: {
      name: 'Marketing Team',
      description: 'Marketing and sales team',
      companyId: company.id,
      creatorId: adminUser.id,
    },
  })

  // Assign users to teams
  await prisma.user.update({
    where: { id: managerUser.id },
    data: { teamId: developmentTeam.id },
  })

  await prisma.user.update({
    where: { id: employeeUser.id },
    data: { teamId: developmentTeam.id },
  })

  // Create sectors
  const frontendSector = await prisma.sector.create({
    data: {
      name: 'Frontend',
      description: 'Frontend development',
      companyId: company.id,
      teamId: developmentTeam.id,
    },
  })

  const backendSector = await prisma.sector.create({
    data: {
      name: 'Backend',
      description: 'Backend development',
      companyId: company.id,
      teamId: developmentTeam.id,
    },
  })

  const digitalMarketingSector = await prisma.sector.create({
    data: {
      name: 'Digital Marketing',
      description: 'Digital marketing campaigns',
      companyId: company.id,
      teamId: marketingTeam.id,
    },
  })

  // Create activities
  const activities = await Promise.all([
    prisma.activity.create({
      data: {
        title: 'Website Redesign',
        description: 'Redesign the company website with new branding',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        startDate: new Date('2025-06-01'),
        dueDate: new Date('2025-06-15'),
        companyId: company.id,
        teamId: developmentTeam.id,
        sectorId: frontendSector.id,
        assigneeId: employeeUser.id,
      },
    }),
    prisma.activity.create({
      data: {
        title: 'API Integration',
        description: 'Integrate payment gateway API',
        status: 'CREATED',
        priority: 'MEDIUM',
        dueDate: new Date('2025-06-20'),
        companyId: company.id,
        teamId: developmentTeam.id,
        sectorId: backendSector.id,
      },
    }),
    prisma.activity.create({
      data: {
        title: 'Database Optimization',
        description: 'Optimize database queries for better performance',
        status: 'ASSIGNED',
        priority: 'HIGH',
        startDate: new Date('2025-06-05'),
        dueDate: new Date('2025-06-10'),
        companyId: company.id,
        teamId: developmentTeam.id,
        sectorId: backendSector.id,
        assigneeId: managerUser.id,
      },
    }),
    prisma.activity.create({
      data: {
        title: 'Social Media Campaign',
        description: 'Launch social media campaign for new product',
        status: 'CREATED',
        priority: 'MEDIUM',
        dueDate: new Date('2025-06-25'),
        companyId: company.id,
        teamId: marketingTeam.id,
        sectorId: digitalMarketingSector.id,
      },
    }),
  ])

  // Create comments
  await prisma.comment.create({
    data: {
      content: 'Making good progress on the homepage redesign',
      activityId: activities[0].id,
      authorId: employeeUser.id,
    },
  })

  await prisma.comment.create({
    data: {
      content: 'Let me know if you need any help with the responsive design',
      activityId: activities[0].id,
      authorId: managerUser.id,
    },
  })

  console.log('Database seeded successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })