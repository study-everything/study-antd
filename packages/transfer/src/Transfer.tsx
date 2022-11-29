import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Button, Checkbox, Space } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CheckboxValueType } from 'antd/es/checkbox/Group';

export interface TransferProps {
  dataSource: any[],
  onChange?: (nextTargetKeys: string[], direction: any, moveKeys: string[]) => void,
  onSelectChange?: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => void,
  onScroll?: (direction: any, e: React.SyntheticEvent<HTMLUListElement>) => void,
  titles: [string, string]
  targetKeys: any[],
  selectedKeys: any[],
  render: (item: any) => any,
  prefixCls?: string
}

const defaultPrefix = 'antd-transform';
const List = ({
                prefixCls = defaultPrefix,
                options,
                defaultSelects = [],
                onChange,
                title
              }: { title: string, prefixCls?: string, onChange?: any, options: any[], defaultSelects?: any[] }) => {
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultSelects);
  const [indeterminate, setIndeterminate] = useState(defaultSelects.length > 0 && defaultSelects.length < options.length);
  const [checkAll, setCheckAll] = useState(false);

  const onChangeI = (list: any[]) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < options.length);
    setCheckAll(list.length === options.length);
    onChange?.(list);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? options.map(i => i.key) : []);
    onChange?.(e.target.checked ? options.map(i => i.key) : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };
  return <section>
    <section className={`${prefixCls}-li`}>
      <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
        {title}
      </Checkbox>
    </section>
    <div className={`${prefixCls}-line`}></div>
    <Checkbox.Group onChange={onChangeI} value={checkedList}>
      <ul>
        {
          options.map(i => {
            return <li key={i.key}>
              <Checkbox value={i.key}>{i.title}</Checkbox>
            </li>;
          })
        }
      </ul>
    </Checkbox.Group>
  </section>;
};

export const Transfer: React.FC<TransferProps> = (props) => {
  const {
    dataSource = [],
    targetKeys = [],
    prefixCls = defaultPrefix,
    titles
  } = props;
  const [leftData, setLeftData] = useState([]);
  const [rightData, setRightData] = useState([]);
  const [sourceSelectedKeys, setSourceSelectedKeys] = useState([]);
  const [targetSelectedKeys, setTargetSelectedKeys] = useState([]);
  const separateDataSource = () => {
    const leftDataSource = [];
    const rightDataSource = new Array(targetKeys.length);
    dataSource.forEach(record => {
      const indexOfKey = targetKeys.indexOf(record.key);
      if (indexOfKey !== -1) {
        rightDataSource[indexOfKey] = record;
      } else {
        leftDataSource.push(record);
      }
    });
    return {
      leftDataSource,
      rightDataSource,
    };
  };
  const setStateKeys = (direction: string,
                        keys: string[] | ((prevKeys: string[]) => string[]),)=>{
    if (direction === 'left') {
      setSourceSelectedKeys(typeof keys === 'function' ? keys(sourceSelectedKeys || []) : keys,)

    } else {
      setTargetSelectedKeys(typeof keys === 'function' ? keys(targetSelectedKeys || []) : keys,)
    }
  }
  const moveTo = (direction: string) => {
    const { targetKeys = [], dataSource = [], onChange } = props;
    const moveKeys = direction === 'right' ? sourceSelectedKeys : targetSelectedKeys;
    const newMoveKeys = moveKeys.filter(
      (key: string) => !dataSource.some(data => !!(key === data.key && data.disabled)),
    );
    const newTargetKeys =
      direction === 'right'
        ? newMoveKeys.concat(targetKeys)
        : targetKeys.filter(targetKey => newMoveKeys.indexOf(targetKey) === -1);

    const oppositeDirection = direction === 'right' ? 'left' : 'right';
    setStateKeys(oppositeDirection,[])
    onChange?.(newTargetKeys, direction, newMoveKeys);
  };
  useEffect(() => {
    const { leftDataSource, rightDataSource } = separateDataSource();
    setLeftData(leftDataSource);
    setRightData(rightDataSource);
  }, [targetKeys]);


  return <section className={classNames(prefixCls)}>
    <section className={classNames(`${prefixCls}-source`)}>
      <List title={titles?.[0] || 'Source'} options={leftData} onChange={(l) => {
        setSourceSelectedKeys(l);
      }} />
    </section>
    <section className={classNames(`${prefixCls}-middle`)}>
      <Space direction='vertical'>
        <Button disabled={sourceSelectedKeys.length === 0} type='primary' icon={<RightOutlined />} onClick={()=>moveTo('right')} />
        <Button disabled={targetSelectedKeys.length === 0} type='primary' icon={<LeftOutlined />} onClick={()=>moveTo('left')} />
      </Space>
    </section>
    <section className={classNames(`${prefixCls}-target`)}>
      <List title={titles?.[1] || 'Target'} options={rightData} onChange={(l) => {
       setTargetSelectedKeys(l);
      }} />
    </section>
  </section>;
};
