import { combineReducers } from 'redux'

import FinancesReducer from '../pages/finances/financesReducer'
import CardHidden from '../components/card/cardReducer'
import AuthReducer from '../auth/authReducer'

const rootReducer = combineReducers({
    finances: FinancesReducer,
    cardHidden: CardHidden,
    auth: AuthReducer
})

export default rootReducer;