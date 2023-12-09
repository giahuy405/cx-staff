import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { TabTatCa } from './components/TabTatCa';

export default function YeuCauDangXuLy() {
    return (
        <div>
            <Tabs>
                <TabList>
                    <Tab>Chờ duyệt</Tab>
                    <Tab>Đang xử lý</Tab>
                    <Tab>Đã trả lời</Tab>
                    <Tab>Hoàn thành</Tab>
                    <Tab>Tất cả</Tab>
                    <Tab>Kế hoạch đề xuất</Tab>
                </TabList>

                <TabPanel>
                    nội dung  chờ duyệt
                </TabPanel>
                <TabPanel>
                    nội dung   đang xử lý
                </TabPanel>
                <TabPanel>
                    nội dung   đã trả lời
                </TabPanel>
                <TabPanel>
                    nội dung   hoàn thành
                </TabPanel>
                <TabPanel>
                    <TabTatCa />
                </TabPanel>
                <TabPanel>
                    nội dung kế hoạch đề xuất
                </TabPanel>
            </Tabs>
        </div>
    )
}
