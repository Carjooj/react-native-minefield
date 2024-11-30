import { View, Text, StyleSheet } from 'react-native';
import { Dispatch, SetStateAction } from 'react';
import Dificuldade from './Dificuldade';
import Bandeiras from './Bandeiras';
import Resultado from './Resultado';
import type { CampoType } from './Campo';

interface HeaderProps {
  totalBandeiras: number;
  dificuldade: any;
  setDificuldade: Dispatch<SetStateAction<number>>;
  mensagem: string;
  resetar: () => void;
}

export default function Header({
  totalBandeiras,
  dificuldade,
  setDificuldade,
  mensagem,
  resetar,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      <Bandeiras totalBandeiras={totalBandeiras} />
      <Dificuldade dificuldade={dificuldade} setDificuldade={setDificuldade} />
      <Resultado mensagem={mensagem} resetar={resetar}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
  },
});
