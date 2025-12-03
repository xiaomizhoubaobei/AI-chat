import type { SVGProps } from "react";
import { Smile, Frown, Meh } from "lucide-react";

export const Icons = {
  positive: (props: SVGProps<SVGSVGElement>) => <Smile {...props} />,
  negative: (props: SVGProps<SVGSVGElement>) => <Frown {...props} />,
  neutral: (props: SVGProps<SVGSVGElement>) => <Meh {...props} />,
};
