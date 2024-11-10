import { BlendFunction } from "postprocessing";
import { forwardRef } from "react";
import DrunkEffect from "./effects/DrunkEffect";

export type DrunkProps = {
  frequency?: number;
  amplitude?: number;
  blendFunction?: BlendFunction;
};

export default forwardRef<DrunkEffect, DrunkProps>(function Drunk(props, ref) {
  const effect = new DrunkEffect(props);

  return <primitive ref={ref} object={effect} />;
});
