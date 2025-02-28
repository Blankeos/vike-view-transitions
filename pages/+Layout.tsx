import { PropsWithChildren } from "react";

import "./app.css";

export default function Layout(props: PropsWithChildren) {
  return <>{props.children}</>;
}
