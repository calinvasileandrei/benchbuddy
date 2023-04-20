import React, {FC} from 'react';
import {View} from 'react-native';
import {MyHeader} from 'src/shared/baseComponents/myHeader/myHeader.component';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {MyLoading} from 'src/shared/baseComponents/myLoading/myLoading.component';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {analysisStyle} from 'src/screens/app/analysis/analysis.style';

export interface AnalysisScreenProps {}

export const AnalysisScreen: FC<AnalysisScreenProps> = props => {
    const style = useThemeStyle(analysisStyle);
    const devices = useCameraDevices('wide-angle-camera');
    const device = devices.back;

    if (device == null) {
        return <MyLoading />;
    }

    return (
        <View>
            <MyHeader title={'Analisys'} />
            <Camera
                style={style.absoluteFill}
                device={device}
                isActive={true}
            />
        </View>
    );
};
