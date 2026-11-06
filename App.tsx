<<<<<<< HEAD
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
=======
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Notifications from 'expo-notifications';
>>>>>>> edac5ec (SLA)
import NewCallScreen from './src/screens/NewCallScreen';
import CallListScreen from './src/screens/CallListScreen';
import CallDetailScreen from './src/screens/CallDetailScreen';

const Stack = createNativeStackNavigator();

<<<<<<< HEAD
export default function App() {
  return (
    <NavigationContainer>
=======
// Referência de navegação usável fora de componentes React
// (por exemplo, dentro do listener de notificação, abaixo)
export const navigationRef = createNavigationContainerRef<any>();

// Define como o app se comporta ao receber notificação em primeiro plano
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// Navega para o detalhe do chamado indicado no data da notificação
function abrirChamadoDaNotificacao(
  response: Notifications.NotificationResponse | null | undefined
) {
  const chamadoId = response?.notification.request.content.data?.chamadoId;
  if (chamadoId && navigationRef.isReady()) {
    navigationRef.navigate('CallDetail', { chamadoId });
  }
}

export default function App() {
  useEffect(() => {
    // Cria o canal de notificações do Android (obrigatório a partir do Android 8)
    if (Platform.OS === 'android') {
      try {
        Notifications.setNotificationChannelAsync('chamados', {
          name: 'Atualizações de chamados',
          importance: Notifications.AndroidImportance.HIGH,
          // vibrationPattern: [0, 250, 250, 250],
          // lightColor: '#1565c0',
        }).catch((err) =>
          console.log('Canal já existe ou falhou ao registrar:', err)
        );
      } catch (error) {
        console.error('Erro ao criar canal de notificações:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Reage ao toque na notificação com o app aberto ou em background
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => abrirChamadoDaNotificacao(response)
    );

    return () => subscription.remove();
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      // Caso o app tenha sido aberto A PARTIR do toque na notificação (app fechado),
      // só é seguro navegar depois que o container estiver pronto
      onReady={() => abrirChamadoDaNotificacao(Notifications.getLastNotificationResponse())}
    >
>>>>>>> edac5ec (SLA)
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="CallList">
        <Stack.Screen name="CallList" component={CallListScreen} options={{ title: 'Chamados' }} />
        <Stack.Screen name="NewCall" component={NewCallScreen} options={{ title: 'Novo Chamado' }} />
        <Stack.Screen name="CallDetail" component={CallDetailScreen} options={{ title: 'Detalhes do Chamado' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> edac5ec (SLA)
