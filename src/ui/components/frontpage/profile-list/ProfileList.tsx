import { IonCol, IonRow } from '@ionic/react';
import { supabase } from 'apis/supabaseClient';

const ProfileList: React.FC = () => {
  return (
    <IonRow>
      <IonCol>
        <div className="grid grid-cols-1 divide-y">
          <div className='flex flex-row'>
            <div className='pl-6 pt-4 pr-4 pb-4'>
              <div className="relative w-16 h-16 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"> {/* circle around icon */}
                <img src="https://www.w3schools.com/css/paris.jpg" alt="" style={{ height: '68px', width: '68px' }}></img>
              </div>
            </div>
            <p className='pt-[33px] text-lg'>Nikolaj Engstrøm Pregaard</p>
          </div>
          <div className='flex flex-row'>
            <div className='pl-6 pt-4 pr-4 pb-4'>
              <div className="relative w-16 h-16 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"> {/* circle around icon */}
                <img src="https://www.w3schools.com/css/paris.jpg" alt="" style={{ height: '68px', width: '68px' }}></img>
              </div>
            </div>
            <p className='pt-[33px] text-lg'>Nikolaj Engstrøm Pregaard</p>
          </div>
          <div className='flex flex-row'>
            <div className='pl-6 pt-4 pr-4 pb-4'>
              <div className="relative w-16 h-16 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"> {/* circle around icon */}
                <img src="https://www.w3schools.com/css/paris.jpg" alt="" style={{ height: '68px', width: '68px' }}></img>
              </div>
            </div>
            <p className='pt-[33px] text-lg'>Nikolaj Engstrøm Pregaard</p>
          </div>
          <div className='flex flex-row'>
            <div className='pl-6 pt-4 pr-4 pb-4'>
              <div className="relative w-16 h-16 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"> {/* circle around icon */}
                <img src="https://www.w3schools.com/css/paris.jpg" alt="" style={{ height: '68px', width: '68px' }}></img>
              </div>
            </div>
            <p className='pt-[33px] text-lg'>Nikolaj Engstrøm Pregaard</p>
          </div>
          <div className='flex flex-row'>
            <div className='pl-6 pt-4 pr-4 pb-4'>
              <div className="relative w-16 h-16 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"> {/* circle around icon */}
                <img src="https://www.w3schools.com/css/paris.jpg" alt="" style={{ height: '68px', width: '68px' }}></img>
              </div>
            </div>
            <p className='pt-[33px] text-lg'>Nikolaj Engstrøm Pregaard</p>
          </div> 
        </div>
        </IonCol>
    </IonRow>
  );
};

export default ProfileList;