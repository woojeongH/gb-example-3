/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Grid from "@toast-ui/react-grid";
import { useEffect, useRef, useState } from "react";
import "tui-grid/dist/tui-grid.css";

const initData = [
  { id: 1, name: "Editor", col1: "col1", col2: "col2" },
  { id: 2, name: "Grid", col1: "col1", col2: "col2" },
  { id: 3, name: "Chart", col1: "col1", col2: "col2" },
];

const columns = [
  { name: "id", header: "ID" },
  { name: "name", header: "Name", editor: "text" },
  { name: "col1", header: "Col1", editor: "text" },
  { name: "col2", header: "Col2", editor: "text" },
];

const dummyFetch = () => {
  return new Promise((resolve, reject) => {
    try {
      const appendData = [
        { id: 4, name: "Editor", col1: "col1", col2: "col2" },
        { id: 5, name: "Grid", col1: "col1", col2: "col2" },
        { id: 6, name: "Chart", col1: "col1", col2: "col2" },
      ];
      setTimeout(() => resolve(appendData), 5000);
    } catch (error) {
      reject(error);
    }
  });
};

const dummyDelete = (deleteIds = []) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("삭제 호출", deleteIds.join(","));
      setTimeout(() => resolve({}), 3000);
    } catch (error) {
      reject(error);
    }
  });
};
const dummyUpdate = (updateData = []) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("수정 호출", updateData);
      setTimeout(() => resolve({}), 3000);
    } catch (error) {
      reject(error);
    }
  });
};
const dummyPatch = (updateData = []) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("일부 수정", updateData);
      setTimeout(() => resolve({}), 3000);
    } catch (error) {
      reject(error);
    }
  });
};

const Button = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick(): void;
}) => {
  return (
    <>
      <button
        onClick={onClick}
        style={{ backgroundColor: "blue", color: "white" }}
      >
        {children}
      </button>
    </>
  );
};

const TestComponent = () => {
  const [data, setData] = useState(initData);
  const [selectData, setSelectData]: any = useState([]);
  const [timer, setTimer] = useState(5);

  const ref: any = useRef(null);

  const onClick = () => {
    console.log("api 전송 시나리오", data);
  };

  const onEditingFinish = (e: any) => {
    const tempData: any = data;
    tempData[e.rowKey][e.columnName] = e.value;

    dummyPatch({
      ...tempData[e.rowKey],
      idx: tempData[e.rowKey].id,
    })
      .then(() => {
        console.log("update", selectData);
      })
      .catch(console.error);

    setData(tempData);
  };
  const onCheck = (e: any) => {
    setSelectData(e.instance.getCheckedRows());
  };
  const onCheckAll = (e: any) => {
    setSelectData(e.instance.getCheckedRows());
  };
  const onUnCheck = (e: any) => {
    setSelectData(e.instance.getCheckedRows());
  };
  const onUnCheckAll = (e: any) => {
    setSelectData(e.instance.getCheckedRows());
  };
  const onGridUpdated = (e: any) => {
    console.log("e", e);

    setSelectData(e.instance.getCheckedRows());
  };

  const deleteScenario = () => {
    dummyDelete(selectData.map((item: any) => item.id))
      .then(() => {
        console.log("delete", selectData);
      })
      .catch(console.error);
  };

  const updateScenario = () => {
    dummyUpdate(
      selectData.map((item: any) => ({ id: item.id, col1: item.col1 }))
    )
      .then(() => {
        console.log("update", selectData);
      })
      .catch(console.error);
  };

  useEffect(() => {
    dummyFetch()
      .then((response: any) => {
        setData((data) => [...data, ...response]);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (timer > 0) setTimer(timer - 1);
    }, 1000);
  }, [timer]);

  console.log(selectData);

  return (
    <>
      <div>{timer} 초 뒤 데이터 추가 </div>
      <Grid
        ref={ref}
        data={data}
        columns={columns}
        rowHeight={25}
        bodyHeight={300}
        heightResizable={true}
        rowHeaders={["checkbox"]}
        onEditingFinish={onEditingFinish}
        onCheck={onCheck}
        onCheckAll={onCheckAll}
        onUncheck={onUnCheck}
        onUncheckAll={onUnCheckAll}
        onGridUpdated={onGridUpdated}
        contentEditable={true}
        width={500}
      />

      <div>표 수정하면 하나 즉각 수정 시나리오</div>
      <div>
        <Button onClick={onClick}>save</Button>
      </div>
      <div>저장 누르고 콘솔 확인</div>
      <div>
        <Button onClick={deleteScenario}>선택 삭제 시나리오</Button>
      </div>

      <div>
        <Button onClick={updateScenario}>일부 업데이트 시나리오</Button>
      </div>
    </>
  );
};

export default TestComponent;
