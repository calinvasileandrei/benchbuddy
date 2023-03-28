import React, {FC, useState} from 'react';
import {SearchBar} from '@rneui/base';
import {mySearchBarStyle} from 'src/shared/baseComponents/mySearchBar/mySearchBar.style';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {handleHaptic, HapticType} from 'src/utils/haptics.utils';
import {useDebouncedEffect} from 'src/hooks/useDebouncedEffect';

export interface MySearchBarProps {
    onChange: (search: string) => void;
    withHaptics?: HapticType;
    minCharsForRequest?: number;
}

export const MySearchBar: FC<MySearchBarProps> = props => {
    const style = useThemeStyle(mySearchBarStyle);
    const [search, setSearch] = useState('');
    const [searchbarLoading, setSearchBarLoading] = useState(false);
    const {onChange, minCharsForRequest = 2} = props;

    const updateSearch = (searchText: string) => {
        if (searchText.length > minCharsForRequest || searchText.length === 0) {
            setSearchBarLoading(true);
        }
        setSearch(searchText);
    };

    useDebouncedEffect(
        () => {
            if (search.length > minCharsForRequest || search.length === 0) {
                onChange(search);
                handleHaptic(props.withHaptics);
            }
            setSearchBarLoading(false);
        },
        300,
        [search],
    );

    return (
        <SearchBar
            onChangeText={updateSearch}
            platform={'ios'}
            containerStyle={style.containerStyle}
            inputContainerStyle={style.inputContainerStyle}
            inputStyle={style.inputStyle}
            cancelButtonProps={{color: style.cancelButtonStyle.color}}
            showCancel={false}
            onClear={() => {
                setSearchBarLoading(false);
            }}
            onCancel={() => {
                setSearchBarLoading(false);
            }}
            showLoading={searchbarLoading}
            cursorColor={style.cursor.color}
            placeholderTextColor={style.placeholder.color}
            searchIcon={style.searchIcon}
            value={search}
            placeholder="Type Here..."
        />
    );
};
