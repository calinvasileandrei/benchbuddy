import React from 'react';
import {FlatList, RefreshControl, View} from 'react-native'
import {FetchMoreDataParams, FireInfiniteFlatListProps} from 'src/shared/advancedComponents/fireInfiniteFlatList/types';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {fireInfiniteFlatListStyle} from 'src/shared/advancedComponents/fireInfiniteFlatList/fireInfiniteFlatList.style';
import {MyLoading} from 'src/shared/baseComponents/myLoading/myLoading.component';

export const FireInfiniteFlatList = <T extends unknown>(props: FireInfiniteFlatListProps<T>) => {
    const {fireHookParams, renderItem, searchTextParam} = props;
    const style = useThemeStyle(fireInfiniteFlatListStyle)

    const [refreshing, setRefreshing] = React.useState(false);
    const [paginationLoading, setPaginationLoading] = React.useState(false);

    const handleFetchMoreData = async (params?: FetchMoreDataParams) => {
        await fireHookParams.fetchMoreData(params);
    }

    const handleRefresh = async () => {
        setRefreshing(true);
        await handleFetchMoreData({getFirstPage: true});
        setRefreshing(false);

    }

    const handleEndReached = async () => {
        setPaginationLoading(true);
        await handleFetchMoreData();
        setPaginationLoading(false);
    }

    if (fireHookParams.isLoading && !refreshing && !paginationLoading) {
        return (
            <MyLoading/>
        )
    }

    return (
        <View style={style.container}>
            <FlatList
                data={fireHookParams.data}
                renderItem={(item) => renderItem(item.item)}
                keyExtractor={(item) => fireHookParams.keyExtractor(item)}
                onEndReachedThreshold={0.5}
                onEndReached={handleEndReached}
                onRefresh={handleRefresh}
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
