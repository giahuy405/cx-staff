import { useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import TabKinhDoanh from '../../components/TabKinhDoanh'
import { GET_KHACH_HANG } from '../../utils/queryKey'
import { getKhachHangList } from '../../services/KinhDoanh/kinhDoanh'
import { Input, Space, Table, Button, Popover } from 'antd';
import { HiOutlineSearch } from "react-icons/hi";
import { NavLink } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { RxCountdownTimer } from "react-icons/rx";
import { LiaFileExcel } from "react-icons/lia";
import { LiaFileInvoiceSolid } from "react-icons/lia";
export default function QuanLyKhachHang() {

    const { data: listData } = useQuery({
        queryKey: [GET_KHACH_HANG, {
            tk: "huypham",
            mk: 'e87cbf3ec7528de78fd28327c5cdfd6e'
        }],
        queryFn: async ({ queryKey }) => {
            const [, { tk, mk }] = queryKey
            return await getKhachHangList({ tk, mk })
        },
        staleTime: 30000
    })
    console.log(listData && listData)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };



    const getColumnSearchProps = (dataIndex, customRender) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Nhập dữ liệu cần tìm`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type='primary'
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        // icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                        className='bg-orange-500 text-white rounded hover:bg-orange-600'
                    >
                        Tìm
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Xóa
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            clearFilters && handleReset(clearFilters)
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <HiOutlineSearch
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text, obj) => {
            const defaultRender = customRender ? customRender(text, obj) : text;
            return searchedColumn === dataIndex ? (
                defaultRender
            ) : (
                defaultRender
            );
        },
    });
    console.log(listData && listData)
    const column = [
        {
            title: "Tên khách hàng",
            dataIndex: 'makh',
            ...getColumnSearchProps('makh', (text, obj) => (

                <>
                    {text}
                </>

            )),
        },
        {
            title: "Địa chỉ",
            dataIndex: 'diachikh',
            sorter: {
                compare: (a, b) => a.diachikh - b.diachikh,
            },
        },
        {
            title: "Email",
            dataIndex: 'emailkh',
            // ...getColumnSearchProps('trangthaiduyet'),
            render: (text, obj) => <div >
                {text}
            </div>,
            sorter: {
                compare: (a, b) => a.emailkh - b.emailkh,
            },
        },
        {
            title: "Di động",
            dataIndex: 'mobilekh',
            render: (text, obj) => <div >
                {text}
            </div>,
            sorter: {
                compare: (a, b) => a.mobilekh - b.mobilekh,
            },
        },
        {
            title: "Tùy chỉnh",
            dataIndex: 'id',
            render: (text, obj) => <div className='group-btn-action'>
                <Popover content="Sửa" >
                    <Button size='small'>
                        <FaEdit />
                    </Button>
                </Popover>
                <Popover content="Lịch sử" >
                    <Button size='small'>
                        <RxCountdownTimer />
                    </Button>
                </Popover>
                <Popover content="Báo giá" >
                    <Button size='small'>
                        <LiaFileExcel />
                    </Button>
                </Popover>
                <Popover content="Hợp đồng" >
                    <Button size='small'>
                        <LiaFileInvoiceSolid />
                    </Button>
                </Popover>
            </div>,
        },
    ]
    const onChange = () => {

    }
    return (
        <div>
            <TabKinhDoanh />

            <h3>Quản lý khách hàng</h3>
            <form className='canhan-search'>
                <div className="input-wrapper">
                    <input className="input" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" type="text" placeholder=" " data-placeholder="E-mail" required />
                    <span className="placeholder">Nhập từ khóa cần tìm</span>
                </div>
            </form>
            <br />
            <Table
                columns={column}
                dataSource={listData && listData[0]?.data}
                onChange={onChange}
                scroll={{ y: 600 }}
                pagination={{
                    showSizeChanger: true, pageSize: 20,
                }}
            />
        </div>
    )
}
