import { combineReducers } from 'redux'

import FinancesReducer from '../store/reducers/financesReducer'
import CardReducer from '../store/reducers/cardReducer'
import AuthReducer from '../store/reducers/authReducer'
import MessageReducer from '../store/reducers/messageReducer'
import WarningReducer from '../store/reducers/warningReducer'

const rootReducer = combineReducers({
    finances: FinancesReducer,
    card: CardReducer,
    auth: AuthReducer,
    message: MessageReducer,
    warning: WarningReducer
})

export default rootReducer;