import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar'
import { FaHome } from "react-icons/fa";
import { useToggleSideBar } from '../zustand/toggleSidebar';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMenu } from '../services/Menu/menu'
import { GET_MENU } from '../utils/queryKey'
import md5 from 'md5';
import parse from 'html-react-parser';
const SideBar = () => {
    const { collapsed } = useToggleSideBar();

    const { data: menuList } = useQuery({
        queryKey: [GET_MENU, {
            tk: "huypham",
            mk: md5('cxM123#@!')
        }],
        queryFn: async ({ queryKey }) => {
            const [, { tk, mk }] = queryKey
            return await getMenu({ tk, mk })
        },
        enabled: true,
        staleTime: 300000
    })

    const removeHtmlTags = (htmlString) => {
        if (!htmlString) {
            return '';
        }
        const strippedString = htmlString.replace(/<[^>]*>/g, '');
        return strippedString;
    };

    const renderList = () => {
        return menuList?.map((item, index) => {
            if (item.sub === "null") {
                return <MenuItem component={<Link to={item.link} />} key={index} icon={<i className={`fa ${item.icss}`}></i>} >
                    {/* {removeHtmlTags(item.name)} */}
                    {parse(item.name)}
                </MenuItem>
            }
            else
                return <SubMenu label={removeHtmlTags(item.name)} icon={<i className={`fa-solid ${item.icss}`}></i>} key={index}>
                    {item.sub.map((itemSub, indexSub) =>
                        <MenuItem component={<Link to={itemSub.link} />} key={indexSub} icon={<i className={`fa ${itemSub.icss}`}></i>} >
                            {/* {removeHtmlTags(itemSub.name)} */}
                            {/* {parse(itemSub.name)} */}
                            {typeof itemSub.name === 'string' ? parse(itemSub.name) : ''}
                        </MenuItem>
                    )}
                </SubMenu>
        })
    }

    return (
        <div className='wrapp-sidebar'>
            <Sidebar collapsed={collapsed}>
                <Menu
                    menuItemStyles={{
                        button: ({ level, active, disabled }) => {
                            if (level === 0)
                                return {
                                    color: disabled ? 'red' : 'black',
                                    backgroundColor: active ? 'green' : undefined,
                                };
                        },
                    }}
                >
                    <div className='img-dashboard'>
                        <img src="https://choixanh.net/mediaroot/media/userfiles/useruploads/6/image/he-thong/logo-10.png" alt="" />
                    </div>
                    {renderList()}
                </Menu>
            </Sidebar>
        </div>

    )
}

export default SideBar