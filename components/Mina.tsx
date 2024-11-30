import { View, StyleSheet, Image } from 'react-native';

export default function Mina() {
  return (
    <View style={styles.container}>
    <Image
    style={styles.imagem}
    source={require('../assets/mina.png')}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  imagem: {
    width: 20,
    height: 20,
  },
  corMina: {
    height: 14,
    width: 14,
    borderRadius: 10,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linha: {
    position: 'absolute',
    left: '50%',
    marginLeft: -13,
    height: 3,
    width: 20,
    borderRadius: 3,
    backgroundColor: 'black',
  },
});
