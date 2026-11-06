import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
<<<<<<< HEAD
=======
import * as Notifications from 'expo-notifications';
>>>>>>> edac5ec (SLA)
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, ALUNO_ID } from '../firebase/config';

type Chamado = {
  description: string;
  photoUri?: string | null;
  address?: string | null;
  status: string;
<<<<<<< HEAD
=======
  slaNotificationId?: string;
>>>>>>> edac5ec (SLA)
};

export default function CallDetailScreen({ route }: any) {
  const { chamadoId } = route.params;
  const [chamado, setChamado] = useState<Chamado | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function carregarChamado() {
      setLoading(true);
      try {
        const docRef = doc(db, 'alunos', ALUNO_ID, 'chamados', chamadoId);
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          setChamado(snapshot.data() as Chamado);
        } else {
          Alert.alert('Erro', 'Chamado não encontrado.');
        }
      } catch (error) {
        console.log('Erro ao buscar chamado:', error);
        Alert.alert('Erro', 'Não foi possível carregar os detalhes do chamado.');
      } finally {
        setLoading(false);
      }
    }

    carregarChamado();
  }, [chamadoId]);

  async function mudarStatus(novoStatus: string) {
    setUpdating(true);
    try {
      const docRef = doc(db, 'alunos', ALUNO_ID, 'chamados', chamadoId);
      await updateDoc(docRef, { status: novoStatus });

<<<<<<< HEAD
=======
      // Se o chamado foi atendido a tempo (ou cancelado),
      // cancela o alerta de SLA que ainda não disparou
      if (
        (novoStatus === 'atendendo' || novoStatus === 'cancelado') &&
        chamado?.slaNotificationId
      ) {
        await Notifications.cancelScheduledNotificationAsync(chamado.slaNotificationId);
      }

>>>>>>> edac5ec (SLA)
      setChamado((prev) => (prev ? { ...prev, status: novoStatus } : null));
      Alert.alert('Sucesso', `Status alterado para "${novoStatus}".`);
    } catch (error) {
      console.log('Erro ao atualizar status:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o status do chamado.');
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!chamado) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFoundText}>Chamado não encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Descrição:</Text>
        <Text style={styles.description}>{chamado.description}</Text>

        <Text style={styles.label}>Status Atual:</Text>
        <Text style={styles.status}>{chamado.status.toUpperCase()}</Text>

        {chamado.address && (
          <>
            <Text style={styles.label}>Endereço:</Text>
            <Text style={styles.infoText}>{chamado.address}</Text>
          </>
        )}

        {chamado.photoUri && (
          <>
            <Text style={styles.label}>Foto:</Text>
            <Image source={{ uri: chamado.photoUri }} style={styles.image} />
          </>
        )}
      </View>

      <View style={styles.actionsContainer}>
        {updating ? (
          <ActivityIndicator size="small" style={{ marginVertical: 10 }} />
        ) : (
          <>
            {chamado.status === 'aberto' && (
              <TouchableOpacity
                style={[styles.button, styles.startButton]}
                onPress={() => mudarStatus('atendendo')}
              >
                <Text style={styles.buttonText}>Iniciar Atendimento</Text>
              </TouchableOpacity>
            )}

            {chamado.status === 'atendendo' && (
              <TouchableOpacity
                style={[styles.button, styles.completeButton]}
                onPress={() => mudarStatus('concluido')}
              >
                <Text style={styles.buttonText}>Concluir Atendimento</Text>
              </TouchableOpacity>
            )}

            {chamado.status !== 'concluido' && chamado.status !== 'cancelado' && (
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => mudarStatus('cancelado')}
              >
                <Text style={styles.buttonText}>Cancelar Chamado</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  notFoundText: { color: '#666', fontSize: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#eee',
  },
  label: { fontSize: 12, color: '#888', marginTop: 12, fontWeight: 'bold' },
  description: { fontSize: 18, color: '#333', fontWeight: 'bold' },
  status: { fontSize: 16, color: '#2e7d32', fontWeight: 'bold', marginTop: 2 },
  infoText: { fontSize: 14, color: '#444', marginTop: 2 },
  image: { width: '100%', height: 200, borderRadius: 8, marginTop: 8 },
  actionsContainer: { gap: 10 },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButton: { backgroundColor: '#1976d2' },
  completeButton: { backgroundColor: '#2e7d32' },
  cancelButton: { backgroundColor: '#d32f2f' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});