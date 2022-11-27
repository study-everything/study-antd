import React from 'react';
import { storiesOf } from '@storybook/react';
import { Image } from './Image';
import './style';

storiesOf('Image', module).add('basic', () => (
  <div>
    <Image
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      width={200}
      style={{
        marginRight: 24,
      }}
      onClick={() => {
        console.log('click');
      }}
      preview={{
        onVisibleChange: visible => {
          console.log('visible', visible);
        },
      }}
    />

    <Image
      src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*P0S-QIRUbsUAAAAAAAAAAABkARQnAQ"
      width={200}
      style={{
        marginRight: 24,
      }}
      preview={{ mask: 'Click to Preview' }}
    />
    <Image
      src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*ngiJQaLQELEAAAAAAAAAAABkARQnAQ"
      width={200}
      style={{
        marginRight: 24,
      }}
    />
    <Image
      src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*NZuwQp_vcIQAAAAAAAAAAABkARQnAQ"
      width={200}
    />

    <Image
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      width={200}
      height={100}
    />
  </div>
));

storiesOf('Image', module).add('controlled', () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <div>
      <div>
        <button
          type="button"
          onClick={() => {
            setVisible(true);
          }}
        >
          Switch Preview
        </button>
      </div>
      <Image
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        width={200}
        preview={{
          visible,
          onVisibleChange: value => {
            setVisible(value);
          },
        }}
      />
    </div>
  );
});

storiesOf('Image', module).add('controlledWithGroup', () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <div>
      <div>
        <button
          type="button"
          onClick={() => {
            setVisible(true);
          }}
        >
          Switch Preview
        </button>
      </div>
      <Image.PreviewGroup
        preview={{
          visible,
          onVisibleChange: value => {
            setVisible(value);
          },
          current: 1,
        }}
      >
        <Image
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          width={200}
        />
        <Image wrapperStyle={{ marginRight: 24, width: 200 }} src={require('./images/1.jpeg')} />
        <Image wrapperStyle={{ marginRight: 24, width: 200 }} src={require('./images/2.jpeg')} />
      </Image.PreviewGroup>
    </div>
  );
});

storiesOf('Image', module).add('fallback', () => (
  <Image
    preview={{ mask: 'preview!' }}
    src="error1"
    fallback="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    width={200}
  />
));

storiesOf('Image', module).add('placeholder', () => {
  const [random, setRandom] = React.useState(Date.now());
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setRandom(Date.now());
        }}
      >
        Reload
      </button>
      <h1>Default placeholder</h1>
      <div>
        <Image
          // eslint-disable-next-line global-require
          src={`${require('./images/placeholder.png')}?random=${random}`}
          width={400}
          placeholder
        />
      </div>

      <br />
      <h1>Custom placeholder</h1>
      <Image
        // eslint-disable-next-line global-require
        src={`${require('./images/placeholder.png')}?random=${random + 1}`}
        width={400}
        placeholder={
          <Image
            width="100%"
            height="100%"
            preview={false}
            src="data:image/jpeg;base64,/9j/2wCEACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//gBKy0tPDU8dkFBdviljKX4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+P/AABEIADAAPAMBIgACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AJLmGRoTJM2X7KOgqht4rZu2CW5znnjise4YKnHBOMVJQxlPYUyplD7CSrEY64qNVbYzBunNADRR0xnvzTsu0edxJ7CmZ3MOuRxzTENI4/Gkpx7UmKAL89w8pyzH6dqruQcFhnFaC2OIWaUncASFFZ0iho9oI3den6Uhk4unaCRegCjAAqBQpG3HQEnmhOI5B32nNEXMh/3D/I0CGruO1gpGeRikZi3XHXr3qe2cFFVjjA/OmToEbrgE5waLgQn7wozSk5AFMpgdHcgtbSheu04rB6DFbDtLPGxH7uLHU9W/wrIcYyKAELkZGOq4NOiP73j+4R+hqKhXKNuGOmOaAHR48sndggce9IJC2S43HGAT2pvQCkzQA5eCxY5yOBUdOJpKAP/Z"
          />
        }
      />
    </div>
  );
});

storiesOf('Image', module).add('previewgroup', () => (
  <div>
    <Image.PreviewGroup
      preview={{
        countRender: (current, total) => `第${current}张 / 总共${total}张`,
      }}
    >
      <Image wrapperStyle={{ marginRight: 24, width: 200 }} src={require('./images/1.jpeg')} />
      <Image
        wrapperStyle={{ marginRight: 24, width: 200 }}
        preview={false}
        src={require('./images/disabled.jpeg')}
      />
      <Image wrapperStyle={{ marginRight: 24, width: 200 }} src={require('./images/2.jpeg')} />
      <Image wrapperStyle={{ marginRight: 24, width: 200 }} src={require('./images/3.jpeg')} />
      <Image wrapperStyle={{ marginRight: 24, width: 200 }} src="error" alt="error" />
      <Image wrapperStyle={{ marginRight: 24, width: 200 }} src={require('./images/1.jpeg')} />
    </Image.PreviewGroup>
  </div>
));

storiesOf('Image', module).add('thumbnail', () => (
  <div>
    <Image
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/auto-orient,1/resize,p_10/quality,q_10"
      preview={{
        src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }}
      width={200}
    />

    <br />
    <h1>PreviewGroup</h1>
    <Image.PreviewGroup>
      <Image
        key={1}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/auto-orient,1/resize,p_10/quality,q_10"
        preview={{
          src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }}
        width={200}
      />
      <Image
        key={2}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/auto-orient,1/resize,p_10/quality,q_10/contrast,-100"
        preview={{
          src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/auto-orient,1/contrast,-100',
        }}
        width={200}
      />
    </Image.PreviewGroup>
  </div>
));
