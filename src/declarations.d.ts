declare module "*.module.scss" {
  const content: Record<string, string>;
  export default content;
}
declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}
declare module "*.scss";

declare module "*.svg?react" {
  import React from "react";
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
