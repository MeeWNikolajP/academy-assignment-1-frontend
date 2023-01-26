import React from 'react';
import './tab-4.module.css';
import { IonContent } from '@ionic/react';
import WorkPage from 'ui/components/frontpage/work-page/WorkPage';
const Tab4: React.FC = () => {
  return (
    <IonContent color={'white-background'}>
      <WorkPage />
    </IonContent>
  );
};

export default Tab4;
