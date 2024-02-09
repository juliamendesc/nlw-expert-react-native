import { View, Text, ActivityIndicator } from 'react-native';
import colors from 'tailwindcss/colors';

export function Loading() {
	return (
		<View className='flex-1 justify-center items-center bg-slate-900'>
			<ActivityIndicator size='large' color={colors.white} />
		</View>
	);
}
