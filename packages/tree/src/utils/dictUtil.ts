import type * as _interface from '../rc-tree/interface';

enum Record {
  None,
  Start,
  End,
}

function traverseNodesKey(
  treeData: _interface.DataNode[],
  callback: (key: _interface.Key | number | null, node: _interface.DataNode) => boolean,
) {
  function processNode(dataNode: _interface.DataNode) {
    const { key, children } = dataNode;
    if (callback(key, dataNode) !== false) {
      traverseNodesKey(children || [], callback);
    }
  }

  treeData.forEach(processNode);
}

/** 计算选中范围，只考虑expanded情况以优化性能 */
export function calcRangeKeys({
  treeData,
  expandedKeys,
  startKey,
  endKey,
}: {
  treeData: _interface.DataNode[];
  expandedKeys: _interface.Key[];
  startKey?: _interface.Key;
  endKey?: _interface.Key;
}): _interface.Key[] {
  const keys: _interface.Key[] = [];
  let record: Record = Record.None;

  if (startKey && startKey === endKey) {
    return [startKey];
  }
  if (!startKey || !endKey) {
    return [];
  }

  function matchKey(key: _interface.Key) {
    return key === startKey || key === endKey;
  }

  traverseNodesKey(treeData, (key: _interface.Key) => {
    if (record === Record.End) {
      return false;
    }

    if (matchKey(key)) {
      // Match test
      keys.push(key);

      if (record === Record.None) {
        record = Record.Start;
      } else if (record === Record.Start) {
        record = Record.End;
        return false;
      }
    } else if (record === Record.Start) {
      // Append selection
      keys.push(key);
    }

    if (expandedKeys.indexOf(key) === -1) {
      return false;
    }

    return true;
  });

  return keys;
}

export function convertDirectoryKeysToNodes(treeData: _interface.DataNode[], keys: _interface.Key[]) {
  const restKeys: _interface.Key[] = [...keys];
  const nodes: _interface.DataNode[] = [];
  traverseNodesKey(treeData, (key: _interface.Key, node: _interface.DataNode) => {
    const index = restKeys.indexOf(key);
    if (index !== -1) {
      nodes.push(node);
      restKeys.splice(index, 1);
    }

    return !!restKeys.length;
  });
  return nodes;
}
