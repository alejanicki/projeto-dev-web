import { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";

const input = tv({
  base: "flex w-full h-full font-sm bg-darkGrey-500 rounded-md focus:outline-none px-2 py-0.5",
  variants: {
    color: {
      primary:
        "bg-transparent text-primary-500 border-b-darkGrey-500 border-b-2 placeholder:text-primary-500",
      secondary: "bg-none-500 text-primary-500 font-audiowide",
      third: "bg-transparent rounded-3xl",
      disabledOne: "bg-lightGrey-500",
      disabledTwo:
        "bg-white text-lightGrey-500 rounded-3xl border border-lightGrey-500",
      success: "bg-emerald-500 text-white",
      loading: "bg-pink-600 text-white",
    },
  },
});

type InputProps = ComponentProps<"input"> & VariantProps<typeof input>;

export default function Input({ color, ...props }: InputProps) {
  return <input className={input({ color })} {...props} />;
}
