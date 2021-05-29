# Study Manager

## 1. Introdução

<p align="justify">
Esta é a documentação para te orientar a como utilizar a API, será mostrado todos os endpoints disponíveis e suas respostas e requisições.
</p>

## 2. Visão Geral

<p align="justify">
O Study Manager é uma API de organização de projetos e estudos, onde o usuário pode criar projetos e dentro destes projetos o usuário pode organizar tarefas, adicionando nome, descrição e data de entrega.</br>
O Study Manager tem como objetivo ajudar seus usuários a organizarem as suas tarefas, assim facilitando a execução e o desenvolvimento de projetos ou planos de estudo. Além de armazenar outras informações que podem ser usadas conforme a necessidade do usuário como, por exemplo, horas totais de estudo.
</p>

## 3. User

| Parâmetro | Valor Padrão | Descrição | Required |
|---|:---:|---|:---:|
| email | null | Email do usuário. | true |  
| password | null | Senha do usuário. </br> Deve ser maior que 6 dígitos. | true |  
| name | null | Nome do usuário. | true |  
| username | null | Nome de Usuario do usuário. | true |  
| photo | null | Foto do usuário. | false |  
| totalStudyHours | 0 | Total de horas de estudos do usuário. | false | 
| score | 0 | Pontuação do usuário. | false | 
| trophies | 0 | Quantidade de troféus do usuário. | false | 

### 3.1 Cadastro e Autenticação de usuários

<p align="justify">
Para poder ter acesso às demais funcionalidades da API, é necessário que o usuário seja autenticado e para isso é preciso que esse usuário tenha um cadastro na API. 
O cadastro necessita de 4 parâmetros obrigatórios que são: e-mail, password, name e username.
Este cadastro pode ser realizado seguindo o exemplo abaixo.
</p>

### Exemplo: 

| Método | URL |
|:---:|---|
| POST | http://localhost:3000/user/signup |

|Headers| Valor |
|---|---|
| Content-Type | application/json |

***Request Body:***
<pre>
{ 
  "email":"userexample@gmail.com",
  "password":"123456789",
  "name":"User Example",
  "username":"User"
}
</pre>

***Response:***
<pre>
{
  "message": "Auth Success!",
  "UserId": "60b27c4594e6e827fc2c6d0d",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJleGFtcGxlQGdtYWlsLmNvbSIsInVzZXJJZCI6IjYwYjI3YzQ1OTRlNmU4MjdmYzJjNmQwZCIsImlhdCI6MTYyMjMwOTk1N30.Ha9CMaeKCkzvt7vhAporC_TGyhxo9PINLx3TT-KqWzk"
}
</pre>

<p align="justify">
Ao realizar o cadastro a API retorna uma mensagem de sucesso e dois parâmetros o UserId e o token, 
para que a autenticação seja realizada com sucesso é necessário que esses parâmetros sejam passados pelo header como segue o exemplo:
</p>

### Exemplo: 

|Headers| Valor |
|---|---|
| Content-Type | application/json |
| Authorization | Bearer token |
| userId | 60b27c4594e6e827fc2c6d0d |

Desta forma permitindo que o usuário tenha acesso às demais funcionalidades da API.

### 3.2 Login do usuário

<p align="justify">
Para realizar o login do usuário é necessário de apenas dois parâmetros obrigatórios: email e senha. Eles são feitos pela seguinte URL apresentada no exemplo. 
</p>

### Exemplo:

| Método | URL |
|:---:|---|
| POST | http://localhost:3000/user/login |

|Headers| Valor |
|---|---|
| Content-Type | application/json |

***Request Body:***
<pre>
{ 
  "email":"userexample@gmail.com",
  "password":"123456789"
}
</pre>

***Response:***
<pre>
{
  "message": "Auth Success!",
  "UserId": "60b27c4594e6e827fc2c6d0d",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJleGFtcGxlQGdtYWlsLmNvbSIsInVzZXJJZCI6IjYwYjI3YzQ1OTRlNmU4MjdmYzJjNmQwZCIsImlhdCI6MTYyMjMxNDI2MH 0.7oaNfRGnr20IB0alK9ip_S5FaGV8Zdv88cEcsUb_8Po"
}
</pre>

A autenticação funciona da mesma forma como é mostrado no subtópico anterior.

### 3.3 Obter informações do usuário

Para obter as informações do usuário este usuário deve estar autenticado na API, será retornado todas as informações relativas ao usuário. 

| Método | URL |
|:---:|---|
| GET | http://localhost:3000/user/ |

|Headers| Valor |
|---|---|
| Content-Type | application/json |
| Authorization | Bearer token |
| userId | 60b27c4594e6e827fc2c6d0d |

***Response:***
<pre>
{
  "user":{
    "totalStudyHours": 0,
    "score": 0,
    "trophies": 0,
    "_id": "60b27c4594e6e827fc2c6d0d",
    "email": "userexample@gmail.com",
    "password": "$2b$10$g9W7kGmb2ZDzYkIueKyn0OAr7F8VK90rPXPe7gtCqx3Hf4034IYq2",
    "name": "User Example",
    "username": "User",
    "__v": 0
  }
}
</pre>

### 3.4 Atualizando informações do usuário

<p align="justify">
Para atualizar as informações do usuário basta informar o parâmetro e o valor desejado, os parâmetros não são sobrescritos, então a atualização pode acontecer sem a preocupação se um valor de um parâmetro será apagado. A alteração apenas ocorre nos parâmetros passados pelo Body com seus respectivos valores. 
</p>

### Exemplo:

| Método | URL |
|:---:|---|
| PATCH | http://localhost:3000/user/ |

|Headers| Valor |
|---|---|
| Content-Type | application/json |
| Authorization | Bearer token |
| userId | 60b27c4594e6e827fc2c6d0d |

***Request Body:***
<pre>
{ 
  "name":"User test",
  "username": "Usertest",
  "trophies": 20
}
</pre>

***Response:***
<pre>
{
  "message": "Success in Update!",
  "user":{
    "totalStudyHours": 0,
    "score": 0,
    "trophies": 20,
    "_id": "60b27c4594e6e827fc2c6d0d",
    "email": "userexample@gmail.com",
    "password": "$2b$10$g9W7kGmb2ZDzYkIueKyn0OAr7F8VK90rPXPe7gtCqx3Hf4034IYq2",
    "name": "User test",
    "username": "Usertest",
    "__v": 0
  }
}
</pre>

### 3.5 Deletar usuário

<p align="justify">
Ao deletar o usuário todas as suas informações são apagadas permanentemente, então tenha muito cuidado ao usar esta funcionalidade.
</p>

### Exemplo:

| Método | URL |
|:---:|---|
| DELETE | http://localhost:3000/user/ |

|Headers| Valor |
|---|---|
| Content-Type | application/json |
| Authorization | Bearer token |
| userId | 60b27c4594e6e827fc2c6d0d |

***Response:***
<pre>
{
  message: "Success in delete account!"
}
</pre>

### 3.6 Obter, Atualizar e Remover foto do usuário

<p align="justify">
Para obter, atualizar e remover a foto do usuário basta utilizar os respectivos métodos GET, PATCH e DELETE na mesma URL.
</p>

### Exemplo:

|Headers| Valor |
|---|---|
| Content-Type | application/json |
| Authorization | Bearer token |
| userId | 60b27c4594e6e827fc2c6d0d |

### Obter foto:

| Método | URL |
|:---:|---|
| GET | http://localhost:3000/user/photo |

***Response:***
<pre>
{
  "photo": "uploads\\2021-05-29T19-33-14.034Zfoto3X4_01.jpg",
  "link": "/uploads\\2021-05-29T19-33-14.034Zfoto3X4_01.jpg"
}
</pre>

### Atualizar foto:

| Método | URL |
|:---:|---|
| PATCH | http://localhost:3000/user/photo |

***Response:***
<pre>
{
  "message": "Success in Update Photo!",
  "photo": "uploads\\2021-05-29T19-43-25.265Zfoto3X4_01.jpg",
  "url": "/uploads\\2021-05-29T19-43-25.265Zfoto3X4_01.jpg"
}
</pre>

<p align="justify">
<b>Observação:</b> Para atualizar a foto é necessário adicionar mais um parâmetro no Header, como segue abaixo.
</p>

|Headers| Valor |
|---|---|
| Content-Type | application/json |
| Authorization | Bearer token |
| userId | 60b27c4594e6e827fc2c6d0d |
| Content-Type | multipart/form-data |

### Remover foto:

| Método | URL |
|:---:|---|
| DELETE | http://localhost:3000/user/photo |

***Response:***
<pre>
{
  "message": "Success in Remove Photo!"
}
</pre>

## 4. Project

| Parâmetro | Valor Padrão | Descrição | Required |
|---|:---:|---|:---:|
| idUser | null | Id do usuário. | true | 
| name | null | Nome do projeto. | true |  
| description | null | Descrição do projeto. | false |  
| tasks | null | Array de tarefas do projeto. | false |  

### 4.1 Criação de projetos

<p align="justify">
Para criar projetos é obrigatório ser passado apenas dois métodos, o <b>id do usuário</b> e o nome do projeto, entretanto o <b>id do usuário</b> já é passado pelo header, então é necessário somente o nome do projeto.
</p>

### Exemplo:

| Método | URL |
|:---:|---|
| POST | http://localhost:3000/projects/ |

|Headers| Valor |
|---|---|
| Content-Type | application/json |
| Authorization | Bearer token |
| userId | 60b27c4594e6e827fc2c6d0d |

***Request Body:***
<pre>
{ 
  "name":"New Project",
  "description":"Project test"
}
</pre>

***Response:***
<pre>
{
  "project":{
    "_id": "60b2aea494e6e827fc2c6d0e",
    "name": "New Project",
    "description": "Project test",
    "tasks":[],
    "idUser": "60b27c4594e6e827fc2c6d0d",
    "__v": 0
  }
}
</pre>

### 4.1 Obtenção de projetos

### 4.1.1 Obter todos os projetos do usuário

Para obter todos os projetos do usuário basta utilizar o método GET na URL especificada.

### Exemplo:

| Método | URL |
|:---:|---|
| GET | http://localhost:3000/projects/ |

|Headers| Valor |
|---|---|
| Content-Type | application/json |
| Authorization | Bearer token |
| userId | 60b27c4594e6e827fc2c6d0d |

***Response:***
<pre>
{
  "projects":[
    {
      "_id": "60b2aea494e6e827fc2c6d0e",
      "name": "New Project",
      "description": "Project test",
      "tasks":[],
      "idUser": "60b27c4594e6e827fc2c6d0d",
      "__v": 0
    },
    {
      "_id": "60b2b13794e6e827fc2c6d0f",
      "name": "Study Manager",
      "tasks":[],
      "idUser": "60b27c4594e6e827fc2c6d0d",
      "__v": 0
    },
    {
      "_id": "60b2b14d94e6e827fc2c6d10",
      "name": "Project Stages",
      "tasks":[],
      "idUser": "60b27c4594e6e827fc2c6d0d",
      "__v": 0
    }
  ]
}
</pre>

### 4.1.2 Obter apenas um projeto do usuário

<p align="justify">
Para obter apenas um projeto do usuário é necessário que seja informado na URL o id do projeto que o usuário deseja obter, como segue o exemplo.
</p>

### Exemplo:

| Método | URL |
|:---:|---|
| GET | http://localhost:3000/projects/60b2aea494e6e827fc2c6d0e |

|Headers| Valor |
|---|---|
| Content-Type | application/json |
| Authorization | Bearer token |
| userId | 60b27c4594e6e827fc2c6d0d |

***Response:***
<pre>
{
  "project":[
    {
      "_id": "60b2aea494e6e827fc2c6d0e",
      "name": "New Project",
      "description": "Project test",
      "tasks":[],
      "idUser": "60b27c4594e6e827fc2c6d0d",
      "__v": 0
    }
  ]
}
</pre>

### 4.2 Atualização de projetos

<p align="justify">
Para atualizar um projeto basta passar o id do projeto na URL e escrever os parâmetros e seus respectivos valores no body. Ao atualizar nenhum dado é sobrescrito, logo somente os parâmetros passados no body sofrerão alterações em seus valores.
</p>

### Exemplo:

| Método | URL |
|:---:|---|
| PATCH | http://localhost:3000/projects/60b2aea494e6e827fc2c6d0e |

|Headers| Valor |
|---|---|
| Content-Type | application/json |
| Authorization | Bearer token |
| userId | 60b27c4594e6e827fc2c6d0d |

***Request Body:***
<pre>
{ 
  "name":"Project Update"
}
</pre>

***Response:***
<pre>
{
  "project":{
    "_id": "60b2aea494e6e827fc2c6d0e",
    "name": "Project Update",
    "description": "Project test",
    "tasks":[],
    "idUser": "60b27c4594e6e827fc2c6d0d",
    "__v": 0
  }
}
</pre>

### 4.2 Deletar projeto

<p align="justify">
Para deletar um projeto basta passar seu id na url especificada.
</p>

### Exemplo:

| Método | URL |
|:---:|---|
| DELETE | http://localhost:3000/projects/60b2aea494e6e827fc2c6d0e |

|Headers| Valor |
|---|---|
| Content-Type | application/json |
| Authorization | Bearer token |
| userId | 60b27c4594e6e827fc2c6d0d |

***Response:***
<pre>
{
  "message": "Success removed!"
}
</pre>

## 5. Tasks

| Parâmetro | Valor Padrão | Descrição | Required |
|---|:---:|---|:---:|
| name | null | Nome da tarefa. | true |  
| description | null | Descrição da tarefa. | false |  
| date | null | Data de entrega da tarefa. | false |
| isCompleted | false | Status de conclusão da tarefa. | false |

### 5.1 Adicionando tarefas em um projeto

<p align="justify">
Para adicionar uma tarefa é necessário passar o id do projeto para a determinada URL abaixo. Apenas o nome da tarefa é obrigatório.
</p>

### Exemplo:

| Método | URL |
|:---:|---|
| PUT | http://localhost:3000/projects/60b2b13794e6e827fc2c6d0f/task |

|Headers| Valor |
|---|---|
| Content-Type | application/json |
| Authorization | Bearer token |
| userId | 60b27c4594e6e827fc2c6d0d |

***Request Body:***
<pre>
{ 
  "name":"Test the API",
  "description":"do the tests on the API"
}
</pre>

***Response:***
<pre>
{
  "project":{
    "_id": "60b2b13794e6e827fc2c6d0f",
    "name": "Study Manager",
    "tasks":[
      {
        "isCompleted": false,
        "_id": "60b2bc7394e6e827fc2c6d11",
        "name": "Test the API",
        "description": "do the tests on the API"
      }
    ],
    "idUser": "60b27c4594e6e827fc2c6d0d",
    "__v": 1
  }
}
</pre>

### 5.2 Obter tarefas

### 5.2.1 Obter todas as tarefas

Para obter todas as tarefas de um projeto basta apenas passar o id do projeto na URL.

### Exemplo:

| Método | URL |
|:---:|---|
| GET | http://localhost:3000/projects/60b2b13794e6e827fc2c6d0f/task |

|Headers| Valor |
|---|---|
| Content-Type | application/json |
| Authorization | Bearer token |
| userId | 60b27c4594e6e827fc2c6d0d |

***Response:***
<pre>
{
  "tasks":[
    {
      "isCompleted": false,
      "_id": "60b2bc7394e6e827fc2c6d11",
      "name": "Test the API",
      "description": "do the tests on the API"
   },
   {
      "isCompleted": false,
      "_id": "60b2bf0c94e6e827fc2c6d12",
      "name": "Readme",
      "description": "Create Readme"
   },
   {
      "isCompleted": false,
      "_id": "60b2bf5294e6e827fc2c6d13",
      "name": "Documentation",
      "description": "do the Documentation"
   }
  ]
}
</pre>

### 5.2.2 Obter apenas uma tarefa

<p align="justify">
Para obter apenas uma tarefa de um projeto basta apenas passar o id do projeto e o id da tarefa na URL.
</p>

### Exemplo:

| Método | URL |
|:---:|---|
| GET | http://localhost:3000/projects/60b2b13794e6e827fc2c6d0f/task/60b2bc7394e6e827fc2c6d11 |

|Headers| Valor |
|---|---|
| Content-Type | application/json |
| Authorization | Bearer token |
| userId | 60b27c4594e6e827fc2c6d0d |

***Response:***
<pre>
{
  "task":{
    "isCompleted": false,
    "_id": "60b2bc7394e6e827fc2c6d11",
    "name": "Test the API",
    "description": "do the tests on the API"
  }
}
</pre>

### 5.3 Atualização de tarefas

<p align="justify">
Para atualizar uma tarefa deve ser informado na URL o id do projeto e da tarefa, além de informar os parâmetros e seus respectivos valores no body. A atualização de tarefas não sobrescreve o documento, então nenhum dado será alterado além daqueles passados no body.
</p>

### Exemplo:

| Método | URL |
|:---:|---|
| PATCH | http://localhost:3000/projects/60b2b13794e6e827fc2c6d0f/task/60b2bc7394e6e827fc2c6d11 |

|Headers| Valor |
|---|---|
| Content-Type | application/json |
| Authorization | Bearer token |
| userId | 60b27c4594e6e827fc2c6d0d |

***Request Body:***
<pre>
{ 
  "date":"2021/05/30",
  "isCompleted":true
}
</pre>

***Response:***
<pre>
{
  "task":{
  "isCompleted": true,
  "_id": "60b2bc7394e6e827fc2c6d11",
  "name": "Test the API",
  "description": "do the tests on the API",
  "date": "2021-05-30T04:00:00.000Z"
  }
}
</pre>

### 5.4 Deletar tarefas

Para deletar uma tarefa de um projeto basta apenas passar o id do projeto e o id da tarefa na URL.

### Exemplo:

| Método | URL |
|:---:|---|
| DELETE | http://localhost:3000/projects/60b2b13794e6e827fc2c6d0f/task/60b2bc7394e6e827fc2c6d11 |

|Headers| Valor |
|---|---|
| Content-Type | application/json |
| Authorization | Bearer token |
| userId | 60b27c4594e6e827fc2c6d0d |

***Response:***
<pre>
{
  "message": "Success remove!"
}
</pre>
