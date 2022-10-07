
import React from 'react';
import classNames from 'classnames';
import { ConfigContext } from 'antd/es/config-provider';


export interface CommentProps {
    prefixCls?: string;
    actions?: Array<React.ReactNode>;
    author?: React.ReactNode;
    avatar?: React.ReactNode;
    content?: React.ReactNode;
    className?: string;
    datetime?: React.ReactNode;
}

export const Comment: React.FC<CommentProps> = ({
    prefixCls: customizePrefixCls,
    actions,
    author,
    avatar,
    content,
    datetime,
    className,
    ...otherProps
  }) => {
    const {getPrefixCls, direction} = React.useContext(ConfigContext);
    const prefixCls = getPrefixCls('comment', customizePrefixCls);

    const avatarDom = avatar ? (
        <div className={`${prefixCls}-avatar`}>
           {typeof avatar === 'string' ? <img src={avatar} alt="comment-avatar" /> : avatar}
        </div>
    ) : null;
    const actionDom = actions && actions.length ?  (
        <ul className={`${prefixCls}-actions`}>
        {
                actions.map((action, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <li key={`action-${index}`}>{action}</li>
                ))
            }
        </ul>
    ) : null;

    const authorContent = (author || datetime) && (
        <div className={`${prefixCls}-content-author`}>
            {author && <span className={`${prefixCls}-content-author-name`}>{author}</span>}
            {datetime && <span className={`${prefixCls}-content-author-time`}>{datetime}</span>}
        </div>
    )

    const contentDom = (
        <div className={`${prefixCls}-content`}>
          {authorContent}
          <div className={`${prefixCls}-content-detail`}>{content}</div>
          {actionDom}
        </div>
    );
    const cls = classNames(
        prefixCls,
        {
          [`${prefixCls}-rtl`]: direction === 'rtl',
        },
        className,
      );
	return (
        <div {...otherProps} className={cls}>
            <div className={`${prefixCls}-inner`}>
                {avatarDom}
                {contentDom}
            </div>
        </div>
    )
}