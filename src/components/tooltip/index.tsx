import { createContext, ReactNode, useContext, useState } from "react";
import "./style.scss";

type TooltipDirection = "top" | "right" | "bottom" | "left";

const TooltipContext = createContext(false);

export default function Tooltip({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(false);

  const showTip = () => {
    setActive(true);
  };

  const hideTip = () => {
    setActive(false);
  };

  return (
    <TooltipContext.Provider value={active}>
      <div
        className="Tooltip-Wrapper"
        // When to show the tooltip
        onMouseEnter={showTip}
        onMouseLeave={hideTip}
      >
        {children}
      </div>
    </TooltipContext.Provider>
  );
}

export function TooltipTrigger({ children }: { children: ReactNode }) {
  return children;
}

export function TooltipContent({
  children,
  direction,
}: {
  children: ReactNode;
  direction?: TooltipDirection;
}) {
  const active = useContext(TooltipContext);
  return (
    <>
      {active && (
        <div className={`Tooltip-Tip ${direction || "top"}`}>
          {/* Content */}
          {children}
        </div>
      )}
    </>
  );
}

Tooltip.Trigger = TooltipTrigger;
Tooltip.Content = TooltipContent;
