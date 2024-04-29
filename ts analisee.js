import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import axios from 'axios';

const TelaInicial = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Tela Inicial</Text>
      <Button
        title="Ir para Tela Secundária"
        onPress={() => navigation.navigate('TelaSecundaria')}
        App navigation={navigation}
      />
      <App />
    </View>
  );
};

const App = () => {
  const [dados, setDados] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);

  useEffect(() => {
    fetchData();
  }, [paginaAtual]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/dados?page=${paginaAtual}`);
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
  const handleEditClick = (item) => {
    navigation.navigate('TelaSecundaria', { cliente: item });
  };
  return (
    <View>
      <View style={styles.pagination}>
        <Button title="Anterior" onPress={handlePrevPage} />
        <Text>Página {paginaAtual}</Text>
        <Button title="Próxima" onPress={handleNextPage} />
      </View>
      <View style={styles.data}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Endereço</th>
              <th>Cidade</th>
              <th>Código Postal</th>
              <th>Localidade</th>
              <th>País</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {dados.map((item) => (
              <tr key={item.CLI_Codigo}>
                <td>{item.CLI_Codigo}</td>
                <td>{item.CLI_Nome}</td>
                <td>{item.CLI_Endereco1}</td>
                <td>{item.CLI_Cidade}</td>
                <td>{item.CLI_CodigoPostal}</td>
                <td>{item.CLI_Localidade}</td>
                <td>{item.CLI_Pais}</td>
                <td>
                  <button onClick={() => handleEditClick(item.CLI_Codigo)}>Editar</button>
                  <button onClick={() => handleDeleteItem(item.CLI_Codigo)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </View>
    </View>
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
    // Estilos para a visualização dos dados
  },
});

export default TelaInicial;
