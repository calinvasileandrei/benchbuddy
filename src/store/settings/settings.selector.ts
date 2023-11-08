import {RootState} from '../store'

const getUnit = (state: RootState) => state.settings.unit

export const settingsSelectors = {
    getUnit
}
