import React from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {fireListStyle} from 'src/shared/advancedComponents/fireList/fireList.style';
import {MyText} from 'src/shared/baseComponents/myText/myText.component';
import {RealmListProps} from 'src/shared/advancedComponents/realmList/types';

export const RealmList = <T extends any>(props: RealmListProps<T>) => {
    const {realmHookParams, renderItem, emptyList} = props;
    const style = useThemeStyle(fireListStyle);

    const [refreshing, setRefreshing] = React.useState(false);

    const handleRefresh = async () => {
        setRefreshing(true);
        // await realmHookParams.fetchData();
        setRefreshing(false);
    };

    /*    if (realmHookParams.isLoading && !refreshing) {
        return <MyLoading />;
    }*/

    if (realmHookParams.data.length === 0 && emptyList) {
        return (
            <View style={style.noData}>
                {emptyList.image && (
                    <emptyList.image
                        width={emptyList.imageStyle?.width || 180}
                        height={emptyList.imageStyle?.height || 180}
                    />
                )}
                {emptyList.message && (
                    <MyText type={'bodyBoldText'} style={style.noDataText}>
                        {emptyList.message}
                    </MyText>
                )}
            </View>
        );
    }

    return (
        <FlatList
            data={realmHookParams.data}
            renderItem={item => renderItem(item.item)}
            keyExtractor={realmHookParams.keyExtractor}
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
