import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native';
import colors from '../styles/colors';

export default function ProductCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />

      <View style={styles.infoArea}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
        <Text style={styles.productPrice}>R$ {item.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    marginBottom: 16,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    alignSelf: 'center',
    marginTop: 12,
    borderRadius: 12,
  },
  infoArea: {
    padding: 14,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: colors.text,
  },
  productCategory: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  productPrice: {
    fontSize: 17,
    color: colors.primary,
    fontWeight: 'bold',
  },
});