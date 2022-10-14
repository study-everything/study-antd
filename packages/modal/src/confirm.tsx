import * as React from 'react';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';
import { render as reactRender, unmount as reactUnmount } from 'rc-util/lib/React/render';
import { globalConfig } from 'antd/lib/config-provider';
import ConfirmDialog from './ConfirmDialog';

import destroyFns from './destroyFns';
import { getConfirmLocale } from './locale';
import type { ModalFuncProps } from './Modal';

let defaultRootPrefixCls = '';

function getRootPrefixCls() {
  return defaultRootPrefixCls;
}

type ConfigUpdate = ModalFuncProps | ((prevConfig: ModalFuncProps) => ModalFuncProps);

export type ModalFunc = (props: ModalFuncProps) => {
  destroy: () => void;
  update: (configUpdate: ConfigUpdate) => void;
}

export type ModalStaticFunctions = Record<NonNullable<ModalFuncProps['type']>, ModalFunc>

export default function confirm(config: ModalFuncProps) {
  const cuContain = document.createDocumentFragment();
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  let currentConfig = { ...config, close, open: true };

  // 摧毁弹窗方法
  function destroy(...args: any[]) {
    const triggerCancel = args.some(param => param.triggerCancel);
    if (config.onCancel && triggerCancel) {
      config.onCancel(() => {}, ...args.slice(1))
    }
    for (let i = 0; i < destroyFns.length; i++) {
      const fn = destroyFns[i];
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      if (fn === close) {
        destroyFns.splice(i, 1);
        break
      }
    }
    reactUnmount(cuContain);
  }

  function render({ okText, cancelText, prefixCls: customizePrefixCls, ...props }: any) {
    // 需要将render处理为异步,否则可能会阻塞事件
    setTimeout(() => {
      const runtimeLocale = getConfirmLocale();
      const { getPrefixCls, getIconPrefixCls } = globalConfig();
      const rootPrefixCls = getPrefixCls(undefined, getRootPrefixCls());
      const prefixCls = customizePrefixCls || `${rootPrefixCls}-modal`;
      const iconPrefixCls = getIconPrefixCls();

      reactRender(
        <ConfirmDialog
          {...props}
          prefixCls={prefixCls}
          rootPrefixCls={rootPrefixCls}
          iconPrefixCls={iconPrefixCls}
          okText={okText || (props.okCancel ? runtimeLocale.okText : runtimeLocale.justOkText)}
          cancelText={cancelText || runtimeLocale.cancelText}
        />,
        cuContain,
      )
    })
  }

  function close(...args: any[]) {
    currentConfig = {
      ...currentConfig,
      open: false,
      afterClose: () => {
        if (typeof config.afterClose === 'function') {
          config.afterClose();
        }

        destroy.apply(this, args);
      },
    };
    if (currentConfig.visible) {
      Reflect.deleteProperty(currentConfig, 'visible');
    }

    render(currentConfig);
  }

  function update(configUpdate: ConfigUpdate) {
    if (typeof configUpdate === 'function') {
      currentConfig = configUpdate(currentConfig);
    } else {
      currentConfig = {
        ...currentConfig,
        ...configUpdate,
      };
    }
    render(currentConfig);
  }
  render(currentConfig);
  destroyFns.push(close);
  return {
    destroy: close,
    update,
  };
}

export function withWarn(props: ModalFuncProps): ModalFuncProps {
  return {
    icon: <ExclamationCircleOutlined />,
    okCancel: false,
    ...props,
    type: 'warning',
  };
}

export function withInfo(props: ModalFuncProps): ModalFuncProps {
  return {
    icon: <InfoCircleOutlined />,
    okCancel: false,
    ...props,
    type: 'info',
  };
}

export function withSuccess(props: ModalFuncProps): ModalFuncProps {
  return {
    icon: <CheckCircleOutlined />,
    okCancel: false,
    ...props,
    type: 'success',
  };
}

export function withError(props: ModalFuncProps): ModalFuncProps {
  return {
    icon: <CloseCircleOutlined />,
    okCancel: false,
    ...props,
    type: 'error',
  };
}

export function withConfirm(props: ModalFuncProps): ModalFuncProps {
  return {
    icon: <ExclamationCircleOutlined />,
    okCancel: true,
    ...props,
    type: 'confirm',
  };
}

export function modalGlobalConfig({ rootPrefixCls }: { rootPrefixCls: string }) {
  defaultRootPrefixCls = rootPrefixCls;
}
