import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';
import { Input, Space, Table, Button, Pagination } from 'antd';
import { HiOutlineSearch } from "react-icons/hi";
import TabBanLamViec from '../../components/TabBanLamViec'
import useMaTinhTrangHS from '../../hooks/MaTinhTrangHS';
import useDanhMucHopDong from '../../hooks/DanhMucHopDong';

export default function CaNhan() {
    const [current, setCurrent] = useState(1);
    const { data: listData } = useDanhMucHopDong(current)

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
                // <Highlighter
                //     highlightStyle={{
                //         backgroundColor: '#ffc069',
                //         padding: 0,
                //     }}
                //     searchWords={[searchText]}
                //     autoEscape
                //     textToHighlight={text ? text.toString() : ''}
                // />
                defaultRender
            ) : (
                defaultRender
            );
        },
    });
    const column = [
        {
            title: "Mã",
            dataIndex: 'idhs',
            ...getColumnSearchProps('idhs', (text, obj) => (
                <NavLink to={`/staff/yeucau/xemchitiet.asp?id=${text}`}>
                    {text}
                </NavLink>
            )),
            sorter: {
                compare: (a, b) => a.idhs - b.idhs,
            },
        },
        {
            title: "Lĩnh vực",
            dataIndex: 'idhs',

        },
        {
            title: "Tình trạng",
            dataIndex: 'trangthaiduyet',
            // ...getColumnSearchProps('trangthaiduyet'),
            render: (text, obj) => <>
                {/* {text === 'False' ? 'Đang xử lý' : 'Đã xử lý'} */}
                {/* <p>{obj.ngaydang}</p> */}

                <span>[{obj.ngaydang}]</span>
                <span className="btn btn-xs btn-danger right">{obj.ngayketthuc}</span>
            </>,
            sorter: {
                compare: (a, b) => a.trangthaiduyet - b.trangthaiduyet,
            },
        },
        {
            title: "Nhân viên",
            dataIndex: 'idhs',
            render: (text, obj) => <div >
                <NavLink to={`/staff/yeucau/duyetyeucau.asp?id=${obj.idhs}`}>
                    Duyệt yêu cầu
                </NavLink>
            </div>,

        },
        {
            title: "Dịch vụ",
            dataIndex: 'tieude',
            ...getColumnSearchProps('tieude'),
            sorter: {
                compare: (a, b) => a.tieude - b.tieude,
            },
        },
    ]
    const onChange = (page, pageSize) => {
        setCurrent(page)
    }
    const pageNumber = listData && listData[0].recordsTotal
    const itemEachPage = listData && listData[0].recordsFiltered
    const [currentDataList, setCurrentDataList] = useState([]);
    useEffect(() => {
        listData && setCurrentDataList(listData[0]?.data)
    }, [listData])
    return (
        <>

            <TabBanLamViec />
            <h4>YÊU CẦU CHỜ DUYỆT</h4>
            <form className='canhan-search'>
                <div className="input-wrapper">
                    <input className="input" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" type="text" placeholder=" " data-placeholder="E-mail" required />
                    <span className="placeholder">Nhập từ khóa cần tìm</span>
                </div>
            </form>
            <br />

            <Table
                columns={column}
                dataSource={listData ? listData[0]?.data : currentDataList}
                // onChange={onChange}
                scroll={{ y: 600 }}
                loading={!listData}
                pagination={false}
            />
            <MyPagination
                total={pageNumber}
                current={current}
                onChange={onChange}
                itemEachPage={itemEachPage}
            />

        </>
    )
}


const MyPagination = ({ total, onChange, current, itemEachPage }) => {
    return (
        <Pagination
            onChange={onChange}
            total={total}
            current={current}
            pageSize={itemEachPage}
        />
    );
};
