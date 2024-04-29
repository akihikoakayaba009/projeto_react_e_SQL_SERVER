const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const pdf = require('html-pdf');
const fs = require('fs');


const app = express();
exports.app = app;
const port = 5000;

// Configurando o middleware 'cors' para permitir solicitações de todas as origens
app.use(cors());
app.use(express.json());

const config = {
  user: 'sa', // Alteração feita aqui
  password: 'master',
  server: '192.168.1.104',
  database: 'SHMBD',
  port: 1433, // Especificando a porta desejada
  options: {
    trustServerCertificate: true // apenas se você estiver usando o certificado autofirmado
  }
};

sql.connect(config, err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados SQL Server');
});

// Rota para obter todos os dados
const resultadosPorPagina = 10;

app.get('/dados', async (req, res) => {
  try {
    // Obtenha o número da página a partir dos parâmetros da consulta, padrão para 1 se não fornecido
    const pagina = req.query.page ? parseInt(req.query.page) : 1;
    
    // Calcule o deslocamento com base na página atual e no número de resultados por página
    const offset = (pagina - 1) * resultadosPorPagina;
    
    const result = await sql.query`SELECT * FROM tblClientes ORDER BY CLI_Codigo OFFSET ${offset} ROWS FETCH NEXT ${resultadosPorPagina} ROWS ONLY`;
    
    res.json(result.recordset);
  } catch (error) {
    console.error('Erro ao executar consulta:', error);
    res.status(500).send('Erro ao obter dados do banco de dados');
  }
});


// Rota para obter os dados de um cliente específico pelo seu código
app.get('/dados/:CLI_Codigo', async (req, res) => {
  const CLI_Codigo = req.params.CLI_Codigo;
  try {
    const result = await sql.query`SELECT * FROM tblClientes WHERE CLI_Codigo = ${CLI_Codigo}`;
    
    // Verificar se algum registro foi encontrado
    if (result.recordset.length > 0) {
      res.json(result.recordset[0]); // Retorna o primeiro registro encontrado (deve ser único pelo código)
    } else {
      res.status(404).send('Cliente não encontrado');
    }
  } catch (error) {
    console.error('Erro ao obter dados do cliente:', error);
    res.status(500).send('Erro ao obter dados do cliente do banco de dados');
  }
});


// Rota para excluir um item
app.delete('/dados/:CLI_Codigo', async (req, res) => {
  const CLI_Codigo = req.params.CLI_Codigo; // Correção aqui
  try {
    await sql.query`DELETE FROM tblClientes WHERE CLI_Codigo = ${CLI_Codigo}`;
    console.log('Item excluído com sucesso');
    res.status(200).send('Item excluído com sucesso');
  } catch (error) {
    console.error('Erro ao excluir item:', error);
    res.status(500).send('Erro ao excluir item do banco de dados');
  }
});




// Rota para atualizar um item
app.put('/dados/:CLI_Codigo', async (req, res) => {
  const CLI_Codigo = req.params.CLI_Codigo;
  const novosDados = req.body;
  
  // Validar se os dados necessários estão presentes
  if (!novosDados || !CLI_Codigo) {
    return res.status(400).send('Dados incompletos');
  }

  try {
    // Atualizar apenas os campos necessários e utilizar consultas parametrizadas para evitar SQL Injection
    const result = await sql.query`
      UPDATE tblClientes SET 
      CLI_Nome = ${novosDados.CLI_Nome}, 
      CLI_Endereco1 = ${novosDados.CLI_Endereco1}, 
      CLI_Endereco2 = ${novosDados.CLI_Endereco2}, 
      CLI_Cidade = ${novosDados.CLI_Cidade}, 
      CLI_CodigoPostal = ${novosDados.CLI_CodigoPostal}, 
      CLI_Localidade = ${novosDados.CLI_Localidade}, 
      CLI_Pais = ${novosDados.CLI_Pais}, 
      CLI_NIF = ${novosDados.CLI_NIF}, 
      CLI_Telefone = ${novosDados.CLI_Telefone}
      WHERE CLI_Codigo = ${CLI_Codigo}
    `;

    // Verificar se algum registro foi atualizado
    if (result.rowsAffected[0] > 0) {
      res.status(200).send('Dados atualizados com sucesso');
    } else {
      res.status(404).send('Cliente não encontrado');
    }
  } catch (error) {
    console.error('Erro ao atualizar dados:', error);
    res.status(500).send('Erro ao atualizar dados no banco de dados');
  }
});
// Rota para fazer login
app.post('/login', async (req, res) => {
  const { usuario, senha } = req.body;
  try {
    const result = await sql.query`SELECT * FROM tblUtilizadores WHERE Uld_nome = ${usuario} AND uld_password = ${senha}`;
    
    // Verificar se algum registro foi encontrado
    if (result.recordset.length > 0) {
      console.log("login bem a=")
      res.status(200).json({ message: 'Login bem-sucedido' });
    } else {
      res.status(401).json({ message: 'Usuário ou senha incorretos' });
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).send('Erro ao fazer login');
  }
});
app.post('/dados', async (req, res) => {
  const novoItem = req.body;
  try {
    await sql.query`
    INSERT INTO tblClientes (
      CLI_Codigo, CLI_Nome, CLI_Endereco1, CLI_Endereco2, 
      CLI_Cidade, CLI_CodigoPostal, CLI_Localidade, CLI_Pais, 
      CLI_NIF, CLI_Telefone, CLI_Fax, CLI_Email, CLI_Radial, 
      CLI_Contactos, CLI_Observacoes, CLI_PermissaoDosagem, 
      CLI_Bloqueado, CLI_Desabilitado, 
      CLI_CreditoM3, CLI_AtualM3, CLI_ControloCredito, 
      CLI_Tipo, CLI_NumeroPorta, CLI_Distrito, CLI_ClienteNome2, 
      CLI_InscricaoEstadual, CLI_InscricaoMunicipal, 
      CLI_EnviaEmail, CLI_NomeCentroProducao, 
      CLI_CodigoCentroProducao
  ) 
  VALUES (
      ${novoItem.CLI_Codigo}, ${novoItem.CLI_Nome}, 
      ${novoItem.CLI_Endereco1}, ${novoItem.CLI_Endereco2}, 
      ${novoItem.CLI_Cidade}, ${novoItem.CLI_CodigoPostal}, 
      ${novoItem.CLI_Localidade}, ${novoItem.CLI_Pais}, 
      ${novoItem.CLI_NIF}, ${novoItem.CLI_Telefone}, 
      ${novoItem.CLI_Fax}, ${novoItem.CLI_Email}, 
      ${novoItem.CLI_Radial}, ${novoItem.CLI_Contactos}, 
      ${novoItem.CLI_Observacoes}, ${novoItem.CLI_PermissaoDosagem}, 
      ${novoItem.CLI_Bloqueado}, ${novoItem.CLI_Desabilitado}, ${novoItem.CLI_CreditoM3}, 
      ${novoItem.CLI_AtualM3}, ${novoItem.CLI_ControloCredito}, 
      ${novoItem.CLI_Tipo}, ${novoItem.CLI_NumeroPorta}, 
      ${novoItem.CLI_Distrito}, ${novoItem.CLI_ClienteNome2}, 
      ${novoItem.CLI_InscricaoEstadual}, 
      ${novoItem.CLI_InscricaoMunicipal}, 
      ${novoItem.CLI_EnviaEmail}, 
      ${novoItem.CLI_NomeCentroProducao}, 
      ${novoItem.CLI_CodigoCentroProducao}
  )`;
    console.log('Item adicionado com sucesso'); // Mensagem de sucesso no console
    res.status(201).send('Item adicionado com sucesso');
  } catch (error) {
    console.error('Erro ao adicionar item:', error);
    res.status(500).send('Erro ao adicionar item ao banco de dados');
  }
});
//rota para adicionar itens

app.post('/dados', async (req, res) => {
  const novoItem = req.body;
  try {
    await sql.query`
    INSERT INTO tblClientes (
      CLI_Codigo, CLI_Nome, CLI_Endereco1, CLI_Endereco2, 
      CLI_Cidade, CLI_CodigoPostal, CLI_Localidade, CLI_Pais, 
      CLI_NIF, CLI_Telefone, CLI_Fax, CLI_Email, CLI_Radial, 
      CLI_Contactos, CLI_Observacoes, CLI_PermissaoDosagem, 
      CLI_Bloqueado, CLI_Desabilitado, 
      CLI_CreditoM3, CLI_AtualM3, CLI_ControloCredito, 
      CLI_Tipo, CLI_NumeroPorta, CLI_Distrito, CLI_ClienteNome2, 
      CLI_InscricaoEstadual, CLI_InscricaoMunicipal, 
      CLI_EnviaEmail, CLI_NomeCentroProducao, 
      CLI_CodigoCentroProducao
  ) 
  VALUES (
      ${novoItem.CLI_Codigo}, ${novoItem.CLI_Nome}, 
      ${novoItem.CLI_Endereco1}, ${novoItem.CLI_Endereco2}, 
      ${novoItem.CLI_Cidade}, ${novoItem.CLI_CodigoPostal}, 
      ${novoItem.CLI_Localidade}, ${novoItem.CLI_Pais}, 
      ${novoItem.CLI_NIF}, ${novoItem.CLI_Telefone}, 
      ${novoItem.CLI_Fax}, ${novoItem.CLI_Email}, 
      ${novoItem.CLI_Radial}, ${novoItem.CLI_Contactos}, 
      ${novoItem.CLI_Observacoes}, ${novoItem.CLI_PermissaoDosagem}, 
      ${novoItem.CLI_Bloqueado}, ${novoItem.CLI_Desabilitado}, ${novoItem.CLI_CreditoM3}, 
      ${novoItem.CLI_AtualM3}, ${novoItem.CLI_ControloCredito}, 
      ${novoItem.CLI_Tipo}, ${novoItem.CLI_NumeroPorta}, 
      ${novoItem.CLI_Distrito}, ${novoItem.CLI_ClienteNome2}, 
      ${novoItem.CLI_InscricaoEstadual}, 
      ${novoItem.CLI_InscricaoMunicipal}, 
      ${novoItem.CLI_EnviaEmail}, 
      ${novoItem.CLI_NomeCentroProducao}, 
      ${novoItem.CLI_CodigoCentroProducao}
  )`;
    console.log('Item adicionado com sucesso'); // Mensagem de sucesso no console
    res.status(201).send('Item adicionado com sucesso');
  } catch (error) {
    console.error('Erro ao adicionar item:', error);
    res.status(500).send('Erro ao adicionar item ao banco de dados');
  }
});


app.get('/buscar-clientes', async (req, res) => {
  const { nome } = req.query;
  try {
    const result = await sql.query`SELECT * FROM tblClientes WHERE CLI_Nome LIKE '%' + ${nome} + '%'`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).send('Erro ao buscar clientes no banco de dados');
  }
});

app.listen(port, () => {
  console.log(`Servidor Node.js rodando em http://localhost:${port}`);
});
