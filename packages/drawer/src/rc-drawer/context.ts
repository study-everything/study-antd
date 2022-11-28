import * as React from "react"

export interface RcDrawerContextProps {
  pushDistance?: number | string;
  push: VoidFunction;
  pull: VoidFunction;
}
const RcDrawerContext = React.createContext<RcDrawerContextProps>(null)

export default RcDrawerContext;