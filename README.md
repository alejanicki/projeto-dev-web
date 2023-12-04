# projeto-dev-web
Este repositório tem como finalidade servir de apresentação para a matéria de desenvolvimento web do 10º semestre de engenharia da computação da UAM. 

O Projeto se trata de um sitema de compras online.

Alessandro Janicki Araujo 
125111372338

Gabriel Guilherme Alves Paschoal
125111343135

Matheus Araujo Cipriano 
125111351017


Backend em SptringBoot Java, rotas para produtos, login e ordens de compras.
Frontend em next.js, com comunicaçao com o backend e rotas de navegação.

todas as rotas estão privadas para apresentação do login com token JWT, ao acessar rotas privadas você será sempre redirecionado a página de login. Para realização do login utilizar: maria@gmail.com e senha 123456. Após login será direcionado a Home e lá poderá selecionar os itens de interesse e será redirecionado a página de carrinho, lá terá informações dos produtos assim como o valor total. Ao fazer o checkout "finalizar o pedido" é feito uma ultima chamada http fazendo um post para o backend para a criação da ordem de compra da lista de produtos.
