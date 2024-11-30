import { View, Text, StyleSheet} from 'react-native'

interface LabelProps {
  texto: string;
}

export default function Label({ texto }: LabelProps) {
  return (
    <View>
    <Text>{texto}</Text>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    
  },
  texto: {

  }
})