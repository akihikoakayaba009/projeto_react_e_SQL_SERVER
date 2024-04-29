import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

const TelaEditar = ({ route, navigation }) => {
  const [novosDados, setNovosDados] = useState({});

  useEffect(() => {
    const { CLI_Codigo } = route.params;
    fetchDadosCliente(CLI_Codigo);
  }, [route.params?.CLI_Codigo]);

  const fetchDadosCliente = async (CLI_Codigo) => {
    try {
      const response = await axios.get(`http://192.168.1.104:5000/dados/${CLI_Codigo}`);
      setNovosDados(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados do cliente:', error);
      Alert.alert('Erro', 'Erro ao buscar dados do cliente');
    }
  };

  const handleChange = (campo, valor) => {
    setNovosDados({ ...novosDados, [campo]: valor });
  };

  const handleEditar = async () => {
    try {
      await axios.put(`http://192.168.1.104:5000/dados/${novosDados.CLI_Codigo}`, novosDados);
      Alert.alert('Sucesso', 'Dados do cliente atualizados com sucesso');
      navigation.state.params.onGoBack(); // Chama a função para recarregar os dados na página inicial
      navigation.goBack(); // Retorna para a página inicial
    } catch (error) {
      console.error('Erro ao editar cliente:', error);
      Alert.alert('Erro', 'Erro ao editar dados do cliente');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Dados do Cliente</Text>
      <TextInput
        style={styles.input}
        placeholder="Código do Cliente"
        value={novosDados.CLI_Codigo || ''}
        onChangeText={(text) => handleChange('CLI_Codigo', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome do Cliente"
        value={novosDados.CLI_Nome || ''}
        onChangeText={(text) => handleChange('CLI_Nome', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={novosDados.CLI_Endereco1 || ''}
        onChangeText={(text) => handleChange('CLI_Endereco1', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço2"
        value={novosDados.CLI_Endereco2 || ''}
        onChangeText={(text) => handleChange('CLI_Endereco2', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        value={novosDados.CLI_Cidade || ''}
        onChangeText={(text) => handleChange('CLI_Cidade', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Código Postal"
        value={novosDados.CLI_CodigoPostal || ''}
        onChangeText={(text) => handleChange('CLI_CodigoPostal', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Localidade"
        value={novosDados.CLI_Localidade || ''}
        onChangeText={(text) => handleChange('CLI_Localidade', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="País"
        value={novosDados.CLI_Pais || ''}
        onChangeText={(text) => handleChange('CLI_Pais', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="NIF"
        value={novosDados.CLI_NIF || ''}
        onChangeText={(text) => handleChange('CLI_NIF', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={novosDados.CLI_Telefone || ''}
        onChangeText={(text) => handleChange('CLI_Telefone', text)}
      />
      <Button title="Salvar" onPress={handleEditar} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
});

export default TelaEditar;
