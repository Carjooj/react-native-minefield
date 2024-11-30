import {View, Text, StyleSheet} from 'react-native' 

export default function Title() {
  return (
    <View style={styles.container}>
    <Text style={styles.texto}>CAMPO-MINADO</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 5,
    marginVertical: 5,
  },
  texto: {
    fontSize: 22,
    fontWeight: 700,
  }
})