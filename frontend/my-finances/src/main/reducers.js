import { combineReducers } from 'redux'

import FinancesReducer from '../store/reducers/financesReducer'
import PaymentReducer from '../store/reducers/paymentReducer'
import UserReducer from '../store/reducers/userReducer'
import MessageReducer from '../store/reducers/messageReducer'
import WarningReducer from '../store/reducers/warningReducer'

const rootReducer = combineReducers({
    finances: FinancesReducer,
    payment: PaymentReducer,
    user: UserReducer,
    message: MessageReducer,
    warning: WarningReducer
})

export default rootReducer;