import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { getProductById } from '../services/productService';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import colors from '../styles/colors';
import commonStyles from '../styles/commonStyles';

export default function ProductDetailsScreen({ route }) {
  const { id } = route.params;

  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  async function carregarDetalhes() {
    try {
      setLoading(true);
      setErro('');

      const data = await getProductById(id);
      setProduto(data);
    } catch (error) {
      setErro('Não foi possível carregar os detalhes do produto.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarDetalhes();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <Loading message="Carregando detalhes..." />
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.center}>
        <ErrorMessage message={erro} />
      </View>
    );
  }

  if (!produto) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>Produto não encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: produto.thumbnail }} style={styles.image} />

      <View style={styles.contentCard}>
        <Text style={commonStyles.title}>{produto.title}</Text>

        <Text style={styles.description}>{produto.description}</Text>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Preço</Text>
          <Text style={styles.value}>R$ {produto.price}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Desconto</Text>
          <Text style={styles.value}>{produto.discountPercentage}%</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Categoria</Text>
          <Text style={styles.value}>{produto.category}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.background,
    flexGrow: 1,
  },
  center: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    alignSelf: 'center',
    marginTop: 12,
    borderRadius: 12,
  },
  contentCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  description: {
    fontSize: 16,
    color: colors.textLight,
    marginTop: 14,
    marginBottom: 24,
    lineHeight: 22,
  },
  infoBox: {
    marginBottom: 14,
    padding: 14,
    backgroundColor: '#f0f4fa',
    borderRadius: 10,
  },
  label: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 18,
    color: colors.text,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.text,
  },
});