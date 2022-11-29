import React from 'react';
import { storiesOf } from '@storybook/react';
import { Anchor } from './Anchor';
import './style';
import './Anchor.stories.less'

const { Link } = Anchor;

storiesOf('Anchor', module).add('Demo', () => (
  <>
    <Anchor>
      <Link href="#first" title="first" />
      <Link href="#second" title="second" />
      <Link href="#block" title="block">
        <Link href="#third" title="third" />
      </Link>
    </Anchor>
    <div id="first">first</div>
    <div id="second">second</div>
    <div id="third">third</div>
  </>
));
