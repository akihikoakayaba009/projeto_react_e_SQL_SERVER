import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const TelaSecundaria = () => {
  const [novoItem, setNovoItem] = useState({
    CLI_Codigo: '',
    CLI_Nome: '',
    CLI_Endereco1: '',
    CLI_Endereco2: '',
    CLI_Cidade: '',
    CLI_CodigoPostal: '',
    CLI_Localidade: '',
    CLI_Pais: '',
    CLI_NIF: '',
    CLI_Telefone: '',
    CLI_Fax: '',
    CLI_Email: '',
    CLI_Radial: '',
    CLI_Contactos: '',
    CLI_Observacoes: '',
    CLI_PermissaoDosagem: false,
    CLI_Bloqueado: false,
    CLI_DataModificacao: null,
    CLI_Desabilitado: null,
    CLI_CreditoM3: null,
    CLI_AtualM3: null,
    CLI_ControloCredito: false,
    CLI_Notificacao: null,
    CLI_Modificacao: null,
    CLI_Tipo: null,
    CLI_NumeroPorta: '',
    CLI_Distrito: '',
    CLI_ClienteNome2: '',
    CLI_InscricaoEstadual: '',
    CLI_InscricaoMunicipal: '',
    CLI_EnviaEmail: null,
    CLI_NomeCentroProducao: '',
    CLI_CodigoCentroProducao: ''
  });

  const handleChange = (campo, valor) => {
    setNovoItem({ ...novoItem, [campo]: valor });
  };

  const handleAdicionar = async () => {
    try {
      const response = await axios.post('http://192.168.1.104:5000/dados', novoItem);
      console.log(response.data); // Mensagem do servidor
      Alert.alert('Sucesso', 'Item adicionado com sucesso');
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
      Alert.alert('Erro', 'Erro ao adicionar item ao banco de dados');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} style={styles.scrollView}>
      <Text>Dados do Cliente</Text>
      <TextInput
        style={styles.input}
        placeholder="Código do Cliente"
        value={novoItem.CLI_Codigo ? novoItem.CLI_Codigo.toString() : ''}
        onChangeText={(text) => {
          const newText = text.replace(/[^0-9]/g, '');
          handleChange('CLI_Codigo', newText);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome do Cliente"
        value={novoItem.CLI_Nome}
        onChangeText={(text) => handleChange('CLI_Nome', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={novoItem.CLI_Endereco1}
        onChangeText={(text) => handleChange('CLI_Endereco1', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço 2"
        value={novoItem.CLI_Endereco2}
        onChangeText={(text) => handleChange('CLI_Endereco2', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        value={novoItem.CLI_Cidade}
        onChangeText={(text) => handleChange('CLI_Cidade', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Código Postal"
        value={novoItem.CLI_CodigoPostal ? novoItem.CLI_CodigoPostal.toString() : ''}
        onChangeText={(text) => {
          const newText = text.replace(/[^0-9]/g, '');
          handleChange('CLI_CodigoPostal', newText);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Localidade"
        value={novoItem.CLI_Localidade}
        onChangeText={(text) => handleChange('CLI_Localidade', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="País"
        value={novoItem.CLI_Pais}
        onChangeText={(text) => handleChange('CLI_Pais', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="NIF"
        value={novoItem.CLI_NIF ? novoItem.CLI_NIF.toString() : ''}
        onChangeText={(text) => {
          const newText = text.replace(/[^0-9]/g, '');
          handleChange('CLI_NIF', newText);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={novoItem.CLI_Telefone ? novoItem.CLI_Telefone.toString() : ''}
        onChangeText={(text) => {
          const newText = text.replace(/[^0-9]/g, '');
          handleChange('CLI_Telefone', newText);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="FAX"
        value={novoItem.CLI_Fax ? novoItem.CLI_Fax.toString() : ''}
        onChangeText={(text) => {
          const newText = text.replace(/[^0-9]/g, '');
          handleChange('CLI_Fax', newText);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="email"
        value={novoItem.CLI_Email}
        onChangeText={(text) => handleChange('CLI_Email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Radial"
        value={novoItem.CLI_Radial}
        onChangeText={(text) => handleChange('CLI_Radial', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contatos"
        value={novoItem.CLI_Contactos}
        onChangeText={(text) => handleChange('CLI_Contactos', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Observações"
        value={novoItem.CLI_Observacoes}
        onChangeText={(text) => handleChange('CLI_Observacoes', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Permissão de Dosagem"
        value={novoItem.CLI_PermissaoDosagem ? '1' : '0'}
        onChangeText={(text) => handleChange('CLI_PermissaoDosagem', text === '1')}
      />
      <TextInput
        style={styles.input}
        placeholder="bloqueado"
        value={novoItem.CLI_Bloqueado ? '1' : '0'}
        onChangeText={(text) => handleChange('CLI_Bloqueado', text === '1')}
      />
      <TextInput
        style={styles.input}
        placeholder="Desabilitado"
        value={novoItem.CLI_Desabilitado ? '1' : '0'}
        onChangeText={(text) => handleChange('CLI_Desabilitado', text === '1')}
      />
      <TextInput
        style={styles.input}
        placeholder="Crédito M3"
        value={novoItem.CLI_CreditoM3 ? novoItem.CLI_CreditoM3.toString() : ''}
        onChangeText={(text) => {
          const newText = text.replace(/[^0-9]/g, '');
          handleChange('CLI_CreditoM3', newText);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Atual M3"
        value={novoItem.CLI_AtualM3 ? novoItem.CLI_AtualM3.toString() : ''}
        onChangeText={(text) => {
          const newText = text.replace(/[^0-9]/g, '');
          handleChange('CLI_AtualM3', newText);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Controlo de Crédito"
        value={novoItem.CLI_ControloCredito ? '1' : '0'}
        onChangeText={(text) => handleChange('CLI_ControloCredito', text === '1')}
      />
      <TextInput
        style={styles.input}
        placeholder="tipo"
        value={novoItem.CLI_Tipo ? '1' : '0'}
        onChangeText={(text) => handleChange('CLI_Tipo', text === '1')}
      />
      <TextInput
        style={styles.input}
        placeholder="Número da Porta"
        value={novoItem.CLI_NumeroPorta}
        onChangeText={(text) => handleChange('CLI_NumeroPorta', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Distrito"
        value={novoItem.CLI_Distrito}
        onChangeText={(text) => handleChange('CLI_Distrito', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Cliente Nome 2"
        value={novoItem.CLI_ClienteNome2}
        onChangeText={(text) => handleChange('CLI_ClienteNome2', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Inscrição Estadual"
        value={novoItem.CLI_InscricaoEstadual}
        onChangeText={(text) => handleChange('CLI_InscricaoEstadual', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Inscrição Municipal"
        value={novoItem.CLI_InscricaoMunicipal}
        onChangeText={(text) => handleChange('CLI_InscricaoMunicipal', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Envia Email"
        value={novoItem.CLI_EnviaEmail ? '1' : '0'}
        onChangeText={(text) => handleChange('CLI_EnviaEmail', text === '1')}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome Centro Produção"
        value={novoItem.CLI_NomeCentroProducao}
        onChangeText={(text) => handleChange('CLI_NomeCentroProducao', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Código Centro Produção"
        value={novoItem.CLI_CodigoCentroProducao}
        onChangeText={(text) => handleChange('CLI_CodigoCentroProducao', text)}
      />
      <Button title="Adicionar" onPress={handleAdicionar} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '80%',
  },
  scrollView: {
    flexGrow: 1,
    scrollEnabled: true
  }
});

export default TelaSecundaria;
