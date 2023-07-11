import React, {FC, useEffect, useState} from 'react'
import {useThemeStyle} from 'src/theme/useThemeStyle.hook'
import {profileStyle} from 'src/screens/app/account/screens/profile/profile.style'
import {MySafeAreaView} from 'src/shared/baseComponents/mySafeAreaView/mySafeAreaView.component'
import {MyProfileImage} from 'src/shared/uiComponents/myProfileImage/myProfileImage.component'
import {View} from 'react-native'
import {MyText} from 'src/shared/baseComponents/myText/myText.component'
import {MyCard} from 'src/shared/baseComponents/myCard/myCard.component'
import {MyInput} from 'src/shared/baseComponents/myInput/myInput.component'
import {MyKeyboardAwareScrollView} from 'src/shared/baseComponents/myKeyboardAwareScrollView/myKeyboardAwareScrollView.component'
import {MyButton} from 'src/shared/baseComponents/myButton/myButton.component'
import {MyButtonGroup} from 'src/shared/baseComponents/myButtonGroup/myButtonGroup.component'
import {MyDatePicker} from 'src/shared/baseComponents/myDatePicker/myDatePicker.component'
import {useRealmUser} from 'src/hooks/realm/useRealmUser.hook'
import {UserModel} from 'src/models/user.model'

export interface ProfileScreenProps {}

export const ProfileScreen: FC<ProfileScreenProps> = props => {
    const style = useThemeStyle(profileStyle)
    const {user, updateUser} = useRealmUser()

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [birthday, setBirthday] = useState<Date>(new Date())
    const [email, setEmail] = useState<string>('')
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const [height, setHeight] = useState<number | undefined>(undefined)
    const [weight, setWeight] = useState<number | undefined>(undefined)
    const [unit, setUnit] = useState('Metric')

    // Other
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (user) {
            const nameParts = getNameParts()
            setName(nameParts.name)
            setSurname(nameParts.surname)
            setEmail(user.email)
            setPhoneNumber(user.phoneNumber)
            setWeight(user.weight)
            setHeight(user.height)
            if (user.unit) {
                setUnit(user.unit)
            }
            if (user.birthday) {
                setBirthday(new Date(user.birthday))
            }
        }
    }, [])

    if (!user) {
        return null // TODO: Handle Error Page
    }

    const getNameParts = () => {
        if (user.name && user.surname) {
            return {
                name: user.name,
                surname: user.surname
            }
        }
        // Compute from display name
        const nameParts = user?.displayName.split(' ')
        return {
            name:
                nameParts
                    ?.map((part, index) => (index !== nameParts.length - 1 ? part : ''))
                    .join(' ')
                    .trim() || '',
            surname: nameParts ? nameParts[nameParts?.length - 1] : ''
        }
    }

    const handleSave = () => {
        setIsLoading(true)
        const newUser: UserModel = {
            ...user,
            name,
            surname,
            birthday: birthday.toDateString(),
            email,
            phoneNumber,
            height,
            weight,
            unit
        }
        updateUser(newUser)
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }

    const handleSetNumber = (value: string, setter: (v: number | undefined) => void) => {
        if (value.length > 0 && !isNaN(parseInt(value, 10))) {
            return setter(parseInt(value, 10))
        }
        return setter(undefined)
    }

    return (
        <MySafeAreaView edges={['bottom']}>
            <MyKeyboardAwareScrollView>
                <View style={style.profileImageContainer}>
                    <MyProfileImage imageUri={user?.photoURL} />
                    <View style={style.nameContainer}>
                        <MyText type={'header2Text'}>{user?.displayName}</MyText>
                    </View>
                </View>

                <MyText type={'header3Text'} style={style.headers}>
                    Personal Information
                </MyText>
                <MyCard>
                    <MyInput value={name} onChangeText={setName} placeholder={'Name'} />
                    <MyInput value={surname} onChangeText={setSurname} placeholder={'Surname'} />
                    <MyDatePicker
                        date={birthday}
                        mode={'date'}
                        withBorder={true}
                        setDate={setBirthday}
                    />
                </MyCard>
                <MyCard>
                    <MyInput
                        value={email}
                        disabled={true}
                        onChangeText={setEmail}
                        placeholder={'Email'}
                    />
                    <MyInput
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        placeholder={'Phone number'}
                    />
                </MyCard>

                <MyText type={'header3Text'} style={style.headers}>
                    {' '}
                    Body{' '}
                </MyText>
                <MyCard>
                    <MyInput
                        value={height?.toString() || ''}
                        keyboardType={'numeric'}
                        onChangeText={v => handleSetNumber(v, setHeight)}
                        placeholder={'Height'}
                    />
                    <MyInput
                        value={weight?.toString() || ''}
                        keyboardType={'numeric'}
                        onChangeText={v => handleSetNumber(v, setWeight)}
                        placeholder={'Weight'}
                    />
                </MyCard>

                <MyText type={'header3Text'} style={style.headers}>
                    {' '}
                    Preferences{' '}
                </MyText>
                <MyCard>
                    <MyButtonGroup
                        buttons={['Metric', 'Imperial']}
                        onChange={value => setUnit(value)}
                    />
                </MyCard>
                <MyButton type={'outline'} isLoading={isLoading} onPress={handleSave}>
                    Save
                </MyButton>
            </MyKeyboardAwareScrollView>
        </MySafeAreaView>
    )
}
