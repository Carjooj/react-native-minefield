import { View, StyleSheet } from 'react-native';
import type { CampoType } from './Campo';
import Campo from './Campo';

type TabuleiroProps = {
  tabuleiro: CampoType[][];
  abrirCampo: (linha: number, coluna: number) => void;
  bandeirar: (linha: number, coluna: number) => void;
};

export default function Tabuleiro({ tabuleiro, abrirCampo, bandeirar }: TabuleiroProps) {
  return (
    <View style={styles.container}>
      {tabuleiro.map((linha, linhaIndice) => {
        return (
          <View key={linhaIndice} style={{ flexDirection: 'row' }}>
            {linha.map((campo, colunaIndice) => {
              return (
                <Campo
                  key={colunaIndice}
                  {...campo}
                  abrirCampo={() => abrirCampo(linhaIndice, colunaIndice)}
                  bandeirar={() => bandeirar(linhaIndice, colunaIndice)}
                />
              );
            })}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
