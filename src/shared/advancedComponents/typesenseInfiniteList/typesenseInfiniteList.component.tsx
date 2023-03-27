import React from 'react';
import {FlatList, ListRenderItemInfo, RefreshControl, View} from 'react-native'
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {TypesenseInfiniteListProps} from 'src/shared/advancedComponents/typesenseInfiniteList/types';
import {MyText} from 'src/shared/baseComponents/myText/myText.component';
import {
    typesenseInfiniteListStyle
} from 'src/shared/advancedComponents/typesenseInfiniteList/typesenseInfiniteList.style';
import {MyLoading} from 'src/shared/baseComponents/myLoading/myLoading.component';
import {Logger} from 'src/utils/logger';
const logger = new Logger('TypesenseInfiniteList');

export const TypesenseInfiniteList = <T extends unknown>(props: TypesenseInfiniteListProps<T>) => {
    const {typesenseHookParams, renderItem, emptyList} = props;
    const style = useThemeStyle(typesenseInfiniteListStyle)

    const [refreshing, setRefreshing] = React.useState(false);
    const [paginationLoading, setPaginationLoading] = React.useState(false);

    const handleRefresh = async () => {
        logger.debug('handleRefresh')
        setRefreshing(true);
        await typesenseHookParams.fetchMoreData({getFirstPage: true});
        setRefreshing(false);

    }

    const handleEndReached = async () => {
        logger.debug('handleEndReached')
        setPaginationLoading(true);
        await typesenseHookParams.fetchMoreData();
        setPaginationLoading(false);
    }

    if (typesenseHookParams.isLoading && !refreshing && !paginationLoading) {
        return (
            <MyLoading/>
        )
    }

    if (typesenseHookParams.data.length === 0 && emptyList) {
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
        <View style={style.container}>
            <FlatList
                data={typesenseHookParams.data}
                renderItem={(item: ListRenderItemInfo<T>) => renderItem(item.item)}
                keyExtractor={(item) => typesenseHookParams.keyExtractor(item)}
                onEndReachedThreshold={0.5}
                onEndReached={handleEndReached}
                onRefresh={handleRefresh}
                keyboardDismissMode={'on-drag'}
                refreshing={refreshing}
                indicatorStyle={'white'}
                style={{marginBottom: 50}}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        tintColor={style.pullToRefresh.color}
                        onRefresh={handleRefresh}
                    />
                }
            />
        </View>
    );
};
