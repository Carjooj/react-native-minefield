import { View, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { parametros } from './assets/parametros';
import type { CampoType } from './components/Campo'
import Tabuleiro from './components/Tabuleiro'
import Header from './components/Header'
import Campo from './components/Campo'

export default function App() {

  const [finalizado, setFinalizado] = useState<boolean>(false)
  const [mensagem, setMensagem] = useState<string>("")
  const [dificuldade, setDificuldade] = useState<number>(0)
  
  const [limiteBandeiras, setLimiteBandeiras] = 
  useState<number>(Math.floor(parametros.getRowsAmount() * parametros.getColumnsAmount() * ((1 + dificuldade) * 0.1)))

  useEffect(() => {
    setLimiteBandeiras(Math.floor(parametros.getRowsAmount() * parametros.getColumnsAmount() * ((1 + dificuldade) * 0.1)))
    resetar()
  },[dificuldade])
  
  const calcularCamposVizinhos = (tabuleiro: CampoType[][]) => {
    const direcoes = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],          [0, 1],
      [1, -1], [1, 0], [1, 1],
    ]

    for (let linha = 0; linha < tabuleiro.length; linha++) {
      for (let coluna = 0; coluna < tabuleiro[0].length; coluna++) {
        if (!tabuleiro[linha][coluna].minado) {
          let contagem = 0;

          direcoes.forEach(([dx, dy]) => {
            const novaLinha = linha + dx
            const novaColuna = coluna + dy
            if (novaLinha >= 0 && novaLinha < tabuleiro.length &&
                novaColuna >= 0 && novaColuna < tabuleiro[0].length &&
                tabuleiro[novaLinha][novaColuna].minado) {
                  contagem++
                }
          })
          tabuleiro[linha][coluna].aoredor = contagem;
        }
      }
    }

  }

  const gerarTabuleiro = () => {
    const linhas = parametros.getRowsAmount()
    const colunas = parametros.getColumnsAmount()
    const minasTotais = Math.floor(linhas * colunas * ((1 + dificuldade) * 0.1))

    const tabuleiro = Array(linhas)
      .fill(null)
      .map(() =>
        Array(colunas)
          .fill(null)
          .map(() => ({
            minado: false,
            aberto: false,
            aoredor: 0,
            explosao: false,
            bandeirado: false,
          }))
      );

      let minasGeradas = 0;

      while (minasGeradas < minasTotais) {
        const linha = Math.floor(Math.random() * linhas)
        const coluna = Math.floor(Math.random() * colunas)

        if (!tabuleiro[linha][coluna].minado) {
          tabuleiro[linha][coluna].minado = true;
          minasGeradas++
        }
      }
      calcularCamposVizinhos(tabuleiro)
      return tabuleiro
  };

  const resetar = () => {
    setFinalizado(false)
    setMensagem("")
    setTabuleiro(gerarTabuleiro)
  }


  const [tabuleiro, setTabuleiro] = useState<CampoType[][]>(gerarTabuleiro())

  const abrirCampo = (linha: number, coluna: number) => {
    if (!finalizado) {
      const tabuleiroCopy = [...tabuleiro]
      const campo = tabuleiroCopy[linha][coluna]

      if (campo.aberto || campo.bandeirado) {
        return;
      } 

      campo.aberto = true;

      ganhar(tabuleiro)

      if (campo.minado) {
        campo.explosao = true
        perder(tabuleiro)
      } else if (campo.aoredor === 0) {
        abrirCampos(tabuleiro, linha, coluna)
      }

      setTabuleiro(tabuleiroCopy)
    }
  }

  const abrirCampos = (tabuleiro: CampoType[][], linha: number, coluna: number) => {
    const direcoes = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],          [0, 1],
      [1, -1], [1, 0], [1, 1],
    ]

    direcoes.forEach(([dx, dy]) => {
      const novaLinha = linha + dx
      const novaColuna = coluna + dy
      if (novaLinha >= 0 && novaLinha < tabuleiro.length &&
          novaColuna >= 0 && novaColuna < tabuleiro[0].length &&
          !tabuleiro[novaLinha][novaColuna].aberto) {
        abrirCampo(novaLinha, novaColuna)
        }
    })
  }

  const bandeirar = (linha: number, coluna: number) => {
    if (!finalizado) {
      const tabuleiroCopy = [...tabuleiro]
      const campo = tabuleiroCopy[linha][coluna]

      if (campo.aberto || limiteBandeiras <= 0) {
        return
      }

      if (campo.bandeirado) {
        campo.bandeirado = false
        setLimiteBandeiras(limiteBandeiras + 1)
      } else {
         campo.bandeirado = true;
         setLimiteBandeiras(limiteBandeiras - 1)

      }
      setTabuleiro(tabuleiroCopy)
    }
  }



  const perder = (tabuleiro: CampoType[][]) => {
    setFinalizado(true)
    setMensagem("VOCÊ PERDEU")
    for (let linha = 0; linha < tabuleiro.length; linha++) {
      for (let coluna = 0; coluna < tabuleiro[0].length; coluna++) {
        if (tabuleiro[linha][coluna].minado) {
          tabuleiro[linha][coluna].bandeirado = false
          tabuleiro[linha][coluna].aberto = true
          // exibir a mensagem que perdeu, e exibir a possibilidade de jogar novamente
        }
      }
    }
  }

  const ganhar = (tabuleiro: CampoType[][]) => {
    let contagem = 0
    let area = tabuleiro.length * tabuleiro[0].length
    const minasTotais = Math.floor(tabuleiro.length * tabuleiro[0].length * 0.1)
    const totalSemMinas = area - minasTotais
    for (let linha = 0; linha < tabuleiro.length; linha++) {
      for (let coluna = 0; coluna < tabuleiro[0].length; coluna++) {
        if (tabuleiro[linha][coluna].aberto && !tabuleiro[linha][coluna].minado) {
          contagem++
        }
      }
    }
    if (contagem == totalSemMinas) {
      setFinalizado(true)
      setMensagem("VOCÊ GANHOU!!!")
    } 
  }

  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
          <Header 
          totalBandeiras={limiteBandeiras} 
          dificuldade={dificuldade} 
          setDificuldade={setDificuldade}
          mensagem={mensagem}
          resetar={resetar}
          />
          <Tabuleiro tabuleiro={tabuleiro} abrirCampo={abrirCampo} bandeirar={bandeirar}/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  texto: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
