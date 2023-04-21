import React, {FC, useEffect, useRef, useState} from 'react';
import {
    Camera,
    CameraPermissionRequestResult,
    useCameraDevices,
    useFrameProcessor,
} from 'react-native-vision-camera';
import {MyLoading} from 'src/shared/baseComponents/myLoading/myLoading.component';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {analysisStyle} from 'src/screens/app/analysis/analysis.style';
import {Logger} from 'src/utils/logger';
import {MySafeAreaView} from 'src/shared/baseComponents/mySafeAreaView/mySafeAreaView.component';

export interface AnalysisScreenProps {}

const logger = new Logger('analysis screen');
export const AnalysisScreen: FC<AnalysisScreenProps> = props => {
    const style = useThemeStyle(analysisStyle);
    const devices = useCameraDevices('triple-camera');
    const camera = useRef<Camera>(null);
    const [cameraPermission, setCameraPermission] =
        useState<CameraPermissionRequestResult>('denied');
    const cameraDevice = devices.back || devices.front || devices.external;

    useEffect(() => {
        getCameraPermission();
    }, []);

    const getCameraPermission = async () => {
        const cameraPermissionStatus = await Camera.getCameraPermissionStatus();
        logger.debug(`camera permission status: ${cameraPermissionStatus}`);
        if (cameraPermissionStatus !== 'authorized') {
            const permission = await Camera.requestCameraPermission();
            logger.debug(
                `camera permission request: ${cameraPermissionStatus}`,
            );
            setCameraPermission(permission);
        } else {
            setCameraPermission(cameraPermissionStatus);
        }
    };

    const frameProcessor = useFrameProcessor(async frame => {
        'worklet';
        console.log('processing');
    }, []);

    if (!cameraDevice) {
        logger.debug('Camera device:', cameraDevice);
        return <MyLoading />;
    }

    return (
        <MySafeAreaView edges={['top', 'bottom']}>
            <Camera
                ref={camera}
                isActive={true}
                style={style.absoluteFill}
                device={cameraDevice}
                frameProcessor={frameProcessor}
            />
        </MySafeAreaView>
    );
};
