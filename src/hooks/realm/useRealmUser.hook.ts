import {useObject, useRealm} from 'src/services/realm.config'
import {WorkoutSchema} from 'src/models/schema/workout.model'
import {UserModel, UserSchema} from 'src/models/user.model'
import {Logger} from 'src/utils/logger'
import {RealmCollections, RealmSubscriptions} from 'src/models/schema/realmTypes'
import {useApp, useUser} from '@realm/react'
import {userUtils} from 'src/utils/user.utils'
import Realm from 'realm'

const logger = new Logger('useRealmUser')
export const useRealmUser = () => {
    const realm = useRealm()
    const app = useApp()
    const user = useUser()
    const currentUser = app.currentUser
    const myUser = useObject(UserSchema, currentUser?.id || '')

    const closeRealm = () => {
        if (realm) {
            realm.close()
        }
    }

    const subscribe = async () => {
        await realm.subscriptions.update(subs => {
            subs.add(realm.objects(RealmCollections.USER).filtered('_id = $0', currentUser?.id), {
                name: RealmSubscriptions.USER
            })
        })
    }

    const updateUser = (data: UserModel) => {
        realm.write(() => {
            realm.create(RealmCollections.USER, data, Realm.UpdateMode.Modified)
        })
    }

    const deleteItem = (id: string) => {
        realm.write(() => {
            const item = realm.objectForPrimaryKey(WorkoutSchema, id)
            realm.delete(item)
        })
    }

    const getUser = (): UserModel | undefined => {
        if (myUser) {
            return {
                creationTime: '',
                displayName: '',
                email: '',
                _id: '',
                phoneNumber: '',
                photoURL: '',
                ...myUser.toJSON()
            }
        }
        if (!user) {
            logger.debug('No user found')
            return undefined
        }
        return userUtils.mongoUserToModel(user)
    }

    return {
        user: getUser(),
        deleteItem,
        updateUser,
        closeRealm,
        subscribe
    }
}
