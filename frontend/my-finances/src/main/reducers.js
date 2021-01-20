import { combineReducers } from 'redux'

import FinancesReducer from '../pages/finances/financesReducer'
import CardReducer from '../components/card/cardReducer'
import AuthReducer from '../auth/authReducer'
import MessageReducer from '../components/message/messageReducer'

const rootReducer = combineReducers({
    finances: FinancesReducer,
    card: CardReducer,
    auth: AuthReducer,
    message: MessageReducer
})

export default rootReducer;