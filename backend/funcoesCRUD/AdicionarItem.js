
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
