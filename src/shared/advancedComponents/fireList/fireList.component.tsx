import React from 'react';
import {FlatList, RefreshControl, View} from 'react-native'
import {FireListProps} from 'src/shared/advancedComponents/fireList/types';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {fireListStyle} from 'src/shared/advancedComponents/fireList/fireList.style';
import {MyText} from 'src/shared/baseComponents/myText/myText.component';
import {MyLoading} from 'src/shared/baseComponents/myLoading/myLoading.component';

export const FireList = <T extends { id: any }>(props: FireListProps<T>) => {
    const {fireHookParams, renderItem, emptyList} = props;
    const style = useThemeStyle(fireListStyle)

    const [refreshing, setRefreshing] = React.useState(false);

    const handleRefresh = async () => {
        setRefreshing(true);
        await fireHookParams.fetchData()
        setRefreshing(false)
    }

    if (fireHookParams.isLoading && !refreshing) {
        return (
            <MyLoading/>
        )
    }

    if (fireHookParams.data.length === 0 && emptyList) {
        return (
            <View style={style.noData}>
                {emptyList.image && <emptyList.image width={emptyList.imageStyle?.width || 180}
                                                     height={emptyList.imageStyle?.height || 180}/>}
                {emptyList.message &&
                    <MyText type={'bodyBoldText'} style={style.noDataText}>{emptyList.message}</MyText>
                }
            </View>
        )
    }

    return (
        <FlatList
            data={fireHookParams.data}
            renderItem={(item) => renderItem(item.item)}
            keyExtractor={fireHookParams.keyExtractor}
            onRefresh={handleRefresh}
            refreshing={refreshing}
            indicatorStyle={'default'}
            style={{marginBottom: 50}}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    tintColor={style.pullToRefresh.color}
                    onRefresh={handleRefresh}
                />
            }
        />
    );
};
