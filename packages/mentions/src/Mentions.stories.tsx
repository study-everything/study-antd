import React, { useCallback, useRef, useState } from 'react';
import { storiesOf } from '@storybook/react';
import debounce from 'lodash/debounce';
import Mentions, { Option } from './Mentions';
import './style';

storiesOf('Mentions', module)
  .add('basic', () => (
    <>
      <h4>基本用法，常用于聊天或评论等功能</h4>
      <Mentions
        placeholder="input @ to mention people"
        style={{ width: '100%' }}
        defaultValue="@zhufeng123"
      >
        <Option value="zhufeng123">zhufeng123</Option>
        <Option value="hello123">hello123</Option>
        <Option value="jack123">jack123</Option>
      </Mentions>
    </>
  ))
  .add('async loading', () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const keyRef = useRef<string>('');

    const getUsers = (key: string) => {
      if (!key) {
        setUsers([]);
        return;
      }

      fetch(`https://api.github.com/search/users?q=${key}`)
        .then(res => res.json())
        .then(({ items = [] }) => {
          if (keyRef.current !== key) return;

          setLoading(false);
          setUsers(items.slice(0, 10));
        });
    };

    const debounceGetUsers = useCallback(debounce(getUsers, 500), []);

    const onSearch = (keyWords: string) => {
      keyRef.current = keyWords;
      setLoading(!!keyWords);
      setUsers([]);
      debounceGetUsers(keyWords);
    };
    return (
      <>
        <h4>异步加载数据</h4>
        <Mentions
          placeholder="input @ and letters, numbers search"
          style={{ width: '100%' }}
          loading={loading}
          onSearch={onSearch}
        >
          {
            users.map(({login, avatar_url: avatar}) => (
              <Option key={login} value={login} className="antd-demo-dynamic-option">
                <img src={avatar} alt={login} width="20" height="20"/>
                <span style={{paddingLeft: '8px'}}>{login}</span>
              </Option>
            ))
          }
        </Mentions>
      </>
    );
  });
