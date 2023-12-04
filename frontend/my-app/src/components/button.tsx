import { ComponentProps, ElementType } from 'react';
import { tv, VariantProps } from 'tailwind-variants';
import { CiCircleCheck } from 'react-icons/ci'
import { CgSpinnerTwoAlt } from 'react-icons/cg'



const button = tv({
    base: "flex h-full w-full p-2 items-center justify-center font-medium bg-zinc-500 text-white rounded-full active:opacity-80",
    variants: {
        color: {
            primary: "bg-primary-500 text-white font-audiowide w-full h-full",
            secondary: "bg-none-500 text-primary-500 font-audiowide",
            third: "bg-white text-primary-500 rounded-3xl border border-primary-500",
            fourth: "bg-primary-500 text-white font-audiowide w-full h-full rounded-3xl border border-white/10",
            fifth: "bg-none-500 text-white font-audiowide",
            selected: "bg-primary-500 text-white font-audiowide w-full h-full rounded-xl",
            disabledOne: "bg-lightGrey-500",
            disabledTwo: "bg-white text-lightGrey-500 rounded-3xl border border-lightGrey-500",
            success: "bg-emerald-500 text-white",
            loading: "bg-pink-600 text-white",
        },
    }
});

type BtnProps = ComponentProps<'button'> & VariantProps<typeof button> & {
    success?: boolean;
    loading?: boolean;
    icon?: ElementType | null;
}

export default function Button({
    success = false,
    loading = false,
    icon: Icon,
    color,
    ...props
}: BtnProps) {
    return (
        <button className={button({ color })} {...props}>
            {success && !loading ? <CiCircleCheck className='h-4 w-4' /> :
                !success && loading ? (
                    <>
                        <CgSpinnerTwoAlt className='h-4 w-4 animate-spin transition-all' />
                        <p className='p-2'>Carregando..</p>
                    </>
                ) : Icon && <Icon className='h-4 w-4' />}
            {props.children}
        </button>
    )
}