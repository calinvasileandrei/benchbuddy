import React, {FC} from 'react';
import {View} from 'react-native';
import {MyLoading} from 'src/shared/baseComponents/myLoading/myLoading.component';
import {useAppSelector} from 'src/store/store';
import {myLoadingProviderStatus} from 'src/store/myLoading/myLoading.slice';

export interface IsLoadingProviderProps {
    children: React.ReactNode;
}

export const IsLoadingProvider: FC<IsLoadingProviderProps> = props => {
    const isLoading = useAppSelector(myLoadingProviderStatus);

    return (
        <>
            {isLoading && (
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 10000,
                    }}>
                    <MyLoading style={{backgroundColor: 'rgba(0,0,0,0.7)'}} />
                </View>
            )}
            {props.children}
        </>
    );
};
