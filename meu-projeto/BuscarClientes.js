import React, { useState } from 'react';
import { View, TextInput, Button, Alert, FlatList, Text, Platform } from 'react-native';
import axios from 'axios';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const BuscarClientes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [multipleOccurrences, setMultipleOccurrences] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://192.168.1.104:5000/buscar-clientes?nome=${searchQuery}`);
      setSearchResults(response.data);
      
      // Filtrando clientes com múltiplas ocorrências
      const occurrences = {};
      response.data.forEach(cliente => {
        occurrences[cliente.CLI_Codigo] = (occurrences[cliente.CLI_Codigo] || 0) + 1;
      });
      const multipleClients = Object.keys(occurrences).filter(key => occurrences[key] > 1);
      setMultipleOccurrences(multipleClients);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      Alert.alert('Erro', 'Erro ao buscar clientes');
    }
  };

  const exportToPDF = async (cliente) => {
    try {
      const htmlContent = `
        <h1>Detalhes do Cliente</h1>
        <p>ID: ${cliente.CLI_Codigo}</p>
        <p>Cliente: ${cliente.CLI_Nome}</p>
        <p>Endereço: ${cliente.CLI_Endereco1}</p>
        <p>Endereço2 : ${cliente.CLI_Endereco2}</p>
        <p>Cidade: ${cliente.CLI_Cidade}</p>
        <p>Código Postal: ${cliente.CLI_CodigoPostal}</p>
        <p>Localidade: ${cliente.CLI_Localidade}</p>
        <p>País: ${cliente.CLI_Pais}</p>
        <p>NIF: ${cliente.CLI_NIF}</p>
        <p>Telefone: ${cliente.CLI_Telefone}</p>
      `;
      
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      
      console.log('URI do arquivo PDF:', uri);
      
      const cacheDirectory = FileSystem.cacheDirectory;
      const fileName = 'cliente.pdf';
      const cachePath = `${cacheDirectory}${fileName}`;
      
      await FileSystem.moveAsync({ from: uri, to: cachePath });
      
      console.log('Arquivo PDF movido para:', cachePath);
      
      await Sharing.shareAsync(cachePath);
      
      Alert.alert('Sucesso', `PDF gerado e compartilhado.`);
    } catch (error) {
      console.error('Erro ao exportar para PDF:', error);
      Alert.alert('Erro', 'Erro ao exportar para PDF');
    }
  };

  const renderItem = ({ item }) => (
    <View>
      <Text>ID: {item.CLI_Codigo}</Text>
      <Text>Cliente: {item.CLI_Nome}</Text>
      <Text>Endereço: {item.CLI_Endereco1}</Text>
      <Text>Endereço2 : {item.CLI_Endereco2}</Text>
      <Text>Cidade: {item.CLI_Cidade}</Text>
      <Text>Código Postal: {item.CLI_CodigoPostal}</Text>
      <Text>Localidade: {item.CLI_Localidade}</Text>
      <Text>País: {item.CLI_Pais}</Text>
      <Text>NIF: {item.CLI_NIF}</Text>
      <Text>Telefone: {item.CLI_Telefone}</Text>
      <Button title="Exportar para PDF" onPress={() => exportToPDF(item)} />
    </View>
  );

  return (
    <View>
      <TextInput
        placeholder="Digite o nome do cliente"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button title="Buscar" onPress={handleSearch} />

      {multipleOccurrences.length > 0 && (
        <View>
          <Text>Clientes com múltiplas ocorrências:</Text>
          <FlatList
            data={multipleOccurrences}
            renderItem={({ item }) => <Text>ID: {item}</Text>}
            keyExtractor={(item) => item.toString()}
          />
        </View>
      )}

      <FlatList
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={(item) => item.CLI_Codigo.toString()}
      />
    </View>
  );
};

export default BuscarClientes;
