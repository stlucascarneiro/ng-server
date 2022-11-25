# Porfolio - Lucas Carneiro

Esse repositório representa a camada de back end de um teste técnico proposto pela NG Cash para validar meus conhecimentos em engenharia de software.
A Aplicação desenvolvida utiliza Typescript, PostgreSQL, Prisma, Apollo Server, GraphQL e Nexus

## Estrutura

### Prisma
Prisma é um ORM que realiza a conexão, migrates, seed e consultas a partir de um schema presente em `/prisma`. Para cada alteração no schema é possível realizar a sincronização com o banco gerando um registro. Ali também está presente os seeds para testes em ambiente de dev. Todas as operações estão na [documentação](https://www.prisma.io/docs/reference/api-reference/command-reference).

### GraphQL Nexus
Graças ao Nexus é possível definir os objectTypes e os resolvers por um padrão Code First, presente em `/src/schemas`. Os objects são o mapeamento de objetos de respostas da API já as Queries e Mutations são o ponto de entrada definindo argumentos e resolvers.

### Controllers
Em `/src/controllers` estão todas as ações da aplicação divididas por entidades.

### Documentação
O Apollo disponibiliza uma interface com todas as rotas da API com todas as informações de requisição e resposta. Para ter acesso basta executar `yarn dev` e acessar http://localhost:4000.