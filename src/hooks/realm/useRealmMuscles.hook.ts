import {useQuery, useRealm} from 'src/services/realm.config'
import {RealmCollections, RealmSubscriptions} from 'src/models/schema/realmTypes'
import {useApp} from '@realm/react'
import {MuscleModel, MuscleSchema} from 'src/models/schema/exerciseRef/muscle.model'
import {realmMapper} from 'src/utils/realmMapper.utils'

export const useRealmMuscles = () => {
    const realm = useRealm()
    const app = useApp()
    const currentUser = app.currentUser
    const musclesRow = useQuery(MuscleSchema)

    const closeRealm = () => {
        if (realm) {
            realm.close()
        }
    }

    const subscribe = async () => {
        await realm.subscriptions.update(subs => {
            subs.add(realm.objects(RealmCollections.MUSCLE), {
                name: RealmSubscriptions.MUSCLES
            })
        })
    }

    const getAll = () => {
        const rowData = realmMapper.schemaToObject<MuscleSchema, MuscleModel>(musclesRow)
        return rowData.sort((a, b) => a.name.localeCompare(b.name))
    }

    return {
        closeRealm,
        subscribe,
        getAll
    }
}
