import { View, Text, StyleSheet } from 'react-native';
import { useEffect } from 'react'
import Bandeira from './Bandeira';

interface Props {
  totalBandeiras: number;
}

export default function Bandeiras({ totalBandeiras }: Props) {

  useEffect(() => {
    
  },[totalBandeiras])

  console.log(totalBandeiras)

  return (
    <View>
      <Bandeira proporcao={1.5}/>
      <Text style={styles.texto}>{totalBandeiras}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  texto: {
    fontWeight: 700,
    marginLeft: 25,
  }
})
