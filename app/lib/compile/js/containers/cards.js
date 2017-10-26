import Cards from '../ui/cards'
import { connect } from 'react-redux'
import * as actions from '../store/actions'

const mapStateToProps = (state, props) => 
  ({
    state: state,
    cards: state.cards
  })
  
const Container = connect(
  mapStateToProps, {
    getCards: actions.getCards,
    addCard: actions.addCard,
    changeCard: actions.changeCard,
    editCard: actions.editCard,
    deleteCard: actions.deleteCard,
    enterEdit: actions.enterEdit,
    exitEdit: actions.exitEdit
})(Cards)

export default Container