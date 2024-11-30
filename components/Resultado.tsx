import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Dispatch, SetStateAction } from 'react'

interface Props {
  mensagem: string;
  resetar: any;
}

export default function Resultado({ mensagem, resetar }: Props) {
  return (
    <View>
      <Text style={styles.texto}>{mensagem}</Text>
      <Pressable style={styles.resetar} onPress={resetar}>
        <Text style={[styles.texto, {color: 'white'}]}>{'RESETAR'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  resetar: {
    backgroundColor: "#AF5B5B",
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
  },
  texto: {
    fontWeight: 700,
  }
})