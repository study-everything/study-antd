import CloseOutlined from '@ant-design/icons/CloseOutlined';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import RotateLeftOutlined from '@ant-design/icons/RotateLeftOutlined';
import RotateRightOutlined from '@ant-design/icons/RotateRightOutlined';
import ZoomInOutlined from '@ant-design/icons/ZoomInOutlined';
import ZoomOutOutlined from '@ant-design/icons/ZoomOutOutlined';
import RcImage from 'rc-image';
import type { GroupConsumerProps } from 'rc-image/lib/PreviewGroup';
import * as React from 'react';

// 图标
export const icons = {
  rotateLeft: <RotateLeftOutlined />,
  rotateRight: <RotateRightOutlined />,
  zoomIn: <ZoomInOutlined />,
  zoomOut: <ZoomOutOutlined />,
  close: <CloseOutlined />,
  left: <LeftOutlined />,
  right: <RightOutlined />,
};

const InternalPreviewGroup: React.FC<GroupConsumerProps> = ({
  preview,
  previewPrefixCls,
  ...props
}) => 
  // 一张图片预览的时候 右上角子定义图标未展示出来，在rc-image项目中 一样没展示出来。待修复
  // 可能是版本问题 最先版本 rc-image 运行抛错找不到 chidlren属性。当前使用5.6.0
   (
    <RcImage.PreviewGroup
      icons={icons}
      preview={preview}
      previewPrefixCls={previewPrefixCls}
      {...props}
    />
  )
;

export default InternalPreviewGroup;
