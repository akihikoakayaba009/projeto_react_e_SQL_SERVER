import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import RNHTMLtoPDF from 'react-native-html-to-pdf';





const TelaInicial = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Adicionar Novo Cliente"
        onPress={() => navigation.navigate('TelaSecundaria', { CLI_Codigo: null })}
      />
     <Button
        title="Buscar Cliente"
        onPress={() => navigation.navigate('BuscarClientes')}
      />
      <App navigation={navigation} />
    </View>
  );
};

const App = ({ navigation }) => {
  const [dados, setDados] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);

  useEffect(() => {
    fetchData();
  }, [paginaAtual]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://192.168.1.104:5000/dados?page=${paginaAtual}`);
      setDados(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const handleNextPage = () => {
    setPaginaAtual(paginaAtual + 1);
  };

  const handlePrevPage = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  };

  const handleEditClick = (CLI_Codigo) => {
    navigation.navigate('TelaEditar', { CLI_Codigo });
  };

  const handleDeleteItem = async (CLI_Codigo) => {
    try {
      await axios.delete(`http://192.168.1.104:5000/dados/${CLI_Codigo}`);
      setDados(dados.filter(item => item.CLI_Codigo !== CLI_Codigo));
      Alert.alert('Sucesso', 'Item excluído com sucesso');
    } catch (error) {
      console.error('Erro ao excluir item:', error);
      Alert.alert('Erro', 'Erro ao excluir item do banco de dados');
    }
  };

 


  return (
    <ScrollView>
      <View style={styles.pagination}>
        <Button title="Anterior" onPress={handlePrevPage} />
        <Text style={styles.pageText}>Página {paginaAtual}</Text>
        <Button title="Próxima" onPress={handleNextPage} />
       
      </View>

      <View style={styles.data}>
        {dados.map((item) => (
          <View key={item.CLI_Codigo} style={styles.row}>
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
            <View style={styles.actions}>
              <Button title="Editar" onPress={() => handleEditClick(item.CLI_Codigo)} />
              <Button title="Excluir" onPress={() => handleDeleteItem(item.CLI_Codigo)} />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  data: {
    padding: 10,
  },
  row: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default TelaInicial;
