import { combineReducers } from 'redux'

import FinancesReducer from './pages/finances/financesReducer'
import CardHidden from './components/card/cardReducer'

const rootReducer = combineReducers({
    finances: FinancesReducer,
    cardHidden: CardHidden
})

export default rootReducer;