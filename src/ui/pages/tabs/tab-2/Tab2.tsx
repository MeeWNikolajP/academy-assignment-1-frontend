import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import ProfilePage from 'ui/components/frontpage/profile-page/ProfilePage';
import { Users } from 'types/profilePageInfo';

const Tab2: React.FC = () => (
  <IonContent>
    <ProfilePage />
  </IonContent>
);

export default Tab2;
