import React, {FC} from 'react';
import {MySafeAreaView} from 'src/shared/baseComponents/mySafeAreaView/mySafeAreaView.component';
import {AuthService} from 'src/services/auth/auth.service';
import {MenuItem} from 'src/screens/app/account/components/menuItem/menuItem.component';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {accountStyle} from 'src/screens/app/account/account.style';
import {useTheme} from 'src/theme/theme.context';
import {MyScrollView} from 'src/shared/baseComponents/myScrollView/myScrollView.component';
import {useNavigation} from '@react-navigation/native';
import {AccountStackNavigationProps} from 'src/navigation/stacks/account/types';
import {AppRoutes} from 'src/navigation/routes';
import {MyText} from 'src/shared/baseComponents/myText/myText.component';

export interface AccountScreenProps {}

export const AccountScreen: FC<AccountScreenProps> = props => {
  const style = useThemeStyle(accountStyle);
  const navigation =
    useNavigation<AccountStackNavigationProps<AppRoutes.ACCOUNT_SCREEN>>();
  const theme = useTheme();

  const handleNavigationToProfile = () => {
    navigation.navigate(AppRoutes.ACCOUNT_STACK, {
      screen: AppRoutes.PROFILE_SCREEN,
    });
  };

  return (
    <MySafeAreaView edges={['bottom', 'top']}>
      <MyScrollView title={'Account'}>
        <MenuItem
          onPress={handleNavigationToProfile}
          iconName={'person-circle-outline'}
          title={'Profile'}
        />
        {/*   <MenuItem onPress={exerciseListService.exportExercises} disabled={true}  title={'Load JSON'}/>
                <MenuItem onPress={typesenseService.populateTypesense} disabled={true}  title={'Populate Typesense'}/>
                <MenuItem onPress={workoutSessionTypesenseService.fetchCollection} disabled={false}
                          title={'Fetch Typesense WorkoutSession'}/>
                <MenuItem onPress={workoutSessionTypesenseService.initSchema} disabled={false}
                          title={'Init Typesense WorkoutSession'}/>*/}
        {/*<MenuItem onPress={theme.toggleTheme} title={'Change Theme'} iconName={'contrast-outline'}/>*/}
        <MyText type={'header3Text'} style={style.header}>
          Help us
        </MyText>
        <MenuItem
          onPress={() => -1}
          title={'Send feedback'}
          iconName={'create-outline'}
        />
        <MenuItem
          onPress={() => -1}
          title={'Review on AppStore'}
          iconName={'logo-apple-appstore'}
        />
        <MenuItem
          onPress={() => -1}
          title={'Follow @gym-tren'}
          iconName={'share-social-outline'}
        />
        <MyText type={'header3Text'} style={style.header}>
          Legal
        </MyText>
        <MenuItem
          onPress={() => -1}
          title={'Terms of Service'}
          iconName={'document-text-outline'}
        />
        <MenuItem
          onPress={AuthService.handleLogout}
          title={'Logout'}
          iconName={'log-out-outline'}
        />
      </MyScrollView>
    </MySafeAreaView>
  );
};
