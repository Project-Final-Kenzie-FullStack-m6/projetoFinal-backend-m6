# Desafio 1

To start this project, it is necessary to install the dependencies, which will be used in the tests. To install you need to open a Integrated Terminal of the folder, then use the command below to install such dependencies:

````
yarn install or npm install
````
<br>

With that done, to run your application you need to do the following steps, set your .env using the .env.exemple as exemple. After run the following code on your backend terminal "yarn typeorm migration:run -d src/data-source", after that done you just need to use the following command.
````
yarn dev
````
<br> 
# **About the routes**


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
