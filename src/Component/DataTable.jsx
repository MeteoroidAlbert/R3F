import { Html } from '@react-three/drei';
import { Table } from 'antd';

const tableColumns_reactor = [
    {
        title: "良率黃燈警報(%)",
        dataIndex: "warnyield",
        align: "right",
        width: 130
    },
    {
        title: "良率紅燈警報(%)",
        dataIndex: "alertyield",
        align: "right",
        width: 130
    },
    {
        title: "產速報警(%)",
        dataIndex: "alertspeed",
        align: "right",
        width: 120
    },
    {
        title: "逾停警報(SEC)",
        dataIndex: "alertstop",
        align: "right",
        width: 120
    },
    {
        title: "投料耗損率(%)",
        dataIndex: "lossR",
        align: "right",
        width: 120,
    },
    {
        title: "良率損耗率(%)",
        dataIndex: "yieldR",
        align: "right",
        width: 120,
    },
    {
        title: "生產準備時間(LT)",
        dataIndex: "pdtLT",
        align: "right",
        width: 180,
    },
    {
        title: "作業緩衝時間(WT)",
        dataIndex: "pdtWT",
        align: "right",
        width: 180,
    },
    {
        title: "投料單重",
        dataIndex: "feedinwt",
        align: "right",
        width: 120,
    },
    {
        title: "產出單重",
        dataIndex: "outputwt",
        align: "right",
        width: 120,
    },
    {
        title: "投入計量單位",
        dataIndex: "feedUOMUID",
        width: 120,
    },
    {
        title: "投入量",
        dataIndex: "feedin",
        align: "right",
        width: 120,
    },
    {
        title: "產出計量單位",
        dataIndex: "outputUOMUID",
        width: 120,
    },
    {
        title: "產出量",
        dataIndex: "output",
        align: "right",
        width: 120,
    },
    {
        title: "註記",
        dataIndex: "note",
        width: 120,
        ellipsis: true,
    },

];

const fakeData_reactor = [
    {
        warnyield: 90,
        alertyield: 80,
        alertspeed: 90,
        alertstop: 120,
        lossR: 15,
        yieldR: 5,
        pdtLT: 60,
        feedinwt: 51,
        feedUOMUID: "kg",
        feedin: 1000,
        outputwt: 100,
        outputUOMUID: "kg",
        output: 900,
    }
]

export const DataTableReactor = () => {
    return (
        <Html position={[-40, 25, -20]} rotation={[0, Math.PI / 2, 0]} transform occlude>
            <div className="bg-white p-2  overflow-x-auto">
                <Table columns={tableColumns_reactor} dataSource={fakeData_reactor} />
            </div>
        </Html>
    )
}

const tableColumns_mixer = [
    {
        title: "TEST1",
        dataIndex: "test1",
        width: 120,
    },
    {
        title: "TEST2",
        dataIndex: "test2",
        width: 120,
    },
    {
        title: "TEST3",
        dataIndex: "test3",
        width: 120,
    },
    {
        title: "TEST4",
        dataIndex: "test4",
        width: 120,
    },
    {
        title: "TEST5",
        dataIndex: "test5",
        width: 120,
    }
]

const fakeData_mixer = [
    {
        test1: "1",
        test2: "2",
        test3: "3",
        test4: "4",
        test5: "5",
    }
]

export const DataTableMixer = () => {
    return (
        <Html position={[66, 4, -60]} rotation={[0, 0, 0]} transform occlude>
            <div className="bg-white p-2  overflow-x-auto">
                <Table columns={tableColumns_mixer} dataSource={fakeData_mixer} />
            </div>
        </Html>
    )
}