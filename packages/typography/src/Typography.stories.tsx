import type {ComponentMeta, ComponentStory} from '@storybook/react';
import {Space, Divider, Radio, Switch, Slider} from "antd";
import React, {useState} from 'react';
import {CheckOutlined, HighlightOutlined, SmileFilled, SmileOutlined} from '@ant-design/icons';
import Title from './Title';
import Paragraph from './Paragraph';
import Typography from './index';
import Text from "./Text";
import Link from "./Link";
import './style'

export default {
  title: 'Typography',
  component: Title,
  argTypes: {}
} as ComponentMeta<typeof Title>

const Template = (args) => (<>
  <Title {...args}>h{args.level}. Ant Design</Title>
  <Title level={2}>h2. Ant Design</Title>
  <Title level={3}>h3. Ant Design</Title>
  <Title level={4}>h4. Ant Design</Title>
  <Title level={5}>h5. Ant Design</Title>
</>)
export const TitleDemo: ComponentStory<typeof Title> = Template.bind({});
TitleDemo.storyName = '标题组件'
TitleDemo.decorators = [storyFn => (<>
  <h2>展示不同级别的标题。</h2>{storyFn()}
</>)];
TitleDemo.args = {
  level: 1
}

const TextTemplate = () => (<Space>
  <Text>Ant Design (default)</Text>
  <Text type="secondary">Ant Design (secondary)</Text>
  <Text type="success">Ant Design (success)</Text>
  <Text type="warning">Ant Design (warning)</Text>
  <Text type="danger">Ant Design (danger)</Text>
  <Text disabled>Ant Design (disabled)</Text>
  <Text mark>Ant Design (mark)</Text>
  <Text code>Ant Design (code)</Text>
  <Text keyboard>Ant Design (keyboard)</Text>
  <Text underline>Ant Design (underline)</Text>
  <Text delete>Ant Design (delete)</Text>
  <Text strong>Ant Design (strong)</Text>
  <Text italic>Ant Design (italic)</Text>
  <Link href="https://ant.design" target="_blank">
    Ant Design (Link)
  </Link>
</Space>)
export const TextDemo: ComponentStory<typeof Text> = TextTemplate.bind({});
TextDemo.storyName = '文本与超链接组件'
TextDemo.args = {}


const ParagraphTemplate = () => {
  const [editableStr, setEditableStr] = useState('This is an editable text.');
  const [customIconStr, setCustomIconStr] = useState('Custom Edit icon and replace tooltip text.');
  const [clickTriggerStr, setClickTriggerStr] = useState(
    'Text or icon as trigger - click to start editing.',
  );
  const [chooseTrigger, setChooseTrigger] = useState<('icon' | 'text')[]>(['icon']);
  const [customEnterIconStr, setCustomEnterIconStr] = useState(
    'Editable text with a custom enter icon in edit field.',
  );
  const [noEnterIconStr, setNoEnterIconStr] = useState(
    'Editable text with no enter icon in edit field.',
  );
  const [hideTooltipStr, setHideTooltipStr] = useState('Hide Edit tooltip.');
  const [lengthLimitedStr, setLengthLimitedStr] = useState(
    'This is an editable text with limited length.',
  );

  const radioToState = (input: string): ('icon' | 'text')[] => {
    switch (input) {
      case 'text':
        return ['text'];
      case 'both':
        return ['icon', 'text'];
      case 'icon':
      default:
        return ['icon'];
    }
  };

  const stateToRadio = () => {
    if (chooseTrigger.indexOf('text') !== -1) {
      return chooseTrigger.indexOf('icon') !== -1 ? 'both' : 'text';
    }
    return 'icon';
  };

  return (
    <>
      <Paragraph editable={{onChange: setEditableStr}}>{editableStr}</Paragraph>
      <Paragraph
        editable={{
          icon: <HighlightOutlined/>,
          tooltip: 'click to edit text',
          onChange: setCustomIconStr,
        }}
      >
        {customIconStr}
      </Paragraph>
      Trigger edit with:{' '}
      <Radio.Group
        onChange={e => setChooseTrigger(radioToState(e.target.value))}
        value={stateToRadio()}
      >
        <Radio value="icon">icon</Radio>
        <Radio value="text">text</Radio>
        <Radio value="both">both</Radio>
      </Radio.Group>
      <Paragraph
        editable={{
          tooltip: 'click to edit text',
          onChange: setClickTriggerStr,
          triggerType: chooseTrigger,
        }}
      >
        {clickTriggerStr}
      </Paragraph>
      <Paragraph
        editable={{
          icon: <HighlightOutlined/>,
          tooltip: 'click to edit text',
          onChange: setCustomEnterIconStr,
          enterIcon: <CheckOutlined/>,
        }}
      >
        {customEnterIconStr}
      </Paragraph>
      <Paragraph
        editable={{
          icon: <HighlightOutlined/>,
          tooltip: 'click to edit text',
          onChange: setNoEnterIconStr,
          enterIcon: null,
        }}
      >
        {noEnterIconStr}
      </Paragraph>
      <Paragraph editable={{tooltip: false, onChange: setHideTooltipStr}}>
        {hideTooltipStr}
      </Paragraph>
      <Paragraph
        editable={{
          onChange: setLengthLimitedStr,
          maxLength: 50,
          autoSize: {maxRows: 5, minRows: 3},
        }}
      >
        {lengthLimitedStr}
      </Paragraph>
      <Typography.Title editable level={1} style={{margin: 0}}>
        h1. Ant Design
      </Typography.Title>
      <Typography.Title editable level={2} style={{margin: 0}}>
        h2. Ant Design
      </Typography.Title>
      <Typography.Title editable level={3} style={{margin: 0}}>
        h3. Ant Design
      </Typography.Title>
      <Typography.Title editable level={4} style={{margin: 0}}>
        h4. Ant Design
      </Typography.Title>
      <Typography.Title editable level={5} style={{margin: 0}}>
        h5. Ant Design
      </Typography.Title>
      <Divider/>
      <Paragraph copyable>This is a copyable text.</Paragraph>
      <Paragraph copyable={{text: 'Hello, Ant Design!'}}>Replace copy text.</Paragraph>
      <Paragraph
        copyable={{
          icon: [<SmileOutlined key="copy-icon"/>, <SmileFilled key="copied-icon"/>],
          tooltips: ['click here', 'you clicked!!'],
        }}
      >
        Custom Copy icon and replace tooltips text.
      </Paragraph>
      <Paragraph copyable={{tooltips: false}}>Hide Copy tooltips.</Paragraph>
    </>
  );
}
export const ParagraphDemo: ComponentStory<typeof Paragraph> = ParagraphTemplate.bind({});
ParagraphDemo.storyName = '可交互'
ParagraphDemo.args = {}

const Paragraph2Template = () => {
  const [ellipsis, setEllipsis] = useState(true);

  return (
    <>
      <Switch
        checked={ellipsis}
        onChange={() => {
          setEllipsis(!ellipsis);
        }}
      />

      <Paragraph ellipsis={ellipsis}>
        Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team.
      </Paragraph>

      <Paragraph ellipsis={ellipsis ? {rows: 2, expandable: true, symbol: 'more'} : false}>
        Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team. Ant
        Design, a design language for background applications, is refined by Ant UED Team.
      </Paragraph>

      <Text
        style={ellipsis ? {width: 100} : undefined}
        ellipsis={ellipsis ? {tooltip: 'I am ellipsis now!'} : false}
      >
        Ant Design, a design language for background applications, is refined by Ant UED Team.
      </Text>
    </>
  );
}
export const Paragraph2Demo: ComponentStory<typeof Paragraph> = Paragraph2Template.bind({});
Paragraph2Demo.storyName = '省略号'
Paragraph2Demo.args = {}

const EllipsisMiddleTemplate = () => {
  const EllipsisMiddle:
    // eslint-disable-next-line react/no-unstable-nested-components
    React.FC<{ suffixCount: number; children: string }> = ({
                                                             suffixCount,
                                                             children,
                                                           }) => {
    const start = children.slice(0, children.length - suffixCount).trim();
    const suffix = children.slice(-suffixCount).trim();
    return (
      <Text style={{maxWidth: '100%'}} ellipsis={{suffix}}>
        {start}
      </Text>
    );
  };

  return (<EllipsisMiddle suffixCount={12}>
    In the process of internal desktop applications development, many different design specs and
    implementations would be involved, which might cause designers and developers difficulties and
    duplication and reduce the efficiency of development.
  </EllipsisMiddle>)
}
export const EllipsisMiddleDemo: ComponentStory<typeof Paragraph> = EllipsisMiddleTemplate.bind({});
EllipsisMiddleDemo.storyName = '省略中间'
EllipsisMiddleDemo.args = {}

const SuffixEllipsisTemplate = () => {
  const [rows, setRows] = useState(1);

  const article =
    "To be, or not to be, that is a question: Whether it is nobler in the mind to suffer. The slings and arrows of outrageous fortune Or to take arms against a sea of troubles, And by opposing end them? To die: to sleep; No more; and by a sleep to say we end The heart-ache and the thousand natural shocks That flesh is heir to, 'tis a consummation Devoutly to be wish'd. To die, to sleep To sleep- perchance to dream: ay, there's the rub! For in that sleep of death what dreams may come When we have shuffled off this mortal coil, Must give us pause. There 's the respect That makes calamity of so long life";

  return (
    <>
      <Slider value={rows} min={1} max={10} onChange={setRows}/>
      <Paragraph
        ellipsis={{
          rows,
          expandable: true,
          suffix: '--William Shakespeare',
          onEllipsis: ellipsis => {
            console.log('Ellipsis changed:', ellipsis);
          },
        }}
        title={`${article}--William Shakespeare`}
      >
        {article}
      </Paragraph>
    </>
  );
}
export const SuffixEllipsisDemo: ComponentStory<typeof Paragraph> = SuffixEllipsisTemplate.bind({});
SuffixEllipsisDemo.storyName = '后缀'
SuffixEllipsisDemo.decorators = [f => <>添加后缀的省略。{f()}</>]
SuffixEllipsisDemo.args = {}