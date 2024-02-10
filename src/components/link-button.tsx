import { Link, LinkProps } from 'expo-router';

type LinkButtonProps = LinkProps<string> & {
	title: string;
};

export function LinkButton({ title, ...rest }: LinkButtonProps) {
	return (
		<Link className='text-slate-300 text-base font-body text-center' {...rest}>
			{title}
		</Link>
	);
}
