import { useMyProfile } from '@/hooks/myProfile';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { PurchasedItemsComponent } from './PurchasedItemsComponent';

export const MyProfilePageComponent = () => {
    const {user,purchasedItems,loading} = useMyProfile();
    const items: TabsProps['items'] = [
        {
          key: '1',
          label: 'Куплені товари',
          children: <PurchasedItemsComponent items={purchasedItems}/>,
        },
      ];

    return <div className="flex flex-col p-4 m-9 border-black border-2 border-solid">
        <div className="flex flex-col gap-4">
            <p>{user.displayName || (user.name + ' ' + user.surname)}</p>
            <p>{user.email}</p>
        </div>
        <Tabs items={items}/>
    </div>
}