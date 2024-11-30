import { View, Text, StyleSheet } from 'react-native';
import { ButtonGroup } from '@rneui/themed'
import { parametros } from '../assets/parametros'

interface SelectProps {
  dificuldade: any;
  setDificuldade: any;
}

export default function Dificuldade({ dificuldade, setDificuldade }: SelectProps) {
  return (
    <View style={styles.container}>
      <View>
      <ButtonGroup
      textStyle={{fontSize: 12}}
      buttons={["FÁCIL", "MÉDIO", "DIFÍCIL"]}
      selectedIndex={dificuldade}
      onPress={(valor) => {
        setDificuldade(valor)
      }}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 170,
  }
})

