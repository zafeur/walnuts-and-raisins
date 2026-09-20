import { ArrowUpRight } from "lucide-react";
export function ActionArrow() {
  return (
    <span aria-hidden="true" className="direction-arrow">
      <ArrowUpRight size={18} strokeWidth={1.5} />
    </span>
  );
}
