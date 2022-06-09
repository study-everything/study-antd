import OriginTypography from './Typography';
import Title from './Title'
import Text from './Text'
import Link from './Link'

export type TypographyProps = typeof OriginTypography & {
  Text: typeof Text;
  Link: typeof Link;
  Title: typeof Title;
  // Paragraph: typeof Paragraph;
};
const Typography = OriginTypography as TypographyProps;
Typography.Title = Title
Typography.Text = Text
Typography.Link = Link

export default Typography;
