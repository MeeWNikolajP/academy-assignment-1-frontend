import { IonCol, IonRow } from '@ionic/react';
import { supabase } from 'apis/supabaseClient';
import { useEffect, useState } from 'react';
import { Users } from 'types/profilePageInfo';

const ProfileList: React.FC = () => {
  const [users, setUsers] = useState<Users[] | null>([]);

  const getUsers = async () => {
    const { error, data } = await supabase.from('profile').select();

    if (data) {
      setUsers(data);
    }

    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <IonRow>
      <IonCol>
        <div className="grid grid-cols-1 divide-y">
          {users?.map((user) => {
            return (
              <div key={user.id} className="flex flex-row">
                <div className="pl-6 pt-4 pr-4 pb-4">
                  <div className="relative w-16 h-16 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <img src="https://www.w3schools.com/css/paris.jpg" alt="" style={{ height: '68px', width: '68px' }}></img>
                  </div>
                </div>
                <p className="pt-[33px] text-lg">{user.fullname}</p>
              </div>
            );
          })}
        </div>
      </IonCol>
    </IonRow>
  );
};

export default ProfileList;
