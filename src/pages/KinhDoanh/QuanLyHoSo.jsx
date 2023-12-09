import React, { useEffect, useRef, useState } from 'react'
import TabQuanLyHoSo from './components/TabQuanLyHoSo'
import Select from 'react-select'
import { Input, Space, Table, Button, Pagination, DatePicker } from 'antd';
import useDanhMucHopDong from '../../hooks/DanhMucHopDong'
import useMaTinhTrangHS from '../../hooks/MaTinhTrangHS'
import { HiOutlineSearch } from "react-icons/hi";
import { NavLink, useHref } from 'react-router-dom';
import { https } from '../../services/axiosHttp';
import { CiFileOn } from "react-icons/ci";
import { FaHistory } from "react-icons/fa";
import { FaFolder } from "react-icons/fa";
import useFetchCustomer from '../../hooks/MaKhachHang'
import { BASE_URL } from '../../utils/constants';
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]
export default function QuanLyHoSo() {
    const onChangeDatePicker = () => {

    }
    const [tableKey, setTableKey] = useState(0);
    const [current, setCurrent] = useState(1);
    const [dataTable, setDataTable] = useState([])
    const { data: listData } = useDanhMucHopDong(current)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const { data: maTTHS } = useMaTinhTrangHS()
    const resetFilters = () => {
        setTableKey(tableKey => tableKey + 1);
    };
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

    useEffect(() => {
        const fetchDataCustomer = async (id) => {
            try {
                // const res = await https.get(`khachhang.asp?tk=huypham&mk=e87cbf3ec7528de78fd28327c5cdfd6e&id=${id}`);
                const res = await fetch(`${BASE_URL}khachhang.asp?tk=huypham&mk=e87cbf3ec7528de78fd28327c5cdfd6e&id=${id}`)
                const data = await res.json();
                console.log(data)

            } catch (error) {
                console.error('Error fetching   customer data:', error);
            }
        };

        fetchDataCustomer(7666262);
    }, []);



    function getTenTinhTrangHS(id) {
        for (let item of maTTHS[0]?.data) {
            if (item.id.toString() === id.toString())
                return item.tieude
        }
    }
    const column = [
        {
            title: "Khách hàng",
            dataIndex: 'customer',
            ...getColumnSearchProps('customer', (text, obj) => (
                <>
                    <div>
                        <span className='ten-kh'>{obj.customer[0].tenkh}</span>
                        <span className='email-kh'>({obj.customer[0].emailkh})</span>
                    </div>
                    <div className='flexCenter gap10 mt-1'>
                        <button className='flexCenter btn btn-xs btn-warning'>
                            <CiFileOn />     Yêu cầu
                        </button>
                        <button className='flexCenter btn btn-xs btn-info'>
                            <FaHistory style={{ fontSize: "10px" }} />   Lịch sử
                        </button>
                    </div>
                </>
            )),
            sorter: {
                compare: (a, b) => a.idhs - b.idhs,
            },
        },
        {
            title: "Hồ sơ",
            dataIndex: 'sohopdong',
            ...getColumnSearchProps('sohopdong'),
            render: (text, obj) => <div >
                {obj.danhMucHS[0].sobangbaogia}
            </div>,
        },
        {
            title: "Ngày tạo",
            dataIndex: 'trangthaiduyet',
            render: (text, obj) => <>
                <span className="btn btn-xs bg-navy" title="Ngày bắt đầu"><i className="fa fa-calendar-check" aria-hidden="true"></i> {obj.ngaydang}</span>
            </>,
            sorter: {
                compare: (a, b) => a.trangthaiduyet - b.trangthaiduyet,
            },
        },
        {
            title: "Giá trị",
            dataIndex: 'idhs',
            render: (text, obj) => <div >
                <div>
                    {obj.danhMucHS[0].giatribangbaogia}
                </div>
                <div className='flexBetween'>
                    <a href="" className='btn btn-xs btn-danger'>
                        <i className="fa fa-edit" aria-hidden="true"></i>{" "}Sửa
                    </a>
                    <a href="" className='btn btn-xs btn-info'>
                        <i className="fa fa-print" aria-hidden="true"></i>{" "}In
                    </a>
                </div>
            </div>,

        },
        {
            title: "Tình trạng",
            dataIndex: 'matinhtranghs',
            sorter: { compare: (a, b) => a.tieude - b.tieude, },
            ...getColumnSearchProps('matinhtranghs', (text, obj) => (
                <>
                    <span className='text-success'>{getTenTinhTrangHS(obj.matinhtranghs)}</span>{" "}
                    <span>[{obj.tieude}]</span>
                    <button className='btn btn-success btn-xs flexCenter'>
                        <FaFolder />
                        Chứng từ
                    </button>
                </>
            )),
        },
        {
            title: "Ghi chú",
            dataIndex: 'sohopdong',
            render: (text, obj) => <>
                <a href="" className='btn btn-xs bg-purple btn-flat margin tenhopdong'>{obj.sohopdong}</a>
            </>,
        },
        {
            title: "",
            dataIndex: 'idhs',
            render: (text, obj) => <div className='flexCenter gap5'>
                <a href='' className='btn btn-xs btn-info'>
                    <i className="fa fa-sticky-note-o" aria-hidden="true"></i>
                    Thực hiện
                </a>
                <a href='' className='btn btn-xs btn-success'>
                    <i className="fa fa-eye" aria-hidden="true"></i>
                    Log
                </a>
            </div>,
        },
    ]
    const onChange = (page, pageSize) => {
        setCurrent(page)
    }



    const pageNumber = listData && listData[0].recordsTotal
    const itemEachPage = listData && listData[0].recordsFiltered
    const [currentDataList, setCurrentDataList] = useState([]);
    useEffect(() => {
        listData && setCurrentDataList(dataTable)
    }, [listData])

    const { data: customerInfo } = useFetchCustomer()

    useEffect(() => {
        const fetchDataCustomer = async (id) => {
            try {
                const cachedData = localStorage.getItem(`customer_${id}`);
                if (cachedData) {
                    return JSON.parse(cachedData);
                }
                const response = await fetch(`${BASE_URL}khachhang.asp?tk=huypham&mk=e87cbf3ec7528de78fd28327c5cdfd6e&id=${id}`);
                if (!response.ok) {
                    throw new Error(`Error fetching customer data for id ${id}: ${response.status}`);
                }
                const data = await response.json();
                localStorage.setItem(`customer_${id}`, JSON.stringify(data[0].data));
                return data[0].data;
            } catch (error) {
                console.error('Error fetching customer data:', error);
                throw error; // Propagate the error to Promise.all
            }
        };

        const fetchDanhMucHS = async (id) => {
            try {
                const cachedData = localStorage.getItem(`danhMucHS_${id}`);

                if (cachedData) {
                    return JSON.parse(cachedData);
                }
                const response = await fetch(`${BASE_URL}danhmuchoso.asp?tk=huypham&mk=e87cbf3ec7528de78fd28327c5cdfd6e&id=${id}`);
                if (!response.ok) {
                    throw new Error(`Error fetching danhMucHS data for id ${id}: ${response.status}`);
                }
                const data = await response.json();
                localStorage.setItem(`danhMucHS_${id}`, JSON.stringify(data[0].data));
                return data[0].data;
            } catch (error) {
                console.error('Error fetching danhMucHS data:', error);
                throw error; // Propagate the error to Promise.all
            }
        };
        if (listData && listData[0]?.data) {
            const fetchDataPromises = listData[0].data.map((item) => fetchDataCustomer(item.idkh));
            const fetchDanhMucHSPromise = listData[0].data.map((item) => fetchDanhMucHS(item.idkh));
            Promise.all([Promise.all(fetchDataPromises), Promise.all(fetchDanhMucHSPromise)])
                .then(([customerArray, danhMucHSArray]) => {
                    const combinedData = listData[0].data.map((item, index) => ({
                        ...item,
                        customer: customerArray[index],
                        danhMucHS: danhMucHSArray[index]
                    }));

                    console.log(combinedData);
                    setDataTable(combinedData);
                })
                .catch((error) => {
                    console.error('Error fetching additional data:', error);
                });
        }
    }, [listData]);
    return (
        <div>
            <TabQuanLyHoSo />
            <div>
                <div className='input-group'>
                    <label className='control-label col-sm-2 col-xs-3'>Người thực hiện</label>
                    <div className='col-sm-10 col-xs-9'>
                        <Select options={options} />
                    </div>
                </div>
                <div className='input-group'>
                    <label className='control-label col-sm-2 col-xs-3'>Loại dịch vụ</label>
                    <div className='col-sm-10 col-xs-9'>
                        <Select options={options} />
                    </div>
                </div>
                <div className='input-group'>
                    <label className='control-label col-sm-2 col-xs-3'>Trạng thái cập nhật</label>
                    <div className='col-sm-10 col-xs-9'>
                        <input type="text" />
                    </div>
                </div>
                <div className='input-group'>
                    <label className='control-label col-sm-2 col-xs-3'>Thời gian</label>
                    <div className='col-sm-10 col-xs-9'>
                        <div className="flexBetween gap10">
                            <DatePicker onChange={onChangeDatePicker} className='w100' />
                            <DatePicker onChange={onChangeDatePicker} className='w100' />
                        </div>
                    </div>
                </div>
            </div>{/*  */}
            <br />
            <form className='canhan-search'>
                <div className="input-wrapper">
                    <input className="input" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" type="text" placeholder=" " data-placeholder="E-mail" required />
                    <span className="placeholder">Nhập từ khóa cần tìm</span>
                </div>
            </form>
            <Button
                type='primary'
                onClick={() => resetFilters()}>Reset tìm kiếm</Button>
            <br />
            <br />
            <Table
                columns={column}
                dataSource={listData ? dataTable : currentDataList}
                // onChange={onChange}
                scroll={{ y: 600 }}
                loading={!listData}
                pagination={false}
                key={tableKey}
            />
            <MyPagination
                total={pageNumber}
                current={current}
                onChange={onChange}
                itemEachPage={itemEachPage}
            />

        </div>
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
