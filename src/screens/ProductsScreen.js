import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { getProductsFromCategories } from '../services/productService';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import colors from '../styles/colors';
import commonStyles from '../styles/commonStyles';

export default function ProductsScreen({ navigation }) {
  const [categoriaAtiva, setCategoriaAtiva] = useState('masculino');
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  async function carregarProdutos() {
    try {
      setLoading(true);
      setErro('');

      const categoriasMasculinas = [
        'mens-shirts',
        'mens-shoes',
        'mens-watches',
      ];

      const categoriasFemininas = [
        'womens-bags',
        'womens-dresses',
        'womens-jewellery',
        'womens-shoes',
        'womens-watches',
      ];

      const categorias =
        categoriaAtiva === 'masculino'
          ? categoriasMasculinas
          : categoriasFemininas;

      const data = await getProductsFromCategories(categorias);
      setProdutos(data);
    } catch (error) {
      setErro('Não foi possível carregar os produtos.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarProdutos();
  }, [categoriaAtiva]);

  function handleLogout() {
    dispatch(logout());
    navigation.navigate('Login');
  }

  function renderProduto({ item }) {
    return (
      <ProductCard
        item={item}
        onPress={() => navigation.navigate('ProductDetails', { id: item.id })}
      />
    );
  }

  return (
    <View style={commonStyles.screenContainer}>
      <View style={styles.header}>
        <View style={styles.headerTextArea}>
          <Text style={commonStyles.title}>Produtos</Text>
          <Text style={styles.userText}>
            Usuário: {user?.email || 'não identificado'}
          </Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            categoriaAtiva === 'masculino' ? styles.activeTab : null,
          ]}
          onPress={() => setCategoriaAtiva('masculino')}
        >
          <Text
            style={
              categoriaAtiva === 'masculino'
                ? styles.activeTabText
                : styles.tabText
            }
          >
            Masculino
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            categoriaAtiva === 'feminino' ? styles.activeTab : null,
          ]}
          onPress={() => setCategoriaAtiva('feminino')}
        >
          <Text
            style={
              categoriaAtiva === 'feminino'
                ? styles.activeTabText
                : styles.tabText
            }
          >
            Feminino
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <Loading message="Carregando produtos..." />
      ) : erro ? (
        <ErrorMessage message={erro} />
      ) : (
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProduto}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  headerTextArea: {
    flex: 1,
  },
  userText: {
    marginTop: 6,
    fontSize: 14,
    color: colors.textLight,
  },
  logoutButton: {
    backgroundColor: colors.danger,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  logoutButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.surface,
  },
  activeTab: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tabText: {
    color: colors.text,
    fontWeight: 'bold',
  },
  activeTabText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 20,
  },
});