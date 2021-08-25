## Bank Atm

## Descrição

### Contexto

Uma agência teve uma idéia de ATM que enviará o dinheiro para a casa dos seus cliente, para isso algumas regras precisaram ser criadas para reduzir certos custos e a idéia de pacotes foi elaborada.

Esta agência precisa de uma interface gráfica para que seus clientes possam se cadastrar e operar seus pedidos.

### Regras de negócio

### Pacotes

- Cada pacote tem um limite de notas que pode carregar
- Cada pacote pode conter apenas um tipo de nota (10 - 50 - 100)
- Cada pacote contem informação das operações estão nele
- Quando esse pacote foi aberto
- Quando ele foi fechado
- É criado um pacote aberto toda vez que um pacote alcança seu limite.
- Um pacote é considerado fechado uma vez que ele atinja o seu limite.
- A leitura e listagem dos pacotes deve ser protegida por autenticação.

### Operação

- Toda operação possui um cliente
- Toda operação possui um valor
- Toda operação tem valor limite de 5000
- Uma operação pode possuir preferencia de notas (10 -50 - 100)
- Caso uma operação seja grande demais para entrar em qualquer pacote ela deve ser subdivida em operações menores que referencie a maior.
- Uma operação está aberta quando é criada.
- Uma operação está reservada quando é alocada a um pacote.
- Uma operação está concluída quando o pacote é fechado.
- Deve ser possível criar, ler e listar operações.

### Cliente

- Todo cliente possui nome, endereço, data de nascimento e cpf
- Deve ser possível criar, ler, atualizar e deletar um cliente.

## Resumo de páginas

- Uma page de login.
- Uma page de cadastro de cliente.
- Uma page de atualização e remoção de cliente.
- Uma page de inserção de operação.
- Uma page de listagem de operações deste cliente.
- Uma page de listagem de pacotes.
