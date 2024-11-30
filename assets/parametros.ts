import { Dimensions } from 'react-native'

export const parametros = {
  blocoSize: 30,
  bordaSize: 5,
  fonteSize: 15,
  painelRatio: 0.15,
  nivelDificuldade: 0.1,
  getColumnsAmount() {
    const largura = Dimensions.get('window').width * 0.97
    return Math.floor(largura / this.blocoSize)
  },
  getRowsAmount() {
    const alturaTotal = Dimensions.get('window').height * 0.95
    const alturaBorda = alturaTotal * (1 - this.painelRatio)
    return Math.floor(alturaBorda / this.blocoSize)
  }
}