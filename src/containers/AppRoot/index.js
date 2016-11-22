//-----------  Imports  -----------//

import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'

import AppRoot                from './AppRoot'

import { viewActions }        from 'modules/auth/actions'

//-----------  Redux Maps  -----------//

const mapState = () => ({})

const mapDispatch = (dispatch) => ({
  actions: bindActionCreators(viewActions, dispatch)
})

//-----------  Exports  -----------//

export default connect(mapState, mapDispatch)(AppRoot)
