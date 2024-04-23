import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insertUser(username: string, password: string, firstName: string, lastName: string) {
  const res =  await prisma.user.create({
    data: {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName
    }
  }) 
  console.log(res);
}

// insertUser("cb7chaitanya@gmail.com", "halamadrid", "chaitanya", "bajpai")

interface UpdateParams {
    firstName: string;
    lastName: string;
}

async function updateUser(username: string, {
    firstName,
    lastName
}: UpdateParams) {
  prisma.user.update({
    where: {
        username: username},
    data: {
        firstName: firstName,
        lastName: lastName
    }
  })
}

// updateUser("cb7chaitanya@gmail.com", {firstName: "Chaitanya", lastName: "Bajpai"})

async function getUser(username: string) {
  const res =  await prisma.user.findFirst({
    where: {
        username: username
    }
  })
  console.log(res)
}

// getUser("cb7chaitanya@gmail.com")

interface deleteParams {
    username: string;
    password: string;
}

async function deleteUser({username , password} : deleteParams){
    await prisma.user.delete({
        where : {
            username: username, 
            password: password
        },
    })
    console.log (`User ${username} deleted successfully`)
}

deleteUser({username : "cb7chaitanya@gmail.com", password : "halamadrid"})