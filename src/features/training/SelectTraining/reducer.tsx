import type { Kana, KanaData } from '@/types/shared'

const enum ACTIONS {
  ALL_KANAS,
  ALL_BASIC,
  ALL_INTERMEDIATE,
  ALL_ADVANCED,
}

type State = {
  selectedKanas: KanaData
  activeOptions: {
    allKanas: boolean
    allBasic: boolean
    allIntermediate: boolean
    allAdvanced: boolean
  }
}

type Action =
  | { type: ACTIONS.ALL_KANAS; payload: KanaData }
  | { type: ACTIONS.ALL_BASIC; payload: Kana[] }
  | { type: ACTIONS.ALL_INTERMEDIATE; payload: Kana[] }
  | { type: ACTIONS.ALL_ADVANCED; payload: Kana[] }

const initialState: State = {
  selectedKanas: { basic: [], intermediate: [], advanced: [] },
  activeOptions: {
    allKanas: false,
    allBasic: false,
    allIntermediate: false,
    allAdvanced: false,
  },
}

const trainingReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTIONS.ALL_KANAS:
      if (!state.activeOptions.allKanas) {
        return {
          ...initialState,
          selectedKanas: action.payload,
          activeOptions: {
            ...state.activeOptions,
            allKanas: true,
            allBasic: true,
            allIntermediate: true,
            allAdvanced: true,
          },
        }
      }

      return {
        ...initialState,
      }

    case ACTIONS.ALL_BASIC:
      if (!state.activeOptions.allBasic) {
        return {
          ...initialState,
          selectedKanas: { ...state.selectedKanas, basic: action.payload },
          activeOptions: {
            ...state.activeOptions,
            allKanas:
              state.activeOptions.allIntermediate &&
              state.activeOptions.allAdvanced,
            allBasic: true,
          },
        }
      }

      return {
        ...initialState,
        selectedKanas: { ...state.selectedKanas, basic: [] },
        activeOptions: {
          ...state.activeOptions,
          allKanas: false,
          allBasic: false,
        },
      }

    case ACTIONS.ALL_INTERMEDIATE:
      if (!state.activeOptions.allIntermediate) {
        return {
          ...initialState,
          selectedKanas: {
            ...state.selectedKanas,
            intermediate: action.payload,
          },
          activeOptions: {
            ...state.activeOptions,
            allKanas:
              state.activeOptions.allBasic && state.activeOptions.allAdvanced,
            allIntermediate: true,
          },
        }
      }

      return {
        ...initialState,
        selectedKanas: { ...state.selectedKanas, intermediate: [] },
        activeOptions: {
          ...state.activeOptions,
          allKanas: false,
          allIntermediate: false,
        },
      }

    case ACTIONS.ALL_ADVANCED:
      if (!state.activeOptions.allAdvanced) {
        return {
          ...initialState,
          selectedKanas: { ...state.selectedKanas, advanced: action.payload },
          activeOptions: {
            ...state.activeOptions,
            allKanas:
              state.activeOptions.allBasic &&
              state.activeOptions.allIntermediate,
            allAdvanced: true,
          },
        }
      }

      return {
        ...initialState,
        selectedKanas: { ...state.selectedKanas, advanced: [] },
        activeOptions: {
          ...state.activeOptions,
          allKanas: false,
          allAdvanced: false,
        },
      }
    default:
      return state
  }
}

export { ACTIONS, initialState, trainingReducer }
