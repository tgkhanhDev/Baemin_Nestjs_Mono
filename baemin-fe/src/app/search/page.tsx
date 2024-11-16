import { ShoppingCartOutlined } from '@ant-design/icons';
import React from 'react';
import TypeSelector from './type';
import AreaSelector from './area';
import FilterSelector from './filter';
import ResultFood from './result';

const Page: React.FC = () => {
    const items=[{
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
    {
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
    {
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
    {
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
    {
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
    {
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
    {
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
    {
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
    {
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
    {
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
    {
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
    {
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
    {
        id:'1',
        name:'Cơm Chiên & Nui Xào Bò - Cống Quỳnh',
        address:'102/12 Cống Quỳnh, Quận 1, TP. HCM',
        img:'/food/ga1.jpg',
        kind:'Quán Ăn',
    },
]
    return (
        <>
            <div className='w-full flex flex-row justify-between items-center border-b border-solid'>
                <div className='flex flex-row gap-3'>
                    <AreaSelector />
                    <TypeSelector />
                </div>
                <div className='flex items-center justify-center '>
                    <FilterSelector></FilterSelector>
                </div>

            </div>
            <div className='my-3 flex flex-row'>
                asdasd
            </div>
            <ResultFood items={items} />
        </>
    )
}
export default Page;