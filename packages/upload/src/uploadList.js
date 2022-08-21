import React from 'react';

const previewFile = (file, callback) => {
  const reader = new FileReader();
  reader.onloadend = () => callback(reader.result);
  reader.readAsDataURL(file);
};

export default class UploadList extends React.Component {
  static defaultProps = {
    listType: 'text',  // or picture
    items: [],
    progressAttr: {
      strokeWidth: 3,
      showInfo: false,
    },
  };

  handleClose = (file) => {
    this.props.onRemove(file);
  }

  handlePreview = (file, e) => {
    if (this.props.onPreview) {
      e.preventDefault();
      return this.props.onPreview(file);
    }
  }

  componentDidUpdate() {
    if (this.props.listType !== 'picture' && this.props.listType !== 'picture-card') {
      return;
    }
    this.props.items.forEach(file => {
      if (typeof document === 'undefined' ||
        typeof window === 'undefined' ||
        !window.FileReader || !window.File ||
        !(file.originFileObj instanceof File) ||
        file.thumbUrl !== undefined) {
        return;
      }
      file.thumbUrl = '';
      previewFile(file.originFileObj, (previewDataUrl) => {
        file.thumbUrl = previewDataUrl;
        this.forceUpdate();
      });
    });
  }

  render() {
    let list = this.props.items.map(file => {
      let progress;
      let icon = <text type="paper-clip"></text>;

      if (this.props.listType === 'picture' || this.props.listType === 'picture-card') {
        if (file.status === 'uploading' || (!file.thumbUrl && !file.url)) {
          if (this.props.listType === 'picture-card') {
            icon = <div >文件上传中</div>;
          } else {
            icon = <text type="picture"></text>;
          }
        } else {
          icon = (
            <a
              onClick={e => this.handlePreview(file, e)}
              href={file.url}
              target="_blank"
            >
              <img src={file.thumbUrl || file.url} alt={file.name} />
            </a>
          );
        }
      }

      if (file.status === 'uploading') {
        progress = (
          <div>
            <text type="line" {...this.props.progressAttr} percent={file.percent}></text>
          </div>
        );
      }
      return (
        <div key={file.uid}>
          <div>
            {icon}
            {
              file.url
                ? (
                  <a
                    href={file.url}
                    target="_blank"
                    onClick={e => this.handlePreview(file, e)}
                  >
                    {file.name}
                  </a>
                ) : (
                  <span
                    onClick={e => this.handlePreview(file, e)}
                  >
                    {file.name}
                  </span>
                )
            }
            {
              this.props.listType === 'picture-card' && file.status !== 'uploading'
                ? (
                  <span>
                    <a
                      href={file.url}
                      target="_blank"
                      style={{ pointerEvents: file.url ? '' : 'none' }}
                      onClick={e => this.handlePreview(file, e)}
                    >
                      <span type="eye-o"></span>
                    </a>
                    <span type="delete" onClick={() => this.handleClose(file)}></span>
                  </span>
                ) : <span type="cross" onClick={() => this.handleClose(file)}></span>
            }
          </div>
          {progress}
        </div>
      );
    });
    return (
      <div >
          {list}
      </div>
    );
  }
}