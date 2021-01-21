import { combineReducers } from 'redux'

import FinancesReducer from '../pages/finances/financesReducer'
import CardReducer from '../components/card/cardReducer'
import AuthReducer from '../auth/authReducer'
import MessageReducer from '../components/message/messageReducer'
import WarningReducer from '../components/warning/warningReducer'

const rootReducer = combineReducers({
    finances: FinancesReducer,
    card: CardReducer,
    auth: AuthReducer,
    message: MessageReducer,
    warning: WarningReducer
})

export default rootReducer;