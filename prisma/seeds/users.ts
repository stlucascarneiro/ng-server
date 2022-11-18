import bcrypt from "bcrypt";

interface IUserSeed{
  username: string
  password: string
}

export const dataUsers = async (): Promise<{data: IUserSeed[]}> => {
  async function generateHashPassword(password: string): Promise<string> {
    const hashCost: number = 12;
    const hashPassword: string = await bcrypt.hash(password, hashCost)
    return hashPassword
  }

  return {
    data: [
      {
        username: 'thiagosales',
        password: await generateHashPassword('Senha123'),
      },
      {
        username: 'luanmonteiro',
        password: await generateHashPassword('Senha123'),
      },
      {
        username: 'brunalopes',
        password: await generateHashPassword('Senha123'),
      },
      {
        username: 'melissarocha',
        password: await generateHashPassword('Senha123'),
      }
    ]
  }
}