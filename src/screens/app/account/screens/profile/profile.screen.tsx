import React, {FC} from 'react';
import {useThemeStyle} from 'src/theme/useThemeStyle.hook';
import {profileStyle} from 'src/screens/app/account/screens/profile/profile.style';
import {MySafeAreaView} from 'src/shared/baseComponents/mySafeAreaView/mySafeAreaView.component';
import {MyProfileImage} from 'src/shared/uiComponents/myProfileImage/myProfileImage.component';
import {View} from 'react-native';
import {useAppSelector} from 'src/store/store';
import {userSelectors} from 'src/store/user/user.selectors';
import {MyText} from 'src/shared/baseComponents/myText/myText.component';
import {MyCard} from 'src/shared/baseComponents/myCard/myCard.component';
import {MyInput} from 'src/shared/baseComponents/myInput/myInput.component';
import {
    MyKeyboardAwareScrollView
} from 'src/shared/baseComponents/myKeyboardAwareScrollView/myKeyboardAwareScrollView.component';
import {MyButton} from 'src/shared/baseComponents/myButton/myButton.component';
import {MyButtonGroup} from 'src/shared/baseComponents/myButtonGroup/myButtonGroup.component';
import {MyDatePicker} from 'src/shared/baseComponents/myDatePicker/myDatePicker.component';

export interface ProfileScreenProps {
}

export const ProfileScreen: FC<ProfileScreenProps> = (props) => {
    const style = useThemeStyle(profileStyle)
    const user = useAppSelector(userSelectors.getUser)

    const getNameParts = () => {
        const nameParts = user?.displayName.split(' ')
        return {
            name: nameParts?.map((part, index) => index !== nameParts.length - 1 ? part : '').join(' ').trim() || '',
            surname: nameParts ? nameParts[nameParts?.length - 1] : '',
        }
    }

    const [name, setName] = React.useState(getNameParts().name);
    const [surname, setSurname] = React.useState(getNameParts().surname);
    const [birthday, setBirthday] = React.useState<Date>(new Date());
    const [height, setHeight] = React.useState('');
    const [weight, setWeight] = React.useState('');
    const [unit, setUnit] = React.useState('Metric');

    const handleSave = () => {

    }

    return (
        <MySafeAreaView edges={['bottom']}>
            <MyKeyboardAwareScrollView>
                <View style={style.profileImageContainer}>
                    <MyProfileImage
                        imageUri={user?.photoURL || ''}/>
                    <View style={style.nameContainer}>
                        <MyText type={'header2Text'}>{user?.displayName}</MyText>
                    </View>
                </View>

                <MyText type={'header3Text'} style={style.headers}>Personal Information</MyText>
                <MyCard>
                    <MyInput value={name} onChangeText={setName} placeholder={'Name'}/>
                    <MyInput value={surname} onChangeText={setSurname} placeholder={'Surname'}/>
                    <MyDatePicker date={birthday} mode={'date'} withBorder={true} setDate={setBirthday}/>
                </MyCard>
                <MyCard>
                    <MyInput value={user?.email} disabled={true} onChangeText={setHeight} placeholder={'Email'}/>
                    <MyInput value={user?.phoneNumber} disabled={true} onChangeText={setWeight}
                             placeholder={'Phone number'}/>
                </MyCard>

                <MyText type={'header3Text'} style={style.headers}> Body </MyText>
                <MyCard>
                    <MyInput value={height} keyboardType={'numeric'} onChangeText={setHeight} placeholder={'Height'}/>
                    <MyInput value={weight} keyboardType={'numeric'} onChangeText={setWeight} placeholder={'Weight'}/>
                </MyCard>

                <MyText type={'header3Text'} style={style.headers}> Preferences </MyText>
                <MyCard>
                    <MyButtonGroup
                        buttons={['Metric', 'Imperial']}
                        onChange={(value) => setUnit(value)}
                    />
                </MyCard>
                <MyButton type={'outline'} disabled={true} onPress={handleSave}>Save</MyButton>

            </MyKeyboardAwareScrollView>
        </MySafeAreaView>
    );
};
