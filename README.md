# Desafio 1

Para iniciar este projeto, é necessário instalar as dependências, que serão utilizadas nos testes. Para instalar você precisa abrir um Terminal Integrado da pasta, então utilize o comando abaixo para instalar tais dependências:

````
yarn install or npm install
````
<br>

Feito isso, para rodar sua aplicação você precisa seguir os seguintes passos, configure seu .env usando o .env.exemple como exemplo. Depois de executar o seguinte código em seu terminal de back-end "yarn typeorm migration: run -d src/data-source", depois disso, você só precisa usar o seguinte comando.
````
yarn dev
````
<br> 
# **Sobre as rotas**


````
Route User :
POST: /users - {Parameters: name(tipo string), email(tipo string), phoneNumber(tipo number), birthDate(tipo string, passando formato DD/MM/AAAA), password(tipo string), cpf(tipo number), isSeller(tipo boolean), description(tipo string), address(tipo objeto, com os campos a seguir), cep(tipo number), state(tipo string com apenas as iniciais do estado. Exemplo: SP), city(tipo string), street(tipo string), number(tipo number)}

POST: /users/resetPassword - {Parameters: email(tipo string)}

GET: /users/ - {Token de autorização necessário para trazer as informações do usuário logado}

PATCH: /users/ - {Todos os campos a seguir são opcionais. Parameters: name(tipo string), email(tipo string), phoneNumber(tipo number), birthDate(tipo string, passando formato DD/MM/AAAA), password(tipo string), cpf(tipo number), isSeller(tipo boolean), description(tipo string), address(tipo objeto, com os campos a seguir), cep(tipo number), state(tipo string com apenas as iniciais do estado. Exemplo: SP), city(tipo string), street(tipo string), number(tipo number)}{Token de autorização necessário}

PATCH: /users/resetPassword/:resetToken - {Parameters: password(tipo number)}

DELETE: /user/ - {Token de autorização necessário}
````
````
Route Session :
POST: /login - {Parameters: email(tipo string), password(tipo string)}
````  
````
Route Advertisement :
POST: /adversiments/ - {Parameters: brand(tipo string), model(tipo string), age(tipo number), fuelType(tipo string), mileage(tipo number), price(tipo number), color(tipo string), description(tipo string), fipe(tipo number), images(tipo objeto com os seguintes parametros), imagem(tipo array com o seguinte parametro), imageUrl(tipo string)}{Token de autorização necessário}

GET: /adversiments/- {Bring all advertisements}

GET: /adversiments/:id - {URL Parameters => :id(O parâmetro ":id" é o id do anúncio que você está tentando verificar)}

PATCH: /adversiments/:id - {URL Parameters => :id(O parâmetro ":id" é o id do anúncio que você está tentando atualizar)}{Todos os campos a seguir são opcionais. Parameters: brand(tipo string), model(tipo string), age(tipo number), fuelType(tipo string), mileage(tipo number), price(tipo number), color(tipo string), description(tipo string), fipe(tipo number), images(tipo objeto com os seguintes parametros), imagem(tipo array com o seguinte parametro), imageUrl(tipo string)}{Token de autorização necessário}

DELETE: //adversiments/:id - {URL Parameters => :id(O parâmetro ":id" é o id do anúncio que você está tentando deletar)}{Authorization Token necessary}
````
````
Route Session :
POST: /comments/:id - {URL Parameters => :id(O parâmetro ":id" é o id do anúncio que você está tentando comentar)}{Parameters: content(tipo string)}{Token de autorização necessário}

GET: /comments/:id - {URL Parameters => :id(O parâmetro ":id" é o id do anúncio que você está tentando checar)}

PATCH: /comments/:id - {URL Parameters => :id(O parâmetro ":id" é o id do anúncio que você está tentando atualizar)}{Parameters: content(tipo string)}{Token de autorização necessário}

DELETE: /comments/:id - {URL Parameters => :id(O parâmetro ":id" é o id do anúncio que você está tentando atualizar)}{Token de autorização necessário}
````  
<br>

# **Sobre os testes**

Esta aplicação possui testes, que serão utilizados para validar se todas as regras de negócio foram aplicadas corretamente.

Os testes estão localizados em `src/__tests__`.

Na subpasta `integration` estão os testes.

No arquivo `jest.config.json` estão algumas configurações necessárias para a execução dos testes.

**`Não altere nenhum desses arquivos de forma alguma.`** Isso pode comprometer a integridade dos testes.

Além disso, não altere o script `test` localizado em `package.json`. Isso será usado para executar os testes.


<br>


# **Executando os testes** 

Para rodar os testes é necessário que em seu terminal você esteja dentro do diretório do projeto.

Uma vez no terminal e dentro do caminho correto, você pode usar os seguintes comandos:

### Executar todos os testes
````
yarn test
````


<br>


**Caso queira verificar todas as opções de execução do teste, visite a [Documentação oficial do Jest](https://jestjs.io/docs/cli)**

Após executar um dos comandos, um log aparecerá em seu terminal, contendo as informações de execução do teste.

**Observação:** O teste pode levar alguns segundos para ser concluído. Quanto maior o teste, mais tempo leva para ser executado.

#
