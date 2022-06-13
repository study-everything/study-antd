/*
 * @Author: dfh
 * @Date: 2022-06-13 15:21:54
 * @LastEditors: dfh
 * @Modified By: dfh
 * @describe: 
 */
import React from 'react';
import { storiesOf } from '@storybook/react';
import './style'
import Switch from './examples/switch';
import Animate from './examples/animate';
import Basic from './examples/basic';
import Height from './examples/height';

storiesOf('List', module).add('animate', () => (
	<Animate/>
))

storiesOf('List', module).add('basic', () => (
	<Basic/>
))

storiesOf('List', module).add('height', () => (
	<Height/>
))

storiesOf('List', module).add('switch', () => (
	<Switch/>
))