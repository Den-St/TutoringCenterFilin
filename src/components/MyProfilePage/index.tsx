import { useMyProfile } from '@/hooks/myProfile';
import { Button, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { PurchasedItemsComponent } from './PurchasedItemsComponent';
import { EditTeacherInfo } from './EditTeacherInfo';

export const MyProfilePageComponent = () => {
    const {user,purchasedItems,loading,isOnEditing,onChangeTeacherInfo,onEditingToggle,onChangeChosenSubjects,chosenSubjects} = useMyProfile();
    const items: TabsProps['items'] = [
        {
          key: '1',
          label: 'Куплені товари',
          children: <PurchasedItemsComponent items={purchasedItems}/>,
        },
      ];
      console.log(chosenSubjects) 
    return <div className="flex flex-col p-4 m-9 border-black border-2 border-solid">
        <div className="flex flex-col gap-4">
            <p>{user.displayName || (user.name + ' ' + user.surname)}</p>
            <p>{user.email}</p>
        </div>
        <EditTeacherInfo onChangeChosenSubjects={onChangeChosenSubjects}  isOnEditing={isOnEditing} onChangeTeacherInfo={onChangeTeacherInfo} onEditingToggle={onEditingToggle}/>
        <Tabs items={items}/>
    </div>
}