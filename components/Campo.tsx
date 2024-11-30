import {
  View,
  StyleSheet,
  Text,
  ColorValue,
  Pressable,
  GestureResponderEvent,
} from 'react-native';
import { parametros } from '../assets/parametros';
import { useState } from 'react';
import Mina from './Mina';
import Bandeira from './Bandeira';

type Estilo = {
  height?: number;
  widht?: number;
  borderWidth?: number;
  backgroundColor?: string;
  borderLeftColo?: string;
  borderTopColor?: string;
  borderRightColor?: string;
  borderBottomColor?: string;
};

export interface CampoType {
  minado: boolean;
  aberto: boolean;
  aoredor: number;
  explosao: boolean;
  bandeirado: boolean;
}

interface CampoProps extends CampoType {
  abrirCampo: (event: GestureResponderEvent) => void;
  bandeirar: (event: GestureResponderEvent) => void;
}

export default function Campo({
  minado,
  aberto,
  aoredor,
  explosao,
  bandeirado,
  abrirCampo,
  bandeirar,
}: CampoProps) {
  const estiloCampo: Estilo[] = [styles.campo];

  if (aberto) {
    estiloCampo.push(styles.aberto);
  }

  if (explosao) {
    estiloCampo.push(styles.explosao);
  }

  if (bandeirado) {
    estiloCampo.push(styles.bandeirado);
  }

  if (!aberto && !explosao) {
    estiloCampo.push(styles.regular);
  }

  if (estiloCampo.length === 1) {
    estiloCampo.push(styles.regular);
  }
  let color: ColorValue = '#000';

  if (aoredor > 0) {
    if (aoredor == 1) {
      color = '#2A28D7';
    }
    if (aoredor == 2) {
      color = '2B520F';
    }
    if (aoredor > 2 && aoredor < 6) {
      color = '#F9060A';
    }
    if (aoredor > 6) {
      color = '#F221A9';
    }
  }

  return (
    <Pressable
      style={estiloCampo}
      onPress={abrirCampo}
      onLongPress={bandeirar}>
      {!minado && aberto && aoredor > 0 ? (
        <Text style={[styles.label, { color: color }]}>{aoredor}</Text>
      ) : (
        false
      )}
      {minado && aberto ? <Mina /> : false}
      {bandeirado && !aberto ? <Bandeira /> : false}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  campo: {
    height: parametros.blocoSize,
    width: parametros.blocoSize,
    borderWidth: parametros.bordaSize,
  },
  regular: {
    backgroundColor: '#999',
    borderLeftColor: '#CCC',
    borderTopColor: '#CCC',
    borderRightColor: '#333',
    borderBottomColor: '#333',
  },
  aberto: {
    backgroundColor: '#999',
    borderColor: '#777',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: 700,
    fontSize: parametros.fonteSize,
  },
  explosao: {
    backgroundColor: 'red',
    borderColor: 'red',
  },
  bandeirado: {},
});
