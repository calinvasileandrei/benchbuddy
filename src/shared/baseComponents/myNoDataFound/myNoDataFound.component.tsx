import React, {FC} from 'react'
import {View} from 'react-native'
import {MySafeAreaView} from 'src/shared/baseComponents/mySafeAreaView/mySafeAreaView.component'
import {MyText} from 'src/shared/baseComponents/myText/myText.component'

export interface MyNoDataFoundProps {}

export const MyNoDataFound: FC<MyNoDataFoundProps> = props => {
    return (
        <MySafeAreaView edges={['bottom']}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <MyText style={{fontSize: 20}}>No data found</MyText>
            </View>
        </MySafeAreaView>
    )
}
