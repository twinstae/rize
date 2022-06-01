import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from '@ionic/react';
import { useDependencies } from '../hooks/Dependencies';

const Home = () => {
  const { navigation } = useDependencies()
  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>My Page</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonButton fill="clear" onClick={() => {
        navigation.navigate('/mail')
      }}>IZ*ONE</IonButton>
    </IonContent>
  </IonPage>
  )
};

export default Home;
