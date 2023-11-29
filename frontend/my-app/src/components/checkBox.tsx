import { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";
import { FaCheck } from "react-icons/fa";

const checkbox = tv({
  base: "flex w-5 h-5 items-center border-black/20 border-2 rounded-md ",
  variants: {
    color: {
      checked: "flex bg-primary-500 border-1",
      error: "flex border-red-500/60 border-2",
      primary: ""
    },
  },
});

type DivProps = ComponentProps<"div"> & VariantProps<typeof checkbox> & {
  checked?: boolean;
};

export default function CheckBox({ checked = false, color, ...props }: DivProps) {
  return (
    <div className={checkbox({ color })} {...props}>
      {checked ? <h1 className="felx m-auto text-darkGrey-500"><FaCheck /></h1> : " "}
    </div>
  );
}
