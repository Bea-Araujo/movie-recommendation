# movie-recommendation

Guia de download
  ================
  
  Primeiros passos
  
  O projeto deverá ser baixado na maquina utilizando o download do próprio github ou executando o seguinte comando no terminal:
  
  ```bash
  $ git clone https://github.com/Bea-Araujo/movie-recommendation.git
  ```
  
  Importante lembrar que o projeto está utilizando NodeJS e o gerenciador de pacotes NPM, ambos precisam estar instalados na maquina para manter a funcionalidade do projeto, para mais detalhes sobre a instalação seguir as instruções dos links abaixo:
  
  * [Instalação NodeJS](https://nodejs.org/en/download/)
  * [Instalação NPM](https://docs.npmjs.com/cli/v6/commands/npm-install)
  
  Para seguir com as instalações, utilize os seguintes comandos no terminal:
  
  ```bash
  $ npm install
  ```
  
  Após aguardar os pacotes serem instalados, utilizar o seguinte comando para iniciar a aplicação:
  
  ```bash
  $ npm run dev
  ```
  
  Para acessar páginas específicas, referir-se ao arquivo "routes.jsx"
  
  O front-end pode ser encontrado no seguinte repositório:
  [front-end](https://github.com/Bea-Araujo/movie-recommendation-front)
  
  # Entidades e rotas
  
  Usuarios
  ===========

  Entidade responsável por armazenar o username e senhad o usuário. 

  <div align=center>

  | Método HTTP | Rota | Função |
  | :---: | --- | --- |
  | ![post](https://img.shields.io/badge/POST-09a4d8)     | ```/user/new```      | Criar registro de usuario | 
  | ![get](https://img.shields.io/badge/GET-85bb17)       | ```/user/all```     | Retornar todos os usuarios do sistema |
  | ![get](https://img.shields.io/badge/GET-85bb17)       | ```/user/{id}```   | Retornar um usuarios baseado no id |
  | ![put](https://img.shields.io/badge/PUT-cd910e)       | ```/user/edit/{id}```   | Editar um usuario baseado no id|
  | ![delete](https://img.shields.io/badge/DELETE-bd0606) | ```/user/delete/{id}``` | Deletar um usuario baseado no id |

  </div>
  </div>
  
  Post
  ===========

  Entidade responsável por armazenar informações sobre a publicação (id do post, id do autor e título). 

  <div align=center>

  | Método HTTP | Rota | Função |
  | :---: | --- | --- |
  | ![post](https://img.shields.io/badge/POST-09a4d8)     | ```/post/new```      | Criar registro de publicação | 
  | ![get](https://img.shields.io/badge/GET-85bb17)       | ```/post/all```     | Retornar todas as publicações do sistema |
  | ![get](https://img.shields.io/badge/GET-85bb17)       | ```/post/{id}```   | Retornar uma publicação baseado no id |
  | ![put](https://img.shields.io/badge/PUT-cd910e)       | ```/post/edit/{id}```   | Editar uma publicação baseado no id|
  | ![delete](https://img.shields.io/badge/DELETE-bd0606) | ```/post/delete/{id}``` | Deletar uma publicação baseado no id |

  </div>
  </div>
  
  Follows
  ===========

  Entidade responsável por armazenar relação entre usuário e post. 

  <div align=center>

  | Método HTTP | Rota | Função |
  | :---: | --- | --- |
  | ![post](https://img.shields.io/badge/POST-09a4d8)     | ```/follow/new```      | Criar registro de relação | 
  | ![get](https://img.shields.io/badge/GET-85bb17)       | ```/follow/all```     | Retornar todas as relações do sistema |
  | ![get](https://img.shields.io/badge/GET-85bb17)       | ```/follow/{userid}/{postid}```   | Retornar uma relação baseado no id de usuário e de publicação |
  | ![put](https://img.shields.io/badge/PUT-cd910e)       | ```/follow/edit/{userid}/{postid}```   | Editar uma relação baseado no id de usuário e de publicação|
  | ![delete](https://img.shields.io/badge/DELETE-bd0606) | ```/follow/delete/{userid}/{postid}``` | Deletar uma relação baseado no id de usuário e de publicação|

  </div>
  </div>
