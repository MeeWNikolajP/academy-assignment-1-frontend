import React from 'react';
import { IonContent, IonTitle } from '@ionic/react';
import ProfileList from 'ui/components/frontpage/profile-list/ProfileList';

const Tab3: React.FC = () => (
  <IonContent color={'white-background'}>
    <ProfileList />
  </IonContent>
);

export default Tab3;
