import { View, StyleSheet } from 'react-native'

interface Props {
  proporcao?: number;
}

export default function Bandeira({ proporcao = 1}: Props) {

  const styles = StyleSheet.create({
  container: {
    marginTop: 2
  },
  bandeira: {
    position: 'absolute',
    left: 1.2,
    height: 5 * proporcao,
    width: 6 * proporcao,
    backgroundColor: '#F22',
    marginLeft: 3 * proporcao,
  },
  mastro: {
    position: 'absolute',
    left: 5.8 * proporcao,
    height: 12 * proporcao,
    width: 2 * proporcao,
    backgroundColor: '#222',
    marginLeft: 3 * proporcao,
  },
  base1: {
    position: 'absolute',
    height: 2 * proporcao,
    width: 6 * proporcao,
    backgroundColor: '#222',
    marginLeft: 7 * proporcao,
    marginTop: 10 * proporcao,
  },
  base2: {
    position: 'absolute',
    height: 2 * proporcao,
    width: 10 * proporcao,
    backgroundColor: '#222',
    marginLeft: 5 * proporcao,
    marginTop: 12 * proporcao,
  }
})

  return (
    <View style={styles.container}>
    <View style={styles.mastro}></View>
    <View style={styles.bandeira}></View>
    <View style={styles.base1}></View>
    <View style={styles.base2}></View>
    </View>
  )
}

