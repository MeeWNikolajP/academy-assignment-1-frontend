import { IonButton, IonCol, IonIcon, IonRow, IonItem, IonInput, IonText } from '@ionic/react';
import { supabase } from 'apis/supabaseClient';
import { personOutline, mail, call, calendar } from 'ionicons/icons';
import { useState } from 'react';
import { useloggedInUserStore } from 'store/loggedInUser';
import { t } from 'i18next';

const ProfilePage: React.FC = () => {
  // Hook for getting isLoggedInUser from the store.
  const loggedInUser = useloggedInUserStore((state) => state.loggedInUser);
  const setLoggedInUser = useloggedInUserStore((state) => state.setloggedInUser);

  const [fullname, setFullname] = useState<string | undefined>(loggedInUser?.fullname);
  const [email, setEmail] = useState<string | undefined>(loggedInUser?.email);
  const [phonenumber, setPhonenumber] = useState<string | undefined>(loggedInUser?.phonenumber);
  const [birthday, setBirthday] = useState<string | undefined>(loggedInUser?.birthday);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [editingMode, setEditingMode] = useState<boolean>(false);

  const handleUpDate = async () => {
    const { data, error } = await supabase
      .from('profile')
      .update({
        fullname: fullname,
        email: email,
        phonenumber: phonenumber,
        birthday: birthday,
      })
      .eq('id', loggedInUser?.id)
      .select();

    if (error) {
      console.log(error);
      setEditingMode(false);
      setIsSaved(false);
    }

    if (data) {
      const fetchSpecificUser = await supabase.from('profile').select().eq('id', loggedInUser?.id).single();
      if (fetchSpecificUser.data !== null) {
        setLoggedInUser(fetchSpecificUser.data);
        /* Requires email confirmation on newly set email (cannot be disabled) */
        console.log(email);
        await supabase.auth.updateUser({
          email,
        });
      }
    }
  };

  const updateAndChangeState = async () => {
    setEditingMode(!editingMode);
    if (editingMode === true) {
      handleUpDate();
      setIsSaved(true);
    }
  };

  return (
    <>
      <IonRow>
        <IonCol>
          <div className="flex justify-center pt-4 pb-4" style={{ backgroundColor: 'lightblue' }}>
            <div className="relative w-20 h-20 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              {' '}
              {/* circle around icon */}
              <img src="https://www.w3schools.com/css/paris.jpg" alt="" style={{ height: '80px', width: '80px' }}></img>
            </div>
          </div>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <div className="grid grid-cols-1 divide-y">
            <div className="flex flex-row pl-8 p-4 items-center">
              <IonIcon icon={personOutline} className="items-center text-[26px]" />
              <IonItem lines={editingMode ? 'full' : 'none'}>
                <IonInput
                  type="text"
                  readonly={editingMode ? false : true}
                  value={fullname}
                  onIonChange={(e) => setFullname(e.detail.value ?? '')}
                  style={{ width: '300px' }}
                ></IonInput>
              </IonItem>
            </div>
            <div className="flex flex-row pl-8 p-4 items-center">
              <IonIcon icon={mail} className="items-center text-[26px]" />
              <IonItem lines={editingMode ? 'full' : 'none'}>
                <IonInput
                  type="text"
                  readonly={editingMode ? false : true}
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value ?? '')}
                  style={{ width: '300px', color: 'black' }}
                ></IonInput>
              </IonItem>
            </div>
            <div className="flex flex-row pl-8 p-4 items-center">
              <IonIcon icon={call} className="items-center text-[26px]" />
              <IonItem lines={editingMode ? 'full' : 'none'}>
                <IonInput
                  type="text"
                  readonly={editingMode ? false : true}
                  value={phonenumber}
                  onIonChange={(e) => setPhonenumber(e.detail.value ?? '')}
                  style={{ width: '300px' }}
                ></IonInput>
              </IonItem>
            </div>
            <div className="flex flex-row pl-8 p-4 items-center">
              <IonIcon icon={calendar} className="items-center text-[26px]" />
              <IonItem lines={editingMode ? 'full' : 'none'}>
                <IonInput
                  type="text"
                  readonly={editingMode ? false : true}
                  value={birthday}
                  onIonChange={(e) => setBirthday(e.detail.value ?? '')}
                  style={{ width: '300px' }}
                ></IonInput>
              </IonItem>
            </div>
            <div className="pt-3 justify-center flex">
              <IonButton type="button" color="secondary" className="w-48" onClick={() => updateAndChangeState()}>
                {editingMode ? 'Save Profile' : 'Edit Profile'}
              </IonButton>
            </div>
          </div>
          <IonText className={`justify-center text-center flex text-red-500 ${!isSaved && 'opacity-0'}`}>
            {t('authentication.emailChangeRequestSuccess')}
          </IonText>
        </IonCol>
      </IonRow>
    </>
  );
};

export default ProfilePage;
