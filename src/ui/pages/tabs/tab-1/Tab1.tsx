import React, { useEffect, useState } from 'react';
import { IonContent } from '@ionic/react';
import TakePicture from 'ui/components/frontpage/take-picture/TakePicture';
import { Photo } from '@capacitor/camera';
import { supabase } from 'apis/supabaseClient';
import { useloggedInUserStore } from 'store/loggedInUser';

const Tab1: React.FC = () => {
  const [picture, setPicture] = React.useState<Photo>();
  const [message, setMessage] = useState<string>('');
  const user = useloggedInUserStore();

  useEffect(() => {
    supabase.functions
      .invoke('hello_world', {
        body: { name: user.loggedInUser?.fullname },
      })
      .then((res) => setMessage(res.data.message));
  }, [user]);

  return (
    <IonContent color={'white-background'}>
      <h3 className="justify-center flex h-full w-full items-center "> {message} </h3>
      {picture && <img src={picture?.webPath} alt="your upload" className="h-full w-auto m-auto" />}

      <TakePicture onPictureTaken={(p) => setPicture(p)} />
    </IonContent>
  );
};

export default Tab1;
